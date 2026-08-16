import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/Admin/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { servicesAPI, blogAPI, inquiryAPI, projectsAPI, subscriberAPI } from '../../lib/api';

export default function Dashboard() {
  const { admin, loading } = useAuth();
  const router = useRouter();
  
  const [subscriberStats, setSubscriberStats] = useState({ 
    total: 0, 
    active: 0, 
    today: 0 
  });
  
  const [stats, setStats] = useState({
    services: 0,
    blogPosts: 0,
    inquiries: 0,
    projects: 0,
    newInquiries: 0,
  });
  
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    // Check if logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    fetchStats();
    fetchSubscriberStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      
      // Fetch all data in parallel
      const [services, blog, inquiries, projects] = await Promise.all([
        servicesAPI.getAll().catch(() => []),
        blogAPI.getAll().catch(() => ({ posts: [] })),
        inquiryAPI.getAll().catch(() => ({ inquiries: [] })),
        projectsAPI.getAll().catch(() => []),
      ]);

      setStats({
        services: Array.isArray(services) ? services.length : 0,
        blogPosts: blog.posts?.length || blog.length || 0,
        inquiries: inquiries.inquiries?.length || inquiries.length || 0,
        projects: Array.isArray(projects) ? projects.length : 0,
        newInquiries: inquiries.inquiries?.filter(i => i.status === 'new').length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchSubscriberStats = async () => {
    try {
      const stats = await subscriberAPI.getStats();
      setSubscriberStats(stats);
    } catch (error) {
      console.error('Error fetching subscriber stats:', error);
      // Set default values if API fails
      setSubscriberStats({ total: 0, active: 0, today: 0 });
    }
  };

  if (loading || loadingStats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const quickActions = [
    {
      title: 'Add New Service',
      description: 'Create a new service offering',
      href: '/admin/services/add',
      icon: '🛠️',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
    },
    {
      title: 'Add New Project',
      description: 'Add portfolio project',
      href: '/admin/projects/add',
      icon: '🏗️',
      bgColor: 'bg-green-50 hover:bg-green-100',
    },
    {
      title: 'Write Blog Post',
      description: 'Publish a new article',
      href: '/admin/blog/add',
      icon: '📝',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
    },
    {
      title: 'View Inquiries',
      description: 'Check customer messages',
      href: '/admin/inquiries',
      icon: '📧',
      bgColor: 'bg-yellow-50 hover:bg-yellow-100',
    },
    {
      title: 'View Subscribers',
      description: 'Manage newsletter subscribers',
      href: '/admin/subscribers',
      icon: '📬',
      bgColor: 'bg-pink-50 hover:bg-pink-100',
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          Welcome, {admin?.username || 'Admin'}!
        </h2>
        <p className="text-gray-600">Here's what's happening with your website.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-3">🛠️</div>
            <div>
              <p className="text-gray-600 text-sm">Total Services</p>
              <p className="text-2xl font-bold">{stats.services}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-3">🏗️</div>
            <div>
              <p className="text-gray-600 text-sm">Projects</p>
              <p className="text-2xl font-bold">{stats.projects}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-3">📝</div>
            <div>
              <p className="text-gray-600 text-sm">Blog Posts</p>
              <p className="text-2xl font-bold">{stats.blogPosts}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-3">📧</div>
            <div>
              <p className="text-gray-600 text-sm">Inquiries</p>
              <p className="text-2xl font-bold">{stats.inquiries}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscriber Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-3">📬</div>
            <div>
              <p className="text-gray-600 text-sm">Total Subscribers</p>
              <p className="text-2xl font-bold text-blue-600">{subscriberStats.total || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-3">✅</div>
            <div>
              <p className="text-gray-600 text-sm">Active Subscribers</p>
              <p className="text-2xl font-bold text-green-600">{subscriberStats.active || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-3">🆕</div>
            <div>
              <p className="text-gray-600 text-sm">New Today</p>
              <p className="text-2xl font-bold text-yellow-600">{subscriberStats.today || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* New Inquiries Alert */}
      {stats.newInquiries > 0 && (
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🔔</span>
            <div>
              <p className="font-semibold text-blue-800">
                You have {stats.newInquiries} new {stats.newInquiries === 1 ? 'inquiry' : 'inquiries'}
              </p>
              <button
                onClick={() => router.push('/admin/inquiries')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1"
              >
                View inquiries →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.title}
              onClick={() => router.push(action.href)}
              className={`p-4 rounded-lg transition-colors text-left ${action.bgColor}`}
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <p className="font-semibold">{action.title}</p>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Tips & Reminders */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Tips & Reminders</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <span className="text-xl mr-3">💡</span>
            <p className="text-gray-700">
              Keep your services updated with accurate pricing and descriptions to attract more clients.
            </p>
          </div>
          <div className="flex items-start">
            <span className="text-xl mr-3">📸</span>
            <p className="text-gray-700">
              Add high-quality images to your projects to showcase your work effectively.
            </p>
          </div>
          <div className="flex items-start">
            <span className="text-xl mr-3">📧</span>
            <p className="text-gray-700">
              Regular newsletter updates can help keep your subscribers engaged.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}