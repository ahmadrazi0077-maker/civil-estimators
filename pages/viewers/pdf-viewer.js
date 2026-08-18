import { useState } from 'react';
import Layout from '../../components/Layout/Layout';

export default function PDFViewer() {
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      setPdfFile(file);
      setError('');
      setLoading(true);
      setTimeout(() => setLoading(false), 500);
    } else {
      setError('Please upload a PDF file');
    }
  };

  const handleUrlLoad = () => {
    if (pdfUrl.trim()) {
      setError('');
      setLoading(true);
      setTimeout(() => setLoading(false), 500);
    } else {
      setError('Please enter a PDF URL');
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">PDF Drawing Viewer</h1>
            <p className="text-gray-600">Upload or enter URL to view PDF drawings</p>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Upload PDF File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label htmlFor="pdf-upload" className="cursor-pointer">
                    <svg className="w-16 h-16 text-red-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-600 font-medium">Click to upload PDF</p>
                    <p className="text-xs text-gray-400 mt-1">Max 50MB</p>
                  </label>
                </div>
              </div>

              {/* URL Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Or Enter PDF URL</label>
                <div className="space-y-3">
                  <input
                    type="url"
                    value={pdfUrl}
                    onChange={(e) => setPdfUrl(e.target.value)}
                    placeholder="https://example.com/drawing.pdf"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleUrlLoad}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Load PDF
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-red-600 mt-3">{error}</p>
            )}
          </div>

          {/* PDF Display */}
          {pdfUrl ? (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gray-100 p-4 border-b flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Document Preview</h3>
                  <p className="text-sm text-gray-600">{pdfFile?.name || 'External PDF'}</p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                  >
                    Open in New Tab
                  </a>
                  {pdfFile && (
                    <a
                      href={pdfUrl}
                      download={pdfFile.name}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
                    >
                      Download
                    </a>
                  )}
                </div>
              </div>
              
              {loading ? (
                <div className="h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                    <p className="mt-3 text-gray-600">Loading PDF...</p>
                  </div>
                </div>
              ) : (
                <iframe
                  src={pdfUrl}
                  className="w-full"
                  style={{ height: '600px', border: 'none' }}
                  title="PDF Viewer"
                  onError={() => setError('Failed to load PDF. Please check the URL.')}
                />
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold mb-4">How to Use</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">1️⃣</span>
                  <div>
                    <p className="font-medium">Upload PDF</p>
                    <p className="text-sm text-gray-600">Click the upload area and select your PDF file</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">2️⃣</span>
                  <div>
                    <p className="font-medium">Enter URL</p>
                    <p className="text-sm text-gray-600">Paste a direct link to a PDF file</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">3️⃣</span>
                  <div>
                    <p className="font-medium">View & Download</p>
                    <p className="text-sm text-gray-600">View in browser or download the file</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}