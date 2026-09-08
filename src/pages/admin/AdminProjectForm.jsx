import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Upload, Image as ImageIcon, Save, AlertCircle, RefreshCw } from 'lucide-react';
import { createProject, updateProject, getProjectById, getImageUrl } from '../../services/projectService';

export default function AdminProjectForm({ isEdit = false }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: 'Apartment',
    status: 'ongoing',
    price: '',
    description: '',
    bedrooms: '3 BHK',
    area: '1850 Sq.Ft',
    completionDate: '',
    featured: false
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState('');

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      const fetchProject = async () => {
        try {
          setFetching(true);
          const project = await getProjectById(id);
          setFormData({
            name: project.name || '',
            location: project.location || '',
            type: project.type || 'Apartment',
            status: project.status || 'ongoing',
            price: project.price || '',
            description: project.description || '',
            bedrooms: project.bedrooms || '3 BHK',
            area: project.area || '1850 Sq.Ft',
            completionDate: project.completionDate || '',
            featured: Boolean(project.featured)
          });
          if (project.image) {
            setExistingImage(getImageUrl(project.image));
          }
        } catch (err) {
          console.error(err);
          setError('Failed to load project details.');
        } finally {
          setFetching(false);
        }
      };
      fetchProject();
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file format. Please upload a JPG, JPEG, PNG, or WEBP image.');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size is too large. Maximum size is 10MB.');
      return;
    }

    setError('');
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Project Name is required.');
      return;
    }
    if (!formData.location.trim()) {
      setError('Location is required.');
      return;
    }
    if (!formData.price.trim()) {
      setError('Price is required.');
      return;
    }
    if (!isEdit && !imageFile) {
      setError('Please select a project image to upload.');
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append('name', formData.name);
      data.append('location', formData.location);
      data.append('type', formData.type);
      data.append('status', formData.status);
      data.append('price', formData.price);
      data.append('description', formData.description);
      data.append('bedrooms', formData.bedrooms);
      data.append('area', formData.area);
      data.append('completionDate', formData.completionDate);
      data.append('featured', formData.featured);

      if (imageFile) {
        data.append('image', imageFile);
      }

      if (isEdit) {
        await updateProject(id, data);
      } else {
        await createProject(data);
      }

      navigate('/admin/projects');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error saving project');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-32 pb-20 px-4 text-center">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#C5A880] mb-3" />
        <p className="text-zinc-600 text-sm font-medium">Fetching project parameters...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121417] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation back */}
        <Link
          to="/admin/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500 hover:text-[#121417] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>

        {/* Page Header */}
        <div className="mb-8 border-b border-stone-200 pb-6">
          <span className="text-xs uppercase tracking-widest text-[#C5A880] font-bold block mb-1">
            {isEdit ? 'Update Entry' : 'New Listing'}
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#121417]">
            {isEdit ? 'Edit Project' : 'Add New Project'}
          </h1>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-900 text-sm rounded-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-xs shadow-sm p-6 sm:p-8 space-y-8">
          
          {/* Section 1: Image Upload */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#121417] border-b border-stone-100 pb-2">
              Project Image Showcase
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              
              {/* Image Preview Box */}
              <div className="relative aspect-[16/10] bg-stone-100 border border-stone-200 rounded-xs overflow-hidden flex items-center justify-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : existingImage ? (
                  <img src={existingImage} alt="Current" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-6 text-zinc-400">
                    <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <span className="text-xs block">No image selected</span>
                  </div>
                )}
              </div>

              {/* Upload Input */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Upload Image file (JPG, PNG, WEBP)
                </label>
                
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-stone-300 hover:border-[#C5A880] rounded-xs cursor-pointer bg-stone-50/50 hover:bg-stone-50 transition-all text-center">
                  <Upload className="w-6 h-6 text-[#C5A880] mb-2" />
                  <span className="text-xs font-semibold text-zinc-700">Click to choose image file</span>
                  <span className="text-[11px] text-zinc-400 mt-1">Recommended size: 1920x1080 (Max 10MB)</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {imageFile && (
                  <p className="text-xs text-emerald-700 font-medium truncate">
                    Selected file: {imageFile.name}
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* Section 2: Core Details */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#121417] border-b border-stone-100 pb-2">
              Project Specification
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Green Valley Residences"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-[#C5A880] focus:bg-white text-sm rounded-xs transition-colors outline-none"
                  required
                />
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. ECR, Chennai"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-[#C5A880] focus:bg-white text-sm rounded-xs transition-colors outline-none"
                  required
                />
              </div>

              {/* Type */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Project Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-[#C5A880] focus:bg-white text-sm rounded-xs transition-colors outline-none cursor-pointer"
                >
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot">Plot</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Project Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-[#C5A880] focus:bg-white text-sm rounded-xs transition-colors outline-none cursor-pointer font-semibold"
                >
                  <option value="ongoing">ONGOING</option>
                  <option value="completed">COMPLETED</option>
                </select>
              </div>

              {/* Price */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Price / Price Range *
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. ₹85 Lakhs or ₹1.8 Cr"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-[#C5A880] focus:bg-white text-sm rounded-xs transition-colors outline-none"
                  required
                />
              </div>

              {/* Completion Date */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Possession / Completion Date
                </label>
                <input
                  type="text"
                  name="completionDate"
                  value={formData.completionDate}
                  onChange={handleChange}
                  placeholder="e.g. Q4 2025"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-[#C5A880] focus:bg-white text-sm rounded-xs transition-colors outline-none"
                />
              </div>

              {/* Bedrooms */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Bedrooms / Layout
                </label>
                <input
                  type="text"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="e.g. 3 BHK"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-[#C5A880] focus:bg-white text-sm rounded-xs transition-colors outline-none"
                />
              </div>

              {/* Area */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Total Area
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="e.g. 1850 Sq.Ft"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-[#C5A880] focus:bg-white text-sm rounded-xs transition-colors outline-none"
                />
              </div>

            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                Short Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Enter a brief overview of the project highlights, architectural features, and location benefits..."
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-[#C5A880] focus:bg-white text-sm rounded-xs transition-colors outline-none resize-none"
              />
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 accent-[#C5A880] cursor-pointer"
              />
              <label htmlFor="featured" className="text-xs font-bold uppercase tracking-wider text-zinc-800 cursor-pointer select-none">
                Mark as Featured Project (Highlighted on Home page)
              </label>
            </div>

          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 border-t border-stone-100 pt-6">
            <Link
              to="/admin/projects"
              className="px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold uppercase tracking-widest rounded-xs transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-[#121417] hover:bg-[#C5A880] hover:text-[#121417] text-white text-xs font-bold uppercase tracking-widest rounded-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEdit ? 'Update Project' : 'Save Project'}</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
