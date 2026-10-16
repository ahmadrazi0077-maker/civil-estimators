import { useState } from 'react';

export default function ImageURLInput({ onImageUrlAdd, currentImage }) {
  const [imageUrl, setImageUrl] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(currentImage || '');

  const handleAddUrl = () => {
    setError('');
    
    // Validate URL
    if (!imageUrl.trim()) {
      setError('Please enter an image URL');
      return;
    }

    // Check if valid URL
    try {
      const url = new URL(imageUrl);
      if (!url.protocol.startsWith('http')) {
        setError('Please enter a valid image URL (http/https)');
        return;
      }
    } catch (err) {
      setError('Please enter a valid URL');
      return;
    }

    // Check if image URL
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const hasImageExtension = imageExtensions.some(ext => 
      imageUrl.toLowerCase().includes(ext)
    );

    if (!hasImageExtension && !imageUrl.includes('cloudinary.com')) {
      setError('URL should point to an image file (jpg, png, gif, webp, svg)');
      return;
    }

    setPreview(imageUrl);
    onImageUrlAdd(imageUrl);
    setImageUrl('');
    setShowInput(false);
  };

  const handleRemoveImage = () => {
    setPreview('');
    onImageUrlAdd('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Or Add Image by URL
        </label>
        <button
          type="button"
          onClick={() => setShowInput(!showInput)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          {showInput ? 'Cancel' : 'Add URL'}
        </button>
      </div>

      {showInput && (
        <div className="space-y-3">
          <div className="flex gap-3">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleAddUrl}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Paste direct image URL (jpg, png, gif, webp, svg)
          </p>
        </div>
      )}

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Image preview"
            className="w-full h-48 object-cover rounded-lg"
            onError={() => setError('Failed to load image from URL')}
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}