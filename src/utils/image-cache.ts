// Simple image caching utility for offline recipe viewing

const IMAGE_CACHE_KEY = 'budget-bites-image-cache';
const IMAGE_CACHE_VERSION = 'v1';
const MAX_CACHE_SIZE = 10 * 1024 * 1024; // 10MB limit
const CACHE_EXPIRY_DAYS = 7;

interface CachedImage {
  url: string;
  dataUrl: string;
  timestamp: number;
  size: number;
}

interface ImageCache {
  version: string;
  images: Record<string, CachedImage>;
  totalSize: number;
  lastCleanup: number;
}

export class ImageCacheManager {
  private static cache: ImageCache | null = null;

  private static getCache(): ImageCache {
    if (this.cache) return this.cache;

    try {
      const stored = localStorage.getItem(IMAGE_CACHE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.version === IMAGE_CACHE_VERSION) {
          this.cache = parsed;
          return this.cache!;
        }
      }
    } catch (error) {
      console.warn('Failed to load image cache:', error);
    }

    // Initialize new cache
    this.cache = {
      version: IMAGE_CACHE_VERSION,
      images: {},
      totalSize: 0,
      lastCleanup: Date.now()
    };
    
    return this.cache;
  }

  private static saveCache(): void {
    if (!this.cache) return;
    
    try {
      localStorage.setItem(IMAGE_CACHE_KEY, JSON.stringify(this.cache));
    } catch (error) {
      console.warn('Failed to save image cache:', error);
      // If storage is full, try cleaning up old images
      this.cleanupExpiredImages();
      try {
        localStorage.setItem(IMAGE_CACHE_KEY, JSON.stringify(this.cache));
      } catch (retryError) {
        console.error('Failed to save image cache after cleanup:', retryError);
      }
    }
  }

  // Cache an image by URL
  static async cacheImage(url: string): Promise<string | null> {
    if (!url || this.isImageCached(url)) {
      return this.getCachedImage(url);
    }

    try {
      // Fetch image as blob
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch image');
      
      const blob = await response.blob();
      
      // Convert to data URL
      const dataUrl = await this.blobToDataUrl(blob);
      const size = blob.size;

      // Check if we have space
      const cache = this.getCache();
      if (cache.totalSize + size > MAX_CACHE_SIZE) {
        this.makeSpace(size);
      }

      // Store in cache
      const cachedImage: CachedImage = {
        url,
        dataUrl,
        timestamp: Date.now(),
        size
      };

      cache.images[url] = cachedImage;
      cache.totalSize += size;
      this.saveCache();

      return dataUrl;
    } catch (error) {
      console.warn('Failed to cache image:', url, error);
      return null;
    }
  }

  // Get cached image or return original URL
  static getCachedImage(url: string): string | null {
    const cache = this.getCache();
    const cached = cache.images[url];
    
    if (!cached) return null;
    
    // Check if expired
    const isExpired = Date.now() - cached.timestamp > (CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    if (isExpired) {
      this.removeCachedImage(url);
      return null;
    }
    
    return cached.dataUrl;
  }

  // Check if image is cached
  static isImageCached(url: string): boolean {
    return this.getCachedImage(url) !== null;
  }

  // Remove specific image from cache
  static removeCachedImage(url: string): void {
    const cache = this.getCache();
    const cached = cache.images[url];
    
    if (cached) {
      cache.totalSize -= cached.size;
      delete cache.images[url];
      this.saveCache();
    }
  }

  // Cache multiple recipe images
  static async cacheRecipeImages(recipeImageUrls: string[]): Promise<{cached: number, failed: number}> {
    let cached = 0;
    let failed = 0;

    for (const url of recipeImageUrls) {
      if (url) {
        const result = await this.cacheImage(url);
        if (result) {
          cached++;
        } else {
          failed++;
        }
      }
    }

    return { cached, failed };
  }

  // Get cache statistics
  static getCacheStats(): {
    totalImages: number;
    totalSize: number;
    maxSize: number;
    utilizationPercent: number;
  } {
    const cache = this.getCache();
    return {
      totalImages: Object.keys(cache.images).length,
      totalSize: cache.totalSize,
      maxSize: MAX_CACHE_SIZE,
      utilizationPercent: Math.round((cache.totalSize / MAX_CACHE_SIZE) * 100)
    };
  }

  // Clear all cached images
  static clearCache(): void {
    this.cache = {
      version: IMAGE_CACHE_VERSION,
      images: {},
      totalSize: 0,
      lastCleanup: Date.now()
    };
    this.saveCache();
  }

  // Private utility methods
  private static blobToDataUrl(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private static makeSpace(neededSize: number): void {
    const cache = this.getCache();
    
    // Remove expired images first
    this.cleanupExpiredImages();
    
    // If still need space, remove oldest images
    if (cache.totalSize + neededSize > MAX_CACHE_SIZE) {
      const sortedImages = Object.entries(cache.images)
        .sort(([, a], [, b]) => a.timestamp - b.timestamp);
      
      for (const [url] of sortedImages) {
        this.removeCachedImage(url);
        if (cache.totalSize + neededSize <= MAX_CACHE_SIZE) {
          break;
        }
      }
    }
  }

  private static cleanupExpiredImages(): void {
    const cache = this.getCache();
    const now = Date.now();
    const expiryTime = CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    
    Object.entries(cache.images).forEach(([url, cached]) => {
      if (now - cached.timestamp > expiryTime) {
        this.removeCachedImage(url);
      }
    });
    
    cache.lastCleanup = now;
    this.saveCache();
  }
}

// React hook for using cached images
import { useState, useEffect } from 'react';

export const useCachedImage = (originalUrl: string, shouldCache = true) => {
  const [imageUrl, setImageUrl] = useState<string>(originalUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isCached, setIsCached] = useState(false);

  useEffect(() => {
    if (!originalUrl || !shouldCache) {
      setImageUrl(originalUrl);
      return;
    }

    // Check if already cached
    const cached = ImageCacheManager.getCachedImage(originalUrl);
    if (cached) {
      setImageUrl(cached);
      setIsCached(true);
      return;
    }

    // If not cached, use original URL but try to cache in background
    setImageUrl(originalUrl);
    setIsLoading(true);
    
    ImageCacheManager.cacheImage(originalUrl)
      .then(cachedUrl => {
        if (cachedUrl) {
          setImageUrl(cachedUrl);
          setIsCached(true);
        }
      })
      .finally(() => setIsLoading(false));
  }, [originalUrl, shouldCache]);

  return {
    imageUrl,
    isLoading,
    isCached,
    originalUrl
  };
};