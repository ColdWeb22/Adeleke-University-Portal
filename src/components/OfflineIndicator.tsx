import { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        function handleOnline() {
            setIsOnline(true);
        }

        function handleOffline() {
            setIsOnline(false);
        }

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isOnline;
}

export function OfflineIndicator() {
    const isOnline = useOnlineStatus();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!isOnline) {
            setShow(true);
        } else {
            // Hide after a delay when coming back online
            const timer = setTimeout(() => setShow(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isOnline]);

    if (!show) return null;

    return (
        <div
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 transition-all ${isOnline
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                    : 'bg-orange-500/10 border border-orange-500/20 text-orange-400'
                }`}
        >
            {isOnline ? (
                <>
                    <Wifi size={20} />
                    <div>
                        <div className="font-semibold text-sm">Back Online</div>
                        <div className="text-xs opacity-80">Connection restored</div>
                    </div>
                </>
            ) : (
                <>
                    <WifiOff size={20} />
                    <div>
                        <div className="font-semibold text-sm">No Internet</div>
                        <div className="text-xs opacity-80">Some features may not work</div>
                    </div>
                </>
            )}
        </div>
    );
}
