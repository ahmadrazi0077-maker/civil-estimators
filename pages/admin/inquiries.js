import { useState, useEffect } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import { inquiryAPI } from '../../lib/api';

// Extract attached file links from a quote-request message.
// Expected format (written by the /quote page):
//   Attached drawings/files:
//   - filename: https://...
//   - filename: https://...
function extractAttachments(message) {
  if (!message || typeof message !== 'string') return [];
  const lines = message.split('\n');
  const start = lines.findIndex((l) => l.toLowerCase().includes('attached drawings/files'));
  if (start === -1) return [];
  const attachments = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line.startsWith('-')) break;
    const match = line.slice(1).trim().match(/^(.*?):\s*(https?:\/\/\S+)/);
    if (match) {
      attachments.push({ name: match[1].trim(), url: match[2] });
    } else {
      const urlMatch = line.match(/https?:\/\/\S+/);
      if (urlMatch) attachments.push({ name: urlMatch[0].split('/').pop() || 'file', url: urlMatch[0] });
    }
  }
  return attachments;
}

// Render plain text with clickable links for any URLs it contains
function renderWithLinks(text) {
  if (!text || typeof text !== 'string') return text;
  // With a capturing group, split() puts the matched URLs at odd indexes
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

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
  <div className="flex items-center gap-2">
    <span>{inquiry.service}</span>
    {inquiry.attachments && inquiry.attachments.length > 0 && (
      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
        📎 {inquiry.attachments.length}
      </span>
    )}
  </div>
</td>
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
      {/* Inquiry Detail Modal - Add this section */}
{selectedInquiry && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 pb-4 border-b">
          <div>
            <h3 className="text-2xl font-bold">Inquiry Details</h3>
            {selectedInquiry.isQuote && (
              <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                📋 QUOTE REQUEST
              </span>
            )}
          </div>
          <button
            onClick={() => setSelectedInquiry(null)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
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

        {/* Message */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Message</p>
          <div className="bg-gray-50 p-4 rounded-xl whitespace-pre-line text-sm">
            {selectedInquiry.message}
          </div>
        </div>

        {/* Attachments */}
        {selectedInquiry.attachments && selectedInquiry.attachments.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3">
              📎 Attached Files ({selectedInquiry.attachments.length})
            </p>
            <div className="space-y-2">
              {selectedInquiry.attachments.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-4 py-3"
                >
                  <div className="flex items-center min-w-0 flex-1">
                    <span className="text-2xl mr-3">
                      {file.name?.endsWith('.pdf') ? '📄' :
                       file.name?.match(/\.(dwg|dxf)$/i) ? '📐' :
                       file.name?.endsWith('.ifc') ? '🏗️' :
                       file.name?.match(/\.(png|jpg|jpeg|webp)$/i) ? '🖼️' : '📎'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                      {file.size && (
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      )}
                    </div>
                  </div>
                  {file.url ? (
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Download
                    </a>
                  ) : (
                    <span className="text-xs text-gray-500 italic">Upload failed</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reply Section */}
        <div className="border-t pt-6">
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
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
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