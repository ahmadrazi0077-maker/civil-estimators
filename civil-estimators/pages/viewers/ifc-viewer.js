import { useState } from 'react';
import Layout from '../../components/Layout/Layout';

export default function IFCViewer() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [uploaded, setUploaded] = useState(false);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const extension = '.' + uploadedFile.name.split('.').pop().toLowerCase();
      
      if (extension === '.ifc') {
        setFile(uploadedFile);
        setError('');
        setUploaded(true);
      } else {
        setError('Please upload an IFC file');
        setUploaded(false);
      }
    }
  };

  const openInBIMViewer = () => {
    window.open('https://viewer.autodesk.com/', '_blank');
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">IFC Viewer</h1>
            <p className="text-gray-600">View 3D BIM models online</p>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="max-w-xl mx-auto">
              <label className="block text-sm font-medium mb-2">Upload IFC File</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                <input
                  type="file"
                  accept=".ifc"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="ifc-upload"
                />
                <label htmlFor="ifc-upload" className="cursor-pointer">
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <p className="text-gray-600 font-medium">Click to upload IFC file</p>
                  <p className="text-xs text-gray-400 mt-1">Max 100MB</p>
                </label>
              </div>

              {error && <p className="text-red-600 mt-3">{error}</p>}

              {uploaded && file && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-green-800 font-medium">✅ IFC file uploaded!</p>
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

          {/* Features */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-semibold mb-4">IFC Viewer Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-3">🔄</div>
                <h4 className="font-semibold mb-2">360° Rotation</h4>
                <p className="text-sm text-gray-600">Full 3D model rotation</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-3">🔍</div>
                <h4 className="font-semibold mb-2">Zoom & Pan</h4>
                <p className="text-sm text-gray-600">Detailed inspection</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-3">📏</div>
                <h4 className="font-semibold mb-2">Measurements</h4>
                <p className="text-sm text-gray-600">Distance and area</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-3">📋</div>
                <h4 className="font-semibold mb-2">Element Info</h4>
                <p className="text-sm text-gray-600">Properties and data</p>
              </div>
            </div>

            {/* Professional Viewer */}
            <div className="mt-8 p-6 bg-green-50 rounded-xl text-center">
              <h4 className="font-semibold mb-2">Professional BIM Viewer</h4>
              <p className="text-sm text-gray-600 mb-4">
                For full 3D rendering with sections, measurements, and element properties
              </p>
              <button
                onClick={openInBIMViewer}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Open BIM Viewer
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}