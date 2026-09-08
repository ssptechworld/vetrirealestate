import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Building, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { getProjects, deleteProject, updateProjectStatus, getImageUrl } from '../../services/projectService';

export default function AdminProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [actionSuccess, setActionSuccess] = useState('');

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProjects();
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

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Optimistic update
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: newStatus } : p))
      );
      await updateProjectStatus(id, newStatus);
      setActionSuccess(`Project status updated to ${newStatus.toUpperCase()}`);
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      fetchProjects(); // Revert on failure
      alert('Failed to update project status');
    }
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      await deleteProject(projectToDelete._id);
      setProjects((prev) => prev.filter((p) => p._id !== projectToDelete._id));
      setActionSuccess('Project deleted successfully');
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to delete project: ' + err.message);
    } finally {
      setDeleteModalOpen(false);
      setProjectToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121417] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-stone-200 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-bold block mb-1">
              Admin Portal
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#121417]">
              Project Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchProjects}
              className="p-2.5 bg-white border border-stone-200 hover:border-[#C5A880] rounded-xs shadow-sm text-zinc-600 hover:text-[#121417] transition-all cursor-pointer"
              title="Refresh Projects"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <Link
              to="/admin/projects/add"
              className="px-5 py-2.5 bg-[#121417] hover:bg-[#C5A880] hover:text-[#121417] text-white text-xs font-bold uppercase tracking-widest rounded-xs shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </Link>
          </div>
        </div>

        {/* Notifications */}
        {actionSuccess && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-900 text-sm rounded-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading && projects.length === 0 ? (
          <div className="py-20 text-center text-zinc-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#C5A880] mb-3" />
            <p className="text-sm font-medium">Loading project catalog...</p>
          </div>
        ) : projects.length === 0 ? (
          /* Empty State */
          <div className="py-20 bg-white border border-stone-200 rounded-xs text-center p-8">
            <Building className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#121417]">No Projects Found</h3>
            <p className="text-zinc-500 text-sm mt-1 max-w-md mx-auto mb-6">
              There are currently no projects in the database. Add your first project to display it on the website.
            </p>
            <Link
              to="/admin/projects/add"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#121417] text-white text-xs font-bold uppercase tracking-widest rounded-xs hover:bg-[#C5A880] hover:text-[#121417] transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Project</span>
            </Link>
          </div>
        ) : (
          /* Projects Table */
          <div className="bg-white border border-stone-200 rounded-xs shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#121417] text-white text-xs uppercase tracking-wider font-semibold border-b border-stone-800">
                    <th className="py-4 px-6">Image</th>
                    <th className="py-4 px-6">Project Name</th>
                    <th className="py-4 px-6">Location</th>
                    <th className="py-4 px-6">Type</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-sm">
                  {projects.map((project) => (
                    <tr key={project._id} className="hover:bg-stone-50 transition-colors">
                      
                      {/* Image Thumbnail */}
                      <td className="py-4 px-6">
                        <div className="w-16 h-12 rounded-xs overflow-hidden bg-stone-100 border border-stone-200">
                          <img
                            src={getImageUrl(project.image)}
                            alt={project.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>

                      {/* Name & Featured Badge */}
                      <td className="py-4 px-6 font-semibold text-[#121417]">
                        <div className="flex flex-col">
                          <span>{project.name}</span>
                          {project.featured && (
                            <span className="text-[10px] text-[#C5A880] uppercase tracking-wider font-bold">
                              ★ Featured
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-4 px-6 text-zinc-600 font-light">{project.location}</td>

                      {/* Type */}
                      <td className="py-4 px-6 text-zinc-700">
                        <span className="px-2.5 py-1 bg-stone-100 border border-stone-200 rounded-xs text-xs">
                          {project.type}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6 font-serif font-bold text-[#121417]">
                        {project.price}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-6">
                        <select
                          value={project.status}
                          onChange={(e) => handleStatusChange(project._id, e.target.value)}
                          className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xs border transition-colors cursor-pointer ${
                            project.status === 'ongoing'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          }`}
                        >
                          <option value="ongoing">ONGOING</option>
                          <option value="completed">COMPLETED</option>
                        </select>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-xs text-zinc-500">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/projects/edit/${project._id}`}
                            className="p-2 text-zinc-600 hover:text-[#121417] hover:bg-stone-200/60 rounded-xs transition-colors"
                            title="Edit Project"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => handleDeleteClick(project)}
                            className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-xs transition-colors cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full p-6 rounded-xs shadow-2xl border border-stone-200 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#121417]">Delete Project</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Are you sure you want to delete <strong className="text-[#121417]">{projectToDelete.name}</strong>?
              This action will remove the project details and delete its uploaded image file from the server.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                  setProjectToDelete(null);
                }}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
