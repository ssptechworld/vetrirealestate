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

export const parsePriceRange = (priceStr) => {
  if (!priceStr) return { min: 0, max: 0 };
  if (typeof priceStr === 'number') return { min: priceStr, max: priceStr };
  const s = String(priceStr).toLowerCase().replace(/,/g, '').trim();

  // Range matching e.g. "70L - 100L", "70L - 125L", "70 to 100 lakhs"
  const rangeMatch = s.match(/([0-9]+(?:\.[0-9]+)?)\s*([a-z]*)\s*(?:-|to)\s*([0-9]+(?:\.[0-9]+)?)\s*([a-z]*)/);
  if (rangeMatch) {
    const val1 = parseFloat(rangeMatch[1]);
    const unit1 = rangeMatch[2];
    const val2 = parseFloat(rangeMatch[3]);
    const unit2 = rangeMatch[4] || unit1 || (s.includes('cr') ? 'cr' : (s.includes('l') ? 'l' : ''));

    const effectiveUnit1 = unit1 || unit2;
    const effectiveUnit2 = unit2 || unit1;

    const calcVal = (val, unit) => {
      if (unit.includes('cr') || unit.includes('crore')) return Math.round(val * 10000000);
      if (unit.includes('l') || unit.includes('lac') || unit.includes('lakh') || (val > 0 && val < 500)) {
        return Math.round(val * 100000);
      }
      return Math.round(val);
    };

    const num1 = calcVal(val1, effectiveUnit1);
    const num2 = calcVal(val2, effectiveUnit2);
    return {
      min: Math.min(num1, num2),
      max: Math.max(num1, num2)
    };
  }

  const single = parsePriceToNumber(priceStr);
  return { min: single, max: single };
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

export const getProjectPriceBounds = (p) => {
  if (!p) return { min: 0, max: 0 };
  let min = typeof p.priceMin === 'number' && p.priceMin > 0 ? p.priceMin : 0;
  let max = typeof p.priceMax === 'number' && p.priceMax > 0 ? p.priceMax : 0;

  if (min === 0 || max === 0) {
    const rawPrice = p.rawProject?.price || p.price;
    const range = parsePriceRange(rawPrice);
    if (min === 0) min = range.min;
    if (max === 0) max = range.max;
  }

  if (min === 0 && typeof p.price === 'number' && p.price > 0) {
    min = p.price;
    max = p.price;
  }

  return { min, max: max || min };
};

export const generatePriceBrackets = (projects = []) => {
  const validBounds = projects
    .map(getProjectPriceBounds)
    .filter((b) => b.min > 0 || b.max > 0);

  if (!validBounds.length) return [];

  const minVal = Math.min(...validBounds.map((b) => b.min || b.max));
  const maxVal = Math.max(...validBounds.map((b) => b.max || b.min));

  if (minVal === maxVal) {
    return [
      { value: `under-${minVal + 1000000}`, label: `Under ${formatPriceShort(minVal + 1000000)}` },
      { value: `exact-${minVal}`, label: `${formatPriceShort(minVal)}` },
      { value: `above-${Math.max(0, minVal - 1000000)}`, label: `Above ${formatPriceShort(Math.max(0, minVal - 1000000))}` }
    ];
  }

  const brackets = [];

  // Generate dynamic brackets based on real data bounds
  if (minVal < 10000000 && maxVal > 10000000) {
    // Spans below and above 1 Cr (e.g. 70 Lakhs to 1.8 Cr)
    brackets.push({ value: 'under-8000000', label: 'Under ₹80 Lakhs' });
    brackets.push({ value: '7000000-to-10000000', label: '₹70 Lakhs - ₹1 Cr' });
    brackets.push({ value: '10000000-to-15000000', label: '₹1 Cr - ₹1.5 Cr' });
    brackets.push({ value: 'above-15000000', label: 'Above ₹1.5 Cr' });
  } else if (maxVal <= 10000000) {
    // Under 1 Cr
    const mid = Math.round((minVal + maxVal) / 2 / 500000) * 500000 || Math.round((minVal + maxVal) / 2);
    brackets.push({ value: `under-${mid}`, label: `Under ${formatPriceShort(mid)}` });
    brackets.push({ value: `${minVal}-to-${maxVal}`, label: `${formatPriceShort(minVal)} - ${formatPriceShort(maxVal)}` });
    brackets.push({ value: `above-${mid}`, label: `Above ${formatPriceShort(mid)}` });
  } else {
    // Above 1 Cr
    const mid = Math.round((minVal + maxVal) / 2 / 10000000) * 10000000 || Math.round((minVal + maxVal) / 2);
    brackets.push({ value: `under-${mid}`, label: `Under ${formatPriceShort(mid)}` });
    brackets.push({ value: `${minVal}-to-${maxVal}`, label: `${formatPriceShort(minVal)} - ${formatPriceShort(maxVal)}` });
    brackets.push({ value: `above-${mid}`, label: `Above ${formatPriceShort(mid)}` });
  }

  return brackets;
};

export const projectMatchesPriceBracket = (property, bracketValue) => {
  if (!bracketValue || bracketValue === 'all') return true;
  const { min: pMin, max: pMax } = getProjectPriceBounds(property);

  if (pMin === 0 && pMax === 0) return true;

  if (bracketValue.startsWith('under-')) {
    const threshold = Number(bracketValue.replace('under-', ''));
    return pMin <= threshold;
  }
  if (bracketValue.startsWith('above-')) {
    const threshold = Number(bracketValue.replace('above-', ''));
    return pMax >= threshold;
  }
  if (bracketValue.startsWith('exact-')) {
    const target = Number(bracketValue.replace('exact-', ''));
    return pMin <= target && pMax >= target;
  }
  if (bracketValue.includes('-to-')) {
    const [low, high] = bracketValue.split('-to-').map(Number);
    return pMin <= high && pMax >= low;
  }
  return true;
};

export const formatProjectForCarousel = (proj) => {
  if (!proj) return null;

  let rawPrice = proj.price ? String(proj.price).trim() : '';
  const priceRange = parsePriceRange(rawPrice);
  let numericPrice = priceRange.min > 0 ? priceRange.min : parsePriceToNumber(rawPrice);
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

  // Map Year Built accurately from database
  let yearBuiltDisplay = 'Not specified';
  const rawYear = proj.yearBuilt || proj.completionDate;
  if (rawYear) {
    const match = String(rawYear).match(/\b(19\d\d|20\d\d)\b/);
    if (match) {
      yearBuiltDisplay = match[1];
    } else if (String(rawYear).trim()) {
      yearBuiltDisplay = String(rawYear).trim();
    }
  }

  const statusLower = (proj.status || 'ongoing').toLowerCase();
  let badgeText = 'Ongoing';
  if (proj.featured) {
    badgeText = 'Featured';
  } else if (statusLower === 'completed') {
    badgeText = 'Completed';
  } else if (statusLower === 'upcoming') {
    badgeText = 'Upcoming';
  }

  return {
    id: proj._id || proj.id,
    title: proj.name || 'Untitled Project',
    slug: proj._id || proj.id,
    location: proj.location || 'Chennai',
    areaName: proj.location || 'Chennai',
    formattedPrice,
    price: numericPrice > 0 ? numericPrice : (numPrice > 0 ? numPrice : 5000000),
    priceMin: priceRange.min,
    priceMax: priceRange.max,
    propertyType: proj.type || 'Residence',
    badge: badgeText,
    yearBuilt: yearBuiltDisplay,
    completionDate: proj.completionDate || '',
    heroImage: hero || allImages[0] || '',
    gallery: allImages.length > 0 ? allImages : (hero ? [hero] : []),
    hasBrochure,
    brochureUrl: brochure,
    brochureFilename: proj.brochure?.filename || `${(proj.name || 'project').toLowerCase().replace(/[^a-z0-9]/g, '-')}-brochure.pdf`,
    bedrooms: proj.bedrooms || '3 BHK',
    bathrooms: 3,
    sqft: typeof proj.area === 'number' ? proj.area : (parseInt(proj.area) || 1850),
    description: proj.description || '',
    status: statusLower,
    rawProject: proj
  };
};

export const getProjects = async (status) => {
  const query = status ? `?status=${encodeURIComponent(status)}` : '';
  const res = await fetch(`${API_BASE_URL}/api/projects${query}`);
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

export const getUpcomingProjects = async () => {
  const res = await fetch(`${API_BASE_URL}/api/projects/status/upcoming`);
  if (!res.ok) throw new Error('Failed to fetch upcoming projects');
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

