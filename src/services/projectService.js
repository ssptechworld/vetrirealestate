const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${API_BASE_URL}${cleanPath}`;
};

export const formatProjectForCarousel = (proj) => {
  if (!proj) return null;

  let rawPrice = proj.price ? String(proj.price).trim() : '';
  let numPrice = parseFloat(rawPrice.replace(/[^0-9.]/g, '')) || 0;
  let formattedPrice = rawPrice;

  if (!rawPrice) {
    formattedPrice = 'Price on Request';
  } else if (!rawPrice.startsWith('₹') && !rawPrice.toLowerCase().includes('lakh') && !rawPrice.toLowerCase().includes('cr')) {
    if (numPrice > 0 && numPrice < 1000) {
      formattedPrice = `₹ ${numPrice} Lakhs`;
    } else if (numPrice >= 1000) {
      formattedPrice = `₹ ${numPrice.toLocaleString('en-IN')}`;
    } else {
      formattedPrice = `₹ ${rawPrice}`;
    }
  }

  return {
    id: proj._id || proj.id,
    title: proj.name || 'Untitled Project',
    slug: proj._id || proj.id,
    location: proj.location || 'Chennai',
    areaName: proj.location || 'Chennai',
    formattedPrice,
    price: numPrice > 0 ? numPrice : 50000000,
    propertyType: proj.type || 'Residence',
    badge: proj.featured ? 'Featured' : (proj.status === 'ongoing' ? 'Ongoing' : 'Completed'),
    heroImage: getImageUrl(proj.image),
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
