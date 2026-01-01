import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StudentDashboard from './components/StudentDashboard';
import StudentSchedule from './components/StudentSchedule';
import StudentGrades from './components/StudentGrades';
import StudentNews from './components/StudentNews';
import StudentProfile from './components/StudentProfile';
import StudentTimetable from './components/StudentTimetable';
import StudentFinancials from './components/StudentFinancials';
import StudentRegistration from './components/StudentRegistration';
import StudentLibrary from './components/StudentLibrary';
import StudentSettings from './components/StudentSettings';
import StudentTranscripts from './components/StudentTranscripts';

// Lecturer Imports
import LecturerDashboard from './components/LecturerDashboard';
import LecturerStudents from './components/LecturerStudents';
import LecturerGrading from './components/LecturerGrading';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import { OfflineIndicator } from './components/OfflineIndicator';
import { Toaster } from 'sonner';

// Create a client with optimized defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
      gcTime: 10 * 60 * 1000, // Cache persists for 10 minutes
      refetchOnWindowFocus: true, // Refetch when user returns to tab
      refetchOnReconnect: true, // Refetch on internet reconnection
      retry: (failureCount, error: unknown) => {
        // Don't retry on 404s or auth errors
        const typedError = error as { status?: number };
        if (typedError?.status === 404 || typedError?.status === 401) return false;
        // Retry up to 2 times for other errors
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Only retry if we're online
      networkMode: 'online',
    },
    mutations: {
      retry: 1,
      networkMode: 'online',
    },
  },
});

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <div className="relative w-full min-h-screen bg-gray-50 font-[sans-serif]">
              {/* Offline indicator */}
              <OfflineIndicator />

              <Routes>
                <Route path="/" element={<LandingPage />} />

                {/* Student Routes - Protected */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/schedule"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentSchedule />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/grades"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentGrades />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/news"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentNews />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/timetable"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentTimetable />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/financials"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentFinancials />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/registration"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentRegistration />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/library"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentLibrary />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentSettings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/transcripts"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentTranscripts />
                    </ProtectedRoute>
                  }
                />

                {/* Lecturer Routes - Protected */}
                <Route
                  path="/lecturer/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['lecturer']}>
                      <LecturerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/lecturer/students"
                  element={
                    <ProtectedRoute allowedRoles={['lecturer']}>
                      <LecturerStudents />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/lecturer/grading"
                  element={
                    <ProtectedRoute allowedRoles={['lecturer']}>
                      <LecturerGrading />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </AuthProvider>
        </Router>

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0f1021',
              border: '1px solid #374151',
              color: '#fff',
            },
            className: 'custom-toast',
          }}
        />

        {/* DevTools only in development */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App;
