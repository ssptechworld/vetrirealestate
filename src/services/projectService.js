const API_URL = (
  (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL)) ||
  'https://vetrirealestatebackend.onrender.com'
).replace(/\/$/, '');

const API_BASE_URL = API_URL;

export { API_URL, API_BASE_URL };

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${API_BASE_URL}${cleanPath}`;
};

export const parsePriceToNumber = (priceStr) => {
  if (!priceStr) return 0;
  if (typeof priceStr === 'number') return priceStr;
  const s = String(priceStr).toLowerCase().replace(/,/g, '').trim();
  const match = s.match(/([0-9]+(?:\.[0-9]+)?)/);
  if (!match) return 0;
  const val = parseFloat(match[1]);
  if (s.includes('cr') || s.includes('crore')) {
    return Math.round(val * 10000000);
  }
  if (s.includes('l') || s.includes('lac') || s.includes('lakh')) {
    return Math.round(val * 100000);
  }
  if (val > 0 && val < 500) {
    return Math.round(val * 100000);
  }
  return Math.round(val);
};

export const formatPriceShort = (amount) => {
  if (!amount || isNaN(amount) || amount <= 0) return '₹0';
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${Number(cr.toFixed(2))} Cr`;
  }
  if (amount >= 100000) {
    const lk = amount / 100000;
    return `₹${Number(lk.toFixed(1))} Lakhs`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatProjectForCarousel = (proj) => {
  if (!proj) return null;

  let rawPrice = proj.price ? String(proj.price).trim() : '';
  let numericPrice = parsePriceToNumber(rawPrice);
  let numPrice = parseFloat(rawPrice.replace(/[^0-9.]/g, '')) || 0;
  let formattedPrice = rawPrice;

  if (!rawPrice) {
    formattedPrice = 'Price on Request';
  } else if (!rawPrice.startsWith('₹') && !rawPrice.toLowerCase().includes('lakh') && !rawPrice.toLowerCase().includes('cr')) {
    if (numericPrice >= 10000000) {
      formattedPrice = `₹ ${(numericPrice / 10000000).toFixed(2)} Cr`;
    } else if (numericPrice >= 100000) {
      formattedPrice = `₹ ${(numericPrice / 100000).toFixed(1)} Lakhs`;
    } else if (numPrice > 0 && numPrice < 1000) {
      formattedPrice = `₹ ${numPrice} Lakhs`;
    } else if (numPrice >= 1000) {
      formattedPrice = `₹ ${numPrice.toLocaleString('en-IN')}`;
    } else {
      formattedPrice = `₹ ${rawPrice}`;
    }
  }

  const allImages = [];
  if (Array.isArray(proj.images) && proj.images.length > 0) {
    proj.images.forEach((img) => {
      const url = getImageUrl(img);
      if (url && !allImages.includes(url)) allImages.push(url);
    });
  }
  const hero = getImageUrl(proj.image);
  if (hero && !allImages.includes(hero)) {
    allImages.unshift(hero);
  }

  const hasBrochure = Boolean(
    proj.hasBrochure ||
    proj.brochureUrl ||
    (proj.brochure && (proj.brochure.filename || proj.brochure.size))
  );
  const brochure = proj.brochureUrl
    ? getImageUrl(proj.brochureUrl)
    : (hasBrochure ? `${API_BASE_URL}/api/projects/${proj._id || proj.id}/brochure` : '');

  return {
    id: proj._id || proj.id,
    title: proj.name || 'Untitled Project',
    slug: proj._id || proj.id,
    location: proj.location || 'Chennai',
    areaName: proj.location || 'Chennai',
    formattedPrice,
    price: numericPrice > 0 ? numericPrice : (numPrice > 0 ? numPrice : 5000000),
    propertyType: proj.type || 'Residence',
    badge: proj.featured ? 'Featured' : (proj.status?.toLowerCase() === 'completed' ? 'Completed' : 'Ongoing'),
    heroImage: hero || allImages[0] || '',
    gallery: allImages.length > 0 ? allImages : (hero ? [hero] : []),
    hasBrochure,
    brochureUrl: brochure,
    brochureFilename: proj.brochure?.filename || `${(proj.name || 'project').toLowerCase().replace(/[^a-z0-9]/g, '-')}-brochure.pdf`,
    bedrooms: proj.bedrooms || '3 BHK',
    bathrooms: 3,
    sqft: typeof proj.area === 'number' ? proj.area : (parseInt(proj.area) || 1850),
    description: proj.description || '',
    status: proj.status || 'ongoing',
    rawProject: proj
  };
};

export const getProjects = async () => {
  const res = await fetch(`${API_BASE_URL}/api/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
};

export const getOngoingProjects = async () => {
  const res = await fetch(`${API_BASE_URL}/api/projects/status/ongoing`);
  if (!res.ok) throw new Error('Failed to fetch ongoing projects');
  return res.json();
};

export const getCompletedProjects = async () => {
  const res = await fetch(`${API_BASE_URL}/api/projects/status/completed`);
  if (!res.ok) throw new Error('Failed to fetch completed projects');
  return res.json();
};

export const getProjectById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/api/projects/${id}`);
  if (!res.ok) throw new Error('Failed to fetch project details');
  return res.json();
};

export const createProject = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/api/projects`, {
    method: 'POST',
    body: formData // FormData automatically handles multipart/form-data boundary
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to create project');
  }
  return res.json();
};

export const updateProject = async (id, formData) => {
  const res = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
    method: 'PUT',
    body: formData
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update project');
  }
  return res.json();
};

export const deleteProject = async (id) => {
  const res = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to delete project');
  }
  return res.json();
};

export const updateProjectStatus = async (id, status) => {
  const res = await fetch(`${API_BASE_URL}/api/projects/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update project status');
  }
  return res.json();
};

export const downloadBrochure = async (id, customFilename) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/projects/${id}/brochure`);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to download brochure');
    }

    let filename = customFilename || 'project-brochure.pdf';
    const disposition = res.headers.get('content-disposition');
    if (disposition && disposition.includes('filename=')) {
      const match = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
      if (match && match[1]) {
        filename = match[1].replace(/['"]/g, '').trim();
      }
    }

    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
      window.URL.revokeObjectURL(blobUrl);
    }, 150);

    return true;
  } catch (err) {
    console.error('Download brochure error:', err);
    throw err;
  }
};

