// Cloudinary configuration with debug logging
const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '',
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '',
};

// Debug function to check configuration
export const debugCloudinaryConfig = () => {
  console.log('Cloudinary Configuration:');
  console.log('Cloud Name:', cloudinaryConfig.cloudName || 'NOT SET');
  console.log('Upload Preset:', cloudinaryConfig.uploadPreset || 'NOT SET');
  console.log('API Key:', cloudinaryConfig.apiKey ? 'SET' : 'NOT SET');
  return cloudinaryConfig;
};

// Check if Cloudinary is configured
export const isCloudinaryConfigured = () => {
  return Boolean(cloudinaryConfig.cloudName && cloudinaryConfig.uploadPreset);
};

// Function to convert file to base64 for local storage fallback
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Function to upload image to Cloudinary
export const uploadToCloudinary = async (file, folder = 'civil-services') => {
  console.log('Starting upload with config:', {
    cloudName: cloudinaryConfig.cloudName,
    uploadPreset: cloudinaryConfig.uploadPreset,
    hasApiKey: Boolean(cloudinaryConfig.apiKey),
  });

  // Check if Cloudinary is properly configured
  if (!cloudinaryConfig.cloudName || !cloudinaryConfig.uploadPreset) {
    console.warn('Cloudinary not configured. Using local storage fallback.');
    
    // Fallback: Store image as base64
    const base64Image = await fileToBase64(file);
    
    return {
      url: base64Image,
      publicId: `local-${Date.now()}-${file.name.replace(/\.[^/.]+$/, '')}`,
      format: file.type.split('/')[1],
      resourceType: 'image',
      createdAt: new Date().toISOString(),
      isLocal: true,
    };
  }

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);
    formData.append('folder', folder);
    
    // Add API key if available (for signed uploads)
    if (cloudinaryConfig.apiKey) {
      formData.append('api_key', cloudinaryConfig.apiKey);
    }

    console.log('Uploading to Cloudinary...');
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Cloudinary API Error:', data);
      throw new Error(data.error?.message || 'Upload failed');
    }

    console.log('Upload successful:', data);

    return {
      url: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format,
      resourceType: data.resource_type,
      createdAt: data.created_at,
      isLocal: false,
    };
  } catch (error) {
    console.error('Cloudinary upload error details:', error);
    
    // Fallback to local storage on error
    console.warn('Falling back to local storage due to error');
    const base64Image = await fileToBase64(file);
    
    return {
      url: base64Image,
      publicId: `local-${Date.now()}-${file.name.replace(/\.[^/.]+$/, '')}`,
      format: file.type.split('/')[1],
      resourceType: 'image',
      createdAt: new Date().toISOString(),
      isLocal: true,
    };
  }
};

// Rest of the functions remain same...
export const deleteFromCloudinary = async (publicId) => {
  if (publicId && publicId.startsWith('local-')) {
    console.log('Local image, no need to delete from Cloudinary');
    return { result: 'ok' };
  }

  try {
    const response = await fetch('/api/cloudinary/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId }),
    });

    if (!response.ok) {
      throw new Error('Delete failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
};

export const getOptimizedCloudinaryUrl = (url, options = {}) => {
  if (!url || url.startsWith('data:') || !url.includes('cloudinary.com')) {
    return url;
  }

  const transformations = [];
  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.quality) transformations.push(`q_${options.quality}`);
  if (options.format) transformations.push(`f_${options.format}`);
  
  if (transformations.length === 0) return url;

  const transformationString = transformations.join(',');
  return url.replace('/upload/', `/upload/${transformationString}/`);
};

export default cloudinaryConfig;