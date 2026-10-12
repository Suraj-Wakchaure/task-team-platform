import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 text-amber-600">
    <div className="w-8 h-8 border-3 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
  </div>
);

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 p-4">
    <h1 className="text-6xl font-bold text-amber-600 mb-2">404</h1>
    <p className="text-lg text-slate-500 mb-6">Page Not Found</p>
    <a
      href="/dashboard"
      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition"
    >
      Return Home
    </a>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
