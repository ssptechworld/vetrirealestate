import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  Trash2, 
  Edit3, 
  Plus, 
  CheckCircle, 
  AlertCircle, 
  Building, 
  MapPin, 
  Calendar, 
  Image as ImageIcon, 
  Film, 
  X, 
  RefreshCw,
  FolderOpen,
  ArrowLeft,
  Eye
} from 'lucide-react';
import { 
  getGalleryItems, 
  uploadGalleryMedia, 
  deleteGalleryItem, 
  deleteGalleryProject, 
  updateGalleryItem,
  getMediaUrl 
} from '../../services/galleryService';

export default function AdminGallery() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form State
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [completionYear, setCompletionYear] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);

  // UI / Action states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [formError, setFormError] = useState('');

  // Delete Modals
  const [deleteItemModal, setDeleteItemModal] = useState({ open: false, item: null });
  const [deleteProjectModal, setDeleteProjectModal] = useState({ open: false, projectName: '' });

  // Edit Modal
  const [editModal, setEditModal] = useState({ open: false, item: null });
  const [editFormData, setEditFormData] = useState({ projectName: '', location: '', completionYear: '', description: '' });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getGalleryItems(true); // Grouped by project
      setProjects(data);
    } catch (err) {
      console.error(err);
      setError('Could not connect to backend server. Make sure node server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle multiple file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;

    setSelectedFiles((prev) => [...prev, ...files]);

    // Create preview objects
    const newPreviews = files.map((file) => ({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.type.startsWith('video/') ? 'video' : 'image',
      url: URL.createObjectURL(file)
    }));

    setFilePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeSelectedFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit Upload Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setUploadSuccess('');

    if (!projectName.trim()) {
      setFormError('Project name is required.');
      return;
    }

    if (selectedFiles.length === 0) {
      setFormError('Please select at least one image or video file to upload.');
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('projectName', projectName.trim());
      formData.append('location', location.trim());
      formData.append('completionYear', completionYear.trim());
      formData.append('description', description.trim());

      selectedFiles.forEach((file) => {
        formData.append('mediaFiles', file);
      });

      const res = await uploadGalleryMedia(formData);
      setUploadSuccess(res.message || 'Gallery media uploaded successfully!');

      // Reset form
      setProjectName('');
      setLocation('');
      setCompletionYear('');
      setDescription('');
      setSelectedFiles([]);
      setFilePreviews([]);

      // Refresh list
      fetchProjects();

      setTimeout(() => setUploadSuccess(''), 5000);
    } catch (err) {
      console.error(err);
      setFormError(err.message || 'Failed to upload gallery media.');
    } finally {
      setIsUploading(false);
    }
  };

  // Delete Individual Media Item
  const confirmDeleteItem = async () => {
    if (!deleteItemModal.item) return;
    try {
      await deleteGalleryItem(deleteItemModal.item._id);
      setUploadSuccess('Media item deleted successfully.');
      setDeleteItemModal({ open: false, item: null });
      fetchProjects();
      setTimeout(() => setUploadSuccess(''), 3000);
    } catch (err) {
      alert('Failed to delete media item: ' + err.message);
    }
  };

  // Delete Entire Project Gallery
  const confirmDeleteProject = async () => {
    if (!deleteProjectModal.projectName) return;
    try {
      await deleteGalleryProject(deleteProjectModal.projectName);
      setUploadSuccess(`Project '${deleteProjectModal.projectName}' and all media deleted.`);
      setDeleteProjectModal({ open: false, projectName: '' });
      fetchProjects();
      setTimeout(() => setUploadSuccess(''), 3000);
    } catch (err) {
      alert('Failed to delete project: ' + err.message);
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (item) => {
    setEditModal({ open: true, item });
    setEditFormData({
      projectName: item.projectName || '',
      location: item.location || '',
      completionYear: item.completionYear || '',
      description: item.description || ''
    });
  };

  // Save Metadata Edit
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editModal.item) return;
    try {
      await updateGalleryItem(editModal.item._id, editFormData);
      setUploadSuccess('Gallery metadata updated successfully.');
      setEditModal({ open: false, item: null });
      fetchProjects();
      setTimeout(() => setUploadSuccess(''), 3000);
    } catch (err) {
      alert('Failed to update gallery item: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-24 text-[#121417]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-bold block mb-1">
              Admin Portal
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#121417]">
              Gallery Upload & Management
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Upload multiple images and videos for completed projects to display on the public Gallery page.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/gallery"
              target="_blank"
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-[#121417] text-xs font-bold uppercase tracking-wider rounded-xs border border-stone-300 transition-all flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4 text-[#C5A880]" />
              <span>View Live Gallery</span>
            </Link>

            <Link
              to="/admin/projects"
              className="px-4 py-2 bg-[#121417] hover:bg-[#C5A880] hover:text-[#121417] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5"
            >
              <Building className="w-4 h-4" />
              <span>Projects Admin</span>
            </Link>
          </div>
        </div>

        {/* Success / Error Alerts */}
        {uploadSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{uploadSuccess}</span>
          </div>
        )}

        {formError && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-semibold rounded-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Upload Form Section */}
        <div className="bg-white border border-stone-200 rounded-xs p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="font-serif text-xl font-bold text-[#121417] flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#C5A880]" />
              <span>Upload New Project Media</span>
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Select multiple photos/videos and enter the project details below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Project Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vettri Residency"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 focus:border-[#C5A880] focus:bg-white text-xs font-medium rounded-xs outline-none transition-all"
                />
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chennai, ECR"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 focus:border-[#C5A880] focus:bg-white text-xs font-medium rounded-xs outline-none transition-all"
                />
              </div>

              {/* Completion Year */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Completion Year
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2025"
                  value={completionYear}
                  onChange={(e) => setCompletionYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 focus:border-[#C5A880] focus:bg-white text-xs font-medium rounded-xs outline-none transition-all"
                />
              </div>

            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                Short Description
              </label>
              <textarea
                rows={2}
                placeholder="Brief description of the completed luxury project..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 focus:border-[#C5A880] focus:bg-white text-xs font-medium rounded-xs outline-none transition-all"
              />
            </div>

            {/* Multiple File Upload Box */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                Select Images & Videos (Multiple allowed)
              </label>

              <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-stone-300 hover:border-[#C5A880] rounded-xs cursor-pointer bg-stone-50/50 hover:bg-stone-50 transition-all text-center">
                <Upload className="w-8 h-8 text-[#C5A880] mb-2" />
                <span className="text-xs font-semibold text-zinc-700">Click to choose image or video files</span>
                <span className="text-[11px] text-zinc-400 mt-1">
                  Supported formats: JPG, PNG, WEBP, MP4, WEBM, MOV (Max 100MB per file)
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/jpg,video/mp4,video/webm,video/quicktime"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Selected File Previews */}
            {filePreviews.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
                  Selected Files ({filePreviews.length}):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  {filePreviews.map((prev, idx) => (
                    <div key={idx} className="relative aspect-square bg-stone-900 rounded-xs overflow-hidden border border-stone-300 group">
                      {prev.type === 'video' ? (
                        <video src={prev.url} className="w-full h-full object-cover opacity-70" />
                      ) : (
                        <img src={prev.url} alt={prev.name} className="w-full h-full object-cover" />
                      )}
                      
                      <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-1.5 opacity-100">
                        <button
                          type="button"
                          onClick={() => removeSelectedFile(idx)}
                          className="self-end p-1 bg-red-600 hover:bg-red-700 text-white rounded-xs transition-colors cursor-pointer"
                          title="Remove file"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[9px] text-white font-mono truncate bg-black/60 px-1 rounded-xs">
                          {prev.type.toUpperCase()} ({prev.size})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isUploading}
                className="px-8 py-3 bg-[#121417] hover:bg-[#C5A880] hover:text-[#121417] text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-all shadow-md cursor-pointer flex items-center gap-2 disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#C5A880]" />
                    <span>Uploading to Cloudinary...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload Project Media</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Existing Projects Dashboard */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#121417]">
                Uploaded Gallery Projects
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Manage uploaded media items or delete completed projects.
              </p>
            </div>

            <button
              onClick={fetchProjects}
              className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-zinc-700 text-xs font-semibold rounded-xs border border-stone-300 transition-all flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {loading && (
            <div className="py-12 text-center text-zinc-500">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#C5A880] mb-2" />
              <span className="text-xs uppercase tracking-wider font-semibold">Loading Gallery Data...</span>
            </div>
          )}

          {!loading && projects.length === 0 && (
            <div className="py-12 text-center bg-white border border-stone-200 rounded-xs text-zinc-500 space-y-2">
              <FolderOpen className="w-10 h-10 mx-auto opacity-40 text-[#C5A880]" />
              <p className="text-sm font-medium">No projects uploaded yet.</p>
              <p className="text-xs text-zinc-400">Use the form above to add your first completed project media.</p>
            </div>
          )}

          {!loading && projects.length > 0 && (
            <div className="space-y-8">
              {projects.map((proj, idx) => (
                <div key={idx} className="bg-white border border-stone-200 rounded-xs p-6 shadow-xs space-y-4">
                  
                  {/* Project Summary Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-serif text-xl font-bold text-[#121417]">
                          {proj.projectName}
                        </h3>
                        {proj.location && (
                          <span className="text-xs text-zinc-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#C5A880]" />
                            <span>{proj.location}</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">
                        Contains <span className="font-bold text-[#121417]">{proj.media.length}</span> media file(s)
                      </p>
                    </div>

                    <button
                      onClick={() => setDeleteProjectModal({ open: true, projectName: proj.projectName })}
                      className="px-3.5 py-1.5 bg-red-50 hover:bg-red-600 hover:text-white text-red-700 text-xs font-semibold rounded-xs border border-red-200 transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Entire Project</span>
                    </button>
                  </div>

                  {/* Media Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                    {proj.media.map((mediaItem) => {
                      const fullUrl = getMediaUrl(mediaItem.mediaUrl);
                      const isVideo = mediaItem.mediaType === 'video';

                      return (
                        <div key={mediaItem._id} className="group relative aspect-square bg-stone-900 rounded-xs overflow-hidden border border-stone-200">
                          {isVideo ? (
                            <video src={fullUrl} className="w-full h-full object-cover opacity-80" />
                          ) : (
                            <img src={fullUrl} alt="" className="w-full h-full object-cover" />
                          )}

                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between">
                            <span className="text-[10px] text-white font-mono uppercase bg-black/70 px-1.5 py-0.5 rounded-xs self-start">
                              {mediaItem.mediaType}
                            </span>

                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenEdit(mediaItem)}
                                className="p-1.5 bg-white/20 hover:bg-white text-white hover:text-black rounded-xs transition-colors cursor-pointer"
                                title="Edit metadata"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => setDeleteItemModal({ open: true, item: mediaItem })}
                                className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xs transition-colors cursor-pointer"
                                title="Delete media file"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Delete Item Modal */}
      {deleteItemModal.open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-xs max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-[#121417]">Confirm Media Deletion</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Are you sure you want to delete this media item? This action will permanently delete the file from Cloudinary and database storage.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteItemModal({ open: false, item: null })}
                className="px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-stone-100 rounded-xs border border-stone-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteItem}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xs shadow-md"
              >
                Delete File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Project Modal */}
      {deleteProjectModal.open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-xs max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-[#121417]">Confirm Entire Project Deletion</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Are you sure you want to delete <span className="font-bold text-red-600">{deleteProjectModal.projectName}</span> and all of its associated gallery photos and videos? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteProjectModal({ open: false, projectName: '' })}
                className="px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-stone-100 rounded-xs border border-stone-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProject}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xs shadow-md"
              >
                Delete Project Gallery
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Metadata Modal */}
      {editModal.open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-xs max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-[#121417]">Edit Gallery Metadata</h3>
            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Project Name</label>
                <input
                  type="text"
                  value={editFormData.projectName}
                  onChange={(e) => setEditFormData({ ...editFormData, projectName: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xs text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Location</label>
                <input
                  type="text"
                  value={editFormData.location}
                  onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xs text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Completion Year</label>
                <input
                  type="text"
                  value={editFormData.completionYear}
                  onChange={(e) => setEditFormData({ ...editFormData, completionYear: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xs text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xs text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditModal({ open: false, item: null })}
                  className="px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-stone-100 rounded-xs border border-stone-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-[#121417] hover:bg-[#C5A880] hover:text-[#121417] rounded-xs shadow-md transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
