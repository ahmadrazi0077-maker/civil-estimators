import { useState, useEffect } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import { inquiryAPI } from '../../lib/api';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [stats, setStats] = useState({ total: 0, new: 0, read: 0, replied: 0 });

  useEffect(() => {
    fetchInquiries();
    fetchStats();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await inquiryAPI.getAll();
      const inquiriesData = data.inquiries || data || [];
      setInquiries(inquiriesData);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
      setError('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const statsData = await inquiryAPI.getStats();
      setStats(statsData);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await inquiryAPI.update(id, { status: newStatus });
      fetchInquiries();
      fetchStats();
    } catch (err) {
      alert('Failed to update status');
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await inquiryAPI.delete(id);
        fetchInquiries();
        fetchStats();
        alert('Inquiry deleted successfully!');
      } catch (err) {
        alert('Failed to delete inquiry');
        console.error('Error:', err);
      }
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await inquiryAPI.markAsRead(id);
      fetchInquiries();
      fetchStats();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleReply = async (id) => {
    if (!replyText.trim()) {
      alert('Please enter a reply');
      return;
    }

    try {
      await inquiryAPI.update(id, {
        status: 'replied',
        reply: replyText,
      });
      setReplyText('');
      setSelectedInquiry(null);
      fetchInquiries();
      fetchStats();
      alert('Reply sent successfully!');
    } catch (err) {
      alert('Failed to send reply');
      console.error('Error:', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesFilter = filter === 'all' || inquiry.status === filter;
    const matchesSearch = 
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.service.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading inquiries...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Inquiries Management</h2>
        <p className="text-gray-600 mt-1">View and manage customer inquiries</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">New</p>
          <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Read</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.read}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Replied</p>
          <p className="text-2xl font-bold text-green-600">{stats.replied}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('new')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === 'new' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            New
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === 'read' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Read
          </button>
          <button
            onClick={() => setFilter('replied')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === 'replied' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Replied
          </button>
        </div>
        <input
          type="text"
          placeholder="Search inquiries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Inquiries Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map((inquiry) => (
                  <tr key={inquiry._id || inquiry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{inquiry.name}</td>
                    <td className="px-6 py-4">{inquiry.email}</td>
                    <td className="px-6 py-4">{inquiry.service}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View
                        </button>
                        {inquiry.status === 'new' && (
                          <button
                            onClick={() => handleMarkAsRead(inquiry._id || inquiry.id)}
                            className="text-yellow-600 hover:text-yellow-800"
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(inquiry._id || inquiry.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-600">
                    No inquiries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">Inquiry Details</h3>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedInquiry.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedInquiry.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{selectedInquiry.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Service</p>
                    <p className="font-medium">{selectedInquiry.service}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Message</p>
                  <p className="mt-1 text-gray-800 bg-gray-50 p-3 rounded-lg">{selectedInquiry.message}</p>
                </div>
              </div>

              {/* Reply Section */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Reply to Inquiry</h4>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
                  placeholder="Type your reply here..."
                />
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleReply(selectedInquiry._id || selectedInquiry.id)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}