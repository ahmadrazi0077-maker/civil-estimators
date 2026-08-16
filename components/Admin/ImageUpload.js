import { useState, useRef, useCallback, useEffect } from 'react';
import { uploadToCloudinary, isCloudinaryConfigured } from '../../lib/cloudinary';
import ImageURLInput from './ImageURLInput';

export default function ImageUpload({ 
  onImageUpload, 
  currentImage = '', 
  folder = 'civil-services',
  aspectRatio = '16:9',
  maxSizeMB = 10,
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || '');
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'url'
  const fileInputRef = useRef(null);

  useEffect(() => {
    const configured = isCloudinaryConfigured();
    setIsConfigured(configured);
    if (!configured) {
      setWarning('Cloudinary not configured. Images will be saved locally.');
    }
  }, []);

  const handleFileUpload = async (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    setError('');

    try {
      const result = await uploadToCloudinary(file, folder);
      setPreview(result.url);
      onImageUpload(result.url, result.publicId);
      
      if (result.isLocal) {
        setWarning('Image saved locally (Cloudinary not configured)');
      }
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload image. Please try again.');
      setPreview(currentImage || '');
    } finally {
      setUploading(false);
    }
  };

  const handleUrlImageAdd = (url) => {
    setPreview(url);
    onImageUpload(url, '');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`Image size should be less than ${maxSizeMB}MB`);
        return;
      }
      handleFileUpload(file);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleRemoveImage = () => {
    setPreview('');
    onImageUpload('', '');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'upload'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          📤 Upload Image
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'url'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          🔗 Image URL
        </button>
      </div>

      {activeTab === 'upload' ? (
        <>
          {/* Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`relative border-2 border-dashed rounded-lg overflow-hidden transition-all ${
              preview ? 'border-blue-300' : 'border-gray-300 hover:border-blue-400'
            } ${uploading ? 'pointer-events-none' : 'cursor-pointer'}`}
            onClick={() => !uploading && fileInputRef.current?.click()}
          >
            {preview ? (
              <div className="relative" style={{ aspectRatio }}>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                {!uploading && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8" style={{ aspectRatio }}>
                <svg className="w-16 h-16 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-600 font-medium">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-400 mt-1">
                  JPEG, PNG, GIF, WebP, SVG (Max {maxSizeMB}MB)
                </p>
              </div>
            )}
            
            {uploading && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-3"></div>
                  <p className="font-medium">Uploading...</p>
                </div>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </>
      ) : (
        <ImageURLInput
          onImageUrlAdd={handleUrlImageAdd}
          currentImage={currentImage}
        />
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {warning && !error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">{warning}</p>
        </div>
      )}
    </div>
  );
}