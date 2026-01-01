
interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
    return (
        <div
            className={`skeleton-shimmer animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded ${className}`}
        />
    );
}

// Dashboard Card Skeleton
export function DashboardCardSkeleton() {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <Skeleton className="w-16 h-6 rounded" />
            </div>
            <Skeleton className="w-24 h-8 mb-2 rounded" />
            <Skeleton className="w-32 h-4 rounded" />
        </div>
    );
}

// Table Row Skeleton
export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
    return (
        <tr className="border-b border-gray-200">
            {Array.from({ length: columns }).map((_, i) => (
                <td key={i} className="px-4 py-4">
                    <Skeleton className="w-full h-4 rounded" />
                </td>
            ))}
        </tr>
    );
}

// Course Card Skeleton
export function CourseCardSkeleton() {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
            <Skeleton className="w-20 h-6 mb-3 rounded" />
            <Skeleton className="w-full h-5 mb-2 rounded" />
            <Skeleton className="w-3/4 h-4 mb-4 rounded" />
            <div className="flex gap-2 mb-4">
                <Skeleton className="w-16 h-5 rounded-full" />
                <Skeleton className="w-20 h-5 rounded-full" />
            </div>
            <Skeleton className="w-full h-10 rounded-lg" />
        </div>
    );
}

// List Item Skeleton
export function ListItemSkeleton() {
    return (
        <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex-1">
                <Skeleton className="w-32 h-4 mb-2 rounded" />
                <Skeleton className="w-48 h-3 rounded" />
            </div>
            <Skeleton className="w-20 h-8 rounded" />
        </div>
    );
}

// Page Skeleton (Full page loading)
export function PageSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <Skeleton className="w-48 h-8 mb-6 rounded" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <DashboardCardSkeleton />
                <DashboardCardSkeleton />
                <DashboardCardSkeleton />
            </div>
            <Skeleton className="w-full h-96 rounded-xl" />
        </div>
    );
}

// Add shimmer animation to global CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  .skeleton-shimmer {
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
`;
document.head.appendChild(style);
