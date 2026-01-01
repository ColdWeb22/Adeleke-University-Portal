import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white border border-red-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle size={32} className="text-red-500" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Oops! Something went wrong
                </h1>

                <p className="text-gray-600 text-sm mb-6">
                    We encountered an unexpected error. Don't worry, your data is safe.
                </p>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
                    <p className="text-xs text-gray-500 mb-1">Error Details:</p>
                    <p className="text-sm text-red-600 font-mono break-all">
                        {error.message}
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={resetErrorBoundary}
                        className="flex-1 bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
                    >
                        <RefreshCw size={16} />
                        Try Again
                    </button>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="flex-1 bg-white border border-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                        Go Home
                    </button>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                    If this problem persists, please contact support
                </p>
            </div>
        </div>
    );
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
    return (
        <ReactErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error, errorInfo) => {
                // Log error to console in development
                console.error('Error caught by boundary:', error, errorInfo);

                // In production, you could send this to an error tracking service
                // like Sentry, LogRocket, etc.
            }}
            onReset={() => {
                // Reset any state that might have caused the error
                window.location.reload();
            }}
        >
            {children}
        </ReactErrorBoundary>
    );
}
