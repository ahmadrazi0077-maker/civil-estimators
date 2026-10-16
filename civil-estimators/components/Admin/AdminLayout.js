import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    
    if (!token && router.pathname !== '/admin/login') {
      console.log('No token, redirecting to login');
      router.push('/admin/login');
    }
  }, [router.pathname]);

  // Don't show admin layout for login page
  if (router.pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}