// File: clinic-frontend/src/pages/UnauthorizedPage.tsx
import React from 'react';
import type { NavigateFunction } from '../App';

type UnauthorizedPageProps = {
  onNavigate: NavigateFunction;
};

function UnauthorizedPage({ onNavigate }: UnauthorizedPageProps) {
  return (
    <div className="max-w-4xl mx-auto text-center py-20 px-4">
      <h1 className="text-5xl font-extrabold text-red-500">Access Denied</h1>
      <p className="mt-4 text-lg text-dark-subtle">You do not have permission to view this page.</p>
      <button
        onClick={() => onNavigate('home')}
        className="mt-8 bg-brand-blue text-white font-bold py-3 px-8 rounded-lg hover:bg-sky-600"
      >
        Return to Homepage
      </button>
    </div>
  );
}
export default UnauthorizedPage;
