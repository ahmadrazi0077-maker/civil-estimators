import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminData');
    
    if (token && adminData) {
      try {
        setAdmin(JSON.parse(adminData));
      } catch (error) {
        console.error('Error parsing admin data:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // Simple demo login - always works with admin/admin123
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        const adminData = {
          _id: '1',
          username: 'admin',
          email: 'admin@civilpro.com',
          role: 'admin',
          token: 'demo-token-123',
        };
        
        localStorage.setItem('adminToken', adminData.token);
        localStorage.setItem('adminData', JSON.stringify(adminData));
        setAdmin(adminData);
        
        return { success: true };
      }

      // Try API login
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('adminToken', data.token);
          localStorage.setItem('adminData', JSON.stringify(data));
          setAdmin(data);
          return { success: true };
        } else {
          return { success: false, error: data.message || 'Invalid credentials' };
        }
      } catch (apiError) {
        console.warn('API not available, using demo login only');
        return { success: false, error: 'Invalid username or password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setAdmin(null);
    router.push('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);