'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TaskDashboard } from '@/components/tasks/TaskDashboard';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (using localStorage for dev purposes)
    const isLoggedIn = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') === 'true' : false;

    if (!isLoggedIn) {
      // Redirect to login if not authenticated
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Mock user ID for development - in a real app, you'd use your own auth system
  const mockUserId = 'mock-user-id';

  return (
    <div className="container mx-auto px-4 py-8">
      <TaskDashboard userId={mockUserId} />
    </div>
  );
}