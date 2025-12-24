import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Header from './header.jsx';
import Sidebar from './Sidebar';

export default function MainLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
