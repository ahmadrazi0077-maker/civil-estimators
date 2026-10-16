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
      setTimeout(() => setLoading(false), 1000);
    } else {
      setError('Please upload a PDF file');
    }
  };

 const samplePDFs = [
  { 
    name: 'Sample PDF 1', 
    url: 'https://www.africau.edu/images/default/sample.pdf',
    description: 'Sample document for testing'
  },
  { 
    name: 'Sample PDF 2', 
    url: 'https://www.orimi.com/pdf-test.pdf',
    description: 'Another sample document'
  },
  { 
    name: 'Sample PDF 3', 
    url: 'https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf',
    description: 'Test PDF document'
  },
];

  return (
    <Layout>
      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">PDF Drawing Viewer</h1>
            <p className="text-gray-600">View and analyze PDF drawings online</p>
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
                    onClick={() => pdfUrl && setError('')}
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
                <a
                  href={pdfUrl}
                  target="_blank"
                  download
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                >
                  Download
                </a>
              </div>
              <iframe
                src={pdfUrl}
                className="w-full"
                style={{ height: '600px', border: 'none' }}
                title="PDF Viewer"
              />
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold mb-4">Sample Drawings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {samplePDFs.map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => setPdfUrl(sample.url)}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-lg transition-all"
                  >
                    <svg className="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <p className="font-medium text-sm">{sample.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{sample.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}