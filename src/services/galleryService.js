const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://vetrirealestatebackend.onrender.com').replace(/\/$/, '');

export const getMediaUrl = (mediaPath) => {
  if (!mediaPath) return '';
  if (mediaPath.startsWith('http://') || mediaPath.startsWith('https://')) {
    return mediaPath;
  }
  const cleanPath = mediaPath.startsWith('/') ? mediaPath : `/${mediaPath}`;
  return `${API_BASE_URL}${cleanPath}`;
};

export const getGalleryItems = async (grouped = true) => {
  const url = `${API_BASE_URL}/api/gallery${grouped ? '?grouped=true' : ''}`;
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to fetch gallery items');
  }
  return res.json();
};

export const getGalleryItemById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/api/gallery/${id}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to fetch gallery item');
  }
  return res.json();
};

export const uploadGalleryMedia = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/api/gallery`, {
    method: 'POST',
    body: formData // FormData containing project metadata and multiple mediaFiles
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to upload gallery media');
  }
  return res.json();
};

export const updateGalleryItem = async (id, data) => {
  const res = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to update gallery item');
  }
  return res.json();
};

export const deleteGalleryItem = async (id) => {
  const res = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to delete gallery item');
  }
  return res.json();
};

export const deleteGalleryProject = async (projectName) => {
  const encodedName = encodeURIComponent(projectName);
  const res = await fetch(`${API_BASE_URL}/api/gallery/project/${encodedName}`, {
    method: 'DELETE'
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to delete project gallery');
  }
  return res.json();
};
