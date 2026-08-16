import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const router = useRouter();
  const { logout } = useAuth();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: '📊',
      href: '/admin/dashboard',
    },
    {
      title: 'Services',
      icon: '🛠️',
      href: '/admin/services',
    },
    {
      title: 'Projects',
      icon: '🏗️',
      href: '/admin/projects',
    },
    {
      title: 'Blog Posts',
      icon: '📝',
      href: '/admin/blog',
    },
    {
      title: 'Inquiries',
      icon: '📧',
      href: '/admin/inquiries',
    },
    {
  title: 'Subscribers',
  icon: '📧',
  href: '/admin/subscribers',
},
{
  title: 'Reviews',
  icon: '⭐',
  href: '/admin/reviews',
},
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      
      <nav className="flex-1 mt-4 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`flex items-center px-4 py-3 hover:bg-gray-800 transition-colors ${
              router.pathname.startsWith(item.href) ? 'bg-gray-800 border-l-4 border-blue-600' : ''
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}