export const getOptimizedImageUrl = (url: string, options: { width?: number; quality?: number; format?: string } = {}) => {
  if (!url) return '';
  
  // Return the original URL during local development since local dev server does not have the Cloudflare image worker
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return url;
  }
  
  try {
    const urlObj = new URL(url);
    // If it is our domain (zeusbautista.site), route it through Cloudflare Dynamic Image Resizer
    if (urlObj.hostname === 'zeusbautista.site') {
      const width = options.width || 800;
      const quality = options.quality || 80;
      const format = options.format || 'auto';
      return `/cdn-cgi/image/width=${width},quality=${quality},format=${format}${urlObj.pathname}`;
    }
  } catch (e) {
    // If relative path
    if (url.startsWith('/')) {
      const width = options.width || 800;
      const quality = options.quality || 80;
      const format = options.format || 'auto';
      return `/cdn-cgi/image/width=${width},quality=${quality},format=${format}${url}`;
    }
  }
  
  return url;
};
