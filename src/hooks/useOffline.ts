import { useState, useEffect } from 'react';

export interface OfflineState {
  isOffline: boolean;
  isOnline: boolean;
  hasBeenOffline: boolean;
  connectionType: 'online' | 'offline' | 'slow';
}

export const useOffline = () => {
  const [offlineState, setOfflineState] = useState<OfflineState>({
    isOffline: !navigator.onLine,
    isOnline: navigator.onLine,
    hasBeenOffline: false,
    connectionType: navigator.onLine ? 'online' : 'offline'
  });

  useEffect(() => {
    const handleOnline = () => {
      setOfflineState(prev => ({
        ...prev,
        isOffline: false,
        isOnline: true,
        connectionType: 'online'
      }));
    };

    const handleOffline = () => {
      setOfflineState(prev => ({
        ...prev,
        isOffline: true,
        isOnline: false,
        hasBeenOffline: true,
        connectionType: 'offline'
      }));
    };

    // Test for slow connection (optional enhancement)
    const testConnectionSpeed = async () => {
      if (!navigator.onLine) return;
      
      try {
        const startTime = Date.now();
        const response = await fetch('https://httpbin.org/json', { 
          method: 'HEAD',
          cache: 'no-cache'
        });
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        if (response.ok && duration > 3000) {
          setOfflineState(prev => ({
            ...prev,
            connectionType: 'slow'
          }));
        }
      } catch (error) {
        // If fetch fails, we're probably offline
        handleOffline();
      }
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Test connection speed on mount (optional)
    testConnectionSpeed();

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return offlineState;
};

// Utility functions for offline-aware operations
export const offlineUtils = {
  // Check if we can perform online-only operations
  canPerformOnlineOperation: (isOffline: boolean, showWarning = true) => {
    if (isOffline && showWarning) {
      console.warn('Operation requires internet connection');
    }
    return !isOffline;
  },

  // Get appropriate message for offline state
  getOfflineMessage: (context: 'recipes' | 'images' | 'general' = 'general') => {
    const messages = {
      recipes: 'You\'re offline - using saved recipes',
      images: 'Some images may not load while offline',
      general: 'You\'re currently offline'
    };
    return messages[context];
  },

  // Determine if we should show offline indicator
  shouldShowOfflineIndicator: (isOffline: boolean, hasBeenOffline: boolean) => {
    return isOffline || hasBeenOffline;
  }
};