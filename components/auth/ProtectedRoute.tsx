'use client';

import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // For development, just render the children
  // In a real app, you would implement your own auth protection
  return <>{children}</>;
}