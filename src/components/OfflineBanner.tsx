import React from 'react';
import { Wifi, WifiOff, Loader } from 'lucide-react';
import { useOffline, offlineUtils } from '../hooks/useOffline';

interface OfflineBannerProps {
  className?: string;
  showWhenOnline?: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ 
  className = '', 
  showWhenOnline = false 
}) => {
  const { isOffline, isOnline, connectionType, hasBeenOffline } = useOffline();

  // Don't show if online and user hasn't been offline (unless explicitly requested)
  if (isOnline && !hasBeenOffline && !showWhenOnline) {
    return null;
  }

  const getBannerStyle = () => {
    if (isOffline) {
      return 'bg-orange-100 border-orange-200 text-orange-800';
    }
    if (connectionType === 'slow') {
      return 'bg-yellow-100 border-yellow-200 text-yellow-800';
    }
    // Back online
    return 'bg-green-100 border-green-200 text-green-800';
  };

  const getIcon = () => {
    if (isOffline) {
      return <WifiOff className="w-4 h-4" />;
    }
    if (connectionType === 'slow') {
      return <Loader className="w-4 h-4 animate-spin" />;
    }
    return <Wifi className="w-4 h-4" />;
  };

  const getMessage = () => {
    if (isOffline) {
      return '📱 You\'re offline - using saved recipes';
    }
    if (connectionType === 'slow') {
      return '🐌 Slow connection detected - offline mode recommended';
    }
    return '✅ Back online - all features available';
  };

  const getSubMessage = () => {
    if (isOffline) {
      return 'All your saved recipes are available. New uploads require internet.';
    }
    if (connectionType === 'slow') {
      return 'Images may load slowly. Consider offline mode for better experience.';
    }
    return hasBeenOffline ? 'Connection restored. You can now upload new recipes.' : null;
  };

  return (
    <div className={`border rounded-lg p-3 ${getBannerStyle()} ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">
              {getMessage()}
            </p>
          </div>
          
          {getSubMessage() && (
            <p className="text-xs mt-1 opacity-75">
              {getSubMessage()}
            </p>
          )}
        </div>
        
        {/* Optional action buttons */}
        {isOffline && (
          <button
            onClick={() => window.location.reload()}
            className="text-xs underline opacity-75 hover:opacity-100"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

// Compact version for header/nav
export const OfflineIndicator: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isOffline, connectionType } = useOffline();

  if (!isOffline && connectionType !== 'slow') {
    return null;
  }

  return (
    <div className={`flex items-center gap-1 text-xs ${className}`}>
      {isOffline ? (
        <>
          <WifiOff className="w-3 h-3 text-orange-500" />
          <span className="text-orange-600">Offline</span>
        </>
      ) : (
        <>
          <Loader className="w-3 h-3 text-yellow-500 animate-spin" />
          <span className="text-yellow-600">Slow</span>
        </>
      )}
    </div>
  );
};

// Toast-style notification for connection changes
export const ConnectionToast: React.FC = () => {
  const { isOffline, hasBeenOffline } = useOffline();
  const [showToast, setShowToast] = React.useState(false);
  const [lastOfflineState, setLastOfflineState] = React.useState(isOffline);

  React.useEffect(() => {
    // Show toast when connection state changes
    if (lastOfflineState !== isOffline && hasBeenOffline) {
      setShowToast(true);
      setLastOfflineState(isOffline);
      
      // Auto-hide after 3 seconds
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOffline, lastOfflineState, hasBeenOffline]);

  if (!showToast) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
      <div className={`rounded-lg p-3 shadow-lg border ${
        isOffline 
          ? 'bg-orange-100 border-orange-200 text-orange-800' 
          : 'bg-green-100 border-green-200 text-green-800'
      }`}>
        <div className="flex items-center gap-2">
          {isOffline ? (
            <WifiOff className="w-4 h-4" />
          ) : (
            <Wifi className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">
            {isOffline ? 'Gone offline' : 'Back online'}
          </span>
          <button 
            onClick={() => setShowToast(false)}
            className="ml-2 text-xs opacity-60 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};