import { useState } from 'react';
import Layout from '../../components/Layout/Layout';

export default function DWGViewer() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [uploaded, setUploaded] = useState(false);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const extension = '.' + uploadedFile.name.split('.').pop().toLowerCase();
      const validExtensions = ['.dwg', '.dxf'];
      
      if (validExtensions.includes(extension)) {
        setFile(uploadedFile);
        setError('');
        setUploaded(true);
      } else {
        setError('Please upload a DWG or DXF file');
        setUploaded(false);
      }
    }
  };

  const openInAutodesk = () => {
    window.open('https://viewer.autodesk.com/', '_blank');
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">DWG/DXF Viewer</h1>
            <p className="text-gray-600">View AutoCAD files online</p>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="max-w-xl mx-auto">
              <label className="block text-sm font-medium mb-2">Upload DWG/DXF File</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  accept=".dwg,.dxf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="dwg-upload"
                />
                <label htmlFor="dwg-upload" className="cursor-pointer">
                  <svg className="w-16 h-16 text-blue-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-gray-600 font-medium">Click to upload file</p>
                  <p className="text-xs text-gray-400 mt-1">DWG or DXF, Max 25MB</p>
                </label>
              </div>

              {error && <p className="text-red-600 mt-3">{error}</p>}

              {uploaded && file && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-green-800 font-medium">✅ File uploaded successfully!</p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>File:</strong> {file.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Size:</strong> {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Viewer Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-semibold mb-4">DWG Viewer Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-3">🔍</div>
                <h4 className="font-semibold mb-2">Online Viewer</h4>
                <p className="text-sm text-gray-600 mb-4">View DWG files directly in browser</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                  Open Viewer
                </button>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-3">🔄</div>
                <h4 className="font-semibold mb-2">Convert to PDF</h4>
                <p className="text-sm text-gray-600 mb-4">Convert DWG to PDF format</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
                  Convert
                </button>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-3">📥</div>
                <h4 className="font-semibold mb-2">Download</h4>
                <p className="text-sm text-gray-600 mb-4">Download original file</p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
                  Download
                </button>
              </div>
            </div>

            {/* Autodesk Integration */}
            <div className="mt-8 p-6 bg-blue-50 rounded-xl text-center">
              <h4 className="font-semibold mb-2">Professional DWG Viewer</h4>
              <p className="text-sm text-gray-600 mb-4">
                For full-featured DWG viewing with measurements, layers, and markups, use Autodesk Viewer
              </p>
              <button
                onClick={openInAutodesk}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Open in Autodesk Viewer
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}