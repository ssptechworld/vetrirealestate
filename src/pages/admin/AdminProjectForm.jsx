import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Upload, Image as ImageIcon, Save, AlertCircle, RefreshCw, FileText, X, Check } from 'lucide-react';
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
    bedrooms: '3 BHK',
    area: '1850 Sq.Ft',
    completionDate: '',
    featured: false
  });

  // Multiple project images state
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const [existingImagesList, setExistingImagesList] = useState([]);

  // Project brochure (PDF) state
  const [brochureFile, setBrochureFile] = useState(null);
  const [existingBrochureUrl, setExistingBrochureUrl] = useState('');

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
            bedrooms: project.bedrooms || '3 BHK',
            area: project.area || '1850 Sq.Ft',
            completionDate: project.completionDate || '',
            featured: Boolean(project.featured)
          });

          // Collect existing images
          const allExisting = [];
          if (Array.isArray(project.images) && project.images.length > 0) {
            project.images.forEach((img) => {
              const u = getImageUrl(img);
              if (u && !allExisting.includes(u)) allExisting.push(u);
            });
          } else if (project.image) {
            allExisting.push(getImageUrl(project.image));
          }
          setExistingImagesList(allExisting);

          if (project.brochureUrl) {
            setExistingBrochureUrl(getImageUrl(project.brochureUrl));
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

  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const validFiles = [];
    const newPreviews = [];

    for (const file of files) {
      if (!validTypes.includes(file.type)) {
        setError(`"${file.name}" is not a valid format. Please upload JPG, PNG, or WEBP.`);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError(`"${file.name}" exceeds 10MB limit.`);
        return;
      }
      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }

    setError('');
    setNewImageFiles((prev) => [...prev, ...validFiles]);
    setNewImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeNewImage = (index) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImagesList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleBrochureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setError('Invalid file format. Please upload a PDF file for the brochure.');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setError('Brochure file size exceeds 25MB limit.');
      return;
    }

    setError('');
    setBrochureFile(file);
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
    if (!isEdit && newImageFiles.length === 0) {
      setError('Please select at least one project image to upload.');
      return;
    }
    if (isEdit && existingImagesList.length === 0 && newImageFiles.length === 0) {
      setError('The project must have at least one image.');
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
      data.append('bedrooms', formData.bedrooms);
      data.append('area', formData.area);
      data.append('completionDate', formData.completionDate);
      data.append('featured', formData.featured);

      // Append retained existing images list
      data.append('existingImages', JSON.stringify(existingImagesList));

      // Append new images
      if (newImageFiles.length > 0) {
        newImageFiles.forEach((file) => {
          data.append('images', file);
        });
      }

      // Append brochure PDF if selected
      if (brochureFile) {
        data.append('brochure', brochureFile);
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
          
          {/* Section 1: Multiple Project Images */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <h3 className="font-serif text-lg font-bold text-[#121417]">
                Project Images
              </h3>
              <span className="text-xs text-zinc-500 font-medium">
                {existingImagesList.length + newImageFiles.length} image{existingImagesList.length + newImageFiles.length !== 1 ? 's' : ''} total
              </span>
            </div>

            {/* Upload Zone */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                Upload Project Images (Select multiple files)
              </label>
              
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-stone-300 hover:border-[#C5A880] rounded-xs cursor-pointer bg-stone-50/50 hover:bg-stone-50 transition-all text-center">
                <Upload className="w-6 h-6 text-[#C5A880] mb-2" />
                <span className="text-xs font-semibold text-zinc-700">Click to choose one or more images</span>
                <span className="text-[11px] text-zinc-400 mt-1">Recommended: 1920x1080 (JPG, PNG, WEBP — Max 10MB per image)</span>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleMultipleImagesChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Images Preview Grid */}
            {(existingImagesList.length > 0 || newImagePreviews.length > 0) && (
              <div className="pt-2">
                <span className="text-[11px] uppercase tracking-wider font-bold text-zinc-500 block mb-2">
                  Uploaded & Selected Images
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {/* Existing Saved Images */}
                  {existingImagesList.map((url, idx) => (
                    <div key={`existing-${idx}`} className="relative aspect-[16/10] bg-stone-100 border border-stone-200 rounded-xs overflow-hidden group shadow-xs">
                      <img src={url} alt={`Saved ${idx + 1}`} className="w-full h-full object-cover" />
                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 bg-[#0E1013]/80 text-[#C5A880] text-[9px] font-bold uppercase rounded-xs">
                        Saved
                      </span>
                      <button
                        type="button"
                        onClick={() => removeExistingImage(idx)}
                        className="absolute top-1.5 right-1.5 p-1 bg-red-600/90 text-white rounded-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 cursor-pointer"
                        title="Remove image"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {/* Newly Selected Images */}
                  {newImagePreviews.map((url, idx) => (
                    <div key={`new-${idx}`} className="relative aspect-[16/10] bg-stone-100 border-2 border-dashed border-[#C5A880] rounded-xs overflow-hidden group shadow-xs">
                      <img src={url} alt={`New ${idx + 1}`} className="w-full h-full object-cover" />
                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 bg-emerald-700 text-white text-[9px] font-bold uppercase rounded-xs">
                        New
                      </span>
                      <button
                        type="button"
                        onClick={() => removeNewImage(idx)}
                        className="absolute top-1.5 right-1.5 p-1 bg-red-600/90 text-white rounded-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 cursor-pointer"
                        title="Remove image"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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

              {/* Location (Replaces Short Description & provides exact project location) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Medavakkam, Chennai"
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

          {/* Section 3: Project Brochure (PDF) */}
          <div className="space-y-4 border-t border-stone-100 pt-6">
            <h3 className="font-serif text-lg font-bold text-[#121417] border-b border-stone-100 pb-2">
              Project Brochure (PDF)
            </h3>

            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                Upload Brochure (PDF Only)
              </label>

              {/* Show Existing Brochure info if present */}
              {existingBrochureUrl && !brochureFile && (
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#C5A880]" />
                    <div>
                      <span className="text-xs font-semibold text-zinc-800 block">Current Brochure is Uploaded</span>
                      <span className="text-[11px] text-zinc-500">Select a new PDF below if you want to replace it</span>
                    </div>
                  </div>
                  <a
                    href={existingBrochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-white border border-stone-300 text-xs font-semibold text-zinc-700 rounded-xs hover:border-[#C5A880] transition-colors"
                  >
                    View PDF
                  </a>
                </div>
              )}

              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-stone-300 hover:border-[#C5A880] rounded-xs cursor-pointer bg-stone-50/50 hover:bg-stone-50 transition-all text-center">
                <FileText className="w-6 h-6 text-[#C5A880] mb-2" />
                <span className="text-xs font-semibold text-zinc-700">
                  {existingBrochureUrl ? 'Click to replace existing brochure (PDF)' : 'Click to choose brochure (PDF)'}
                </span>
                <span className="text-[11px] text-zinc-400 mt-1">Accepts PDF files only (Max 25MB)</span>
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleBrochureChange}
                  className="hidden"
                />
              </label>

              {brochureFile && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs text-emerald-800 font-semibold truncate">
                      Selected: {brochureFile.name} ({(brochureFile.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBrochureFile(null)}
                    className="text-xs text-red-600 hover:text-red-800 font-bold"
                  >
                    Cancel
                  </button>
                </div>
              )}
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
