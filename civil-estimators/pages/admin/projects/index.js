import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout';
import Link from 'next/link';
import { projectsAPI } from '../../../lib/api';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsAPI.getAll();
      setProjects(data);
      setError('');
    } catch (err) {
      setError('Failed to load projects');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.delete(id);
        fetchProjects();
        alert('Project deleted successfully!');
      } catch (err) {
        alert('Failed to delete project');
        console.error('Error:', err);
      }
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      await projectsAPI.toggleFeatured(id);
      fetchProjects();
    } catch (err) {
      alert('Failed to update project');
      console.error('Error:', err);
    }
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : filter === 'featured' 
      ? projects.filter(p => p.isFeatured)
      : projects.filter(p => p.category === filter);

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-8">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Projects Management</h2>
          <p className="text-gray-600 mt-1">Manage your portfolio projects</p>
        </div>
        <Link
          href="/admin/projects/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Project
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          All ({projects.length})
        </button>
        <button
          onClick={() => setFilter('featured')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'featured' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Featured ({projects.filter(p => p.isFeatured).length})
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Project Image */}
            <div className="relative h-40 bg-gray-200">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-4xl">🏗️</span>
                </div>
              )}
              {project.isFeatured && (
                <span className="absolute top-2 left-2 bg-yellow-400 text-white px-2 py-1 rounded text-xs font-semibold">
                  ⭐ Featured
                </span>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold mb-1">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{project.category}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>{project.location}</span>
                <span>{project.value}</span>
              </div>
              
              <div className="flex space-x-2">
                <Link
                  href={`/admin/projects/edit/${project._id}`}
                  className="flex-1 text-center bg-blue-100 text-blue-700 px-3 py-2 rounded hover:bg-blue-200 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleToggleFeatured(project._id)}
                  className={`flex-1 px-3 py-2 rounded transition-colors ${
                    project.isFeatured
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {project.isFeatured ? 'Unfeature' : 'Feature'}
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded hover:bg-red-200 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No projects found</p>
          <Link
            href="/admin/projects/add"
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Your First Project
          </Link>
        </div>
      )}
    </AdminLayout>
  );
}