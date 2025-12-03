
import Link from 'next/link';
import { useAuth } from '@/auth/AuthProvider';
import ProtectedLink from '@/auth/ProtectedLink';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const logoUrl = "";
  const appName = "newapp";

  return (
    <header className="bg-white shadow-sm">
      <nav className="px-4 sm:px-6 lg:px-8">
        <div className="w-full py-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-gray-900">
              {logoUrl ? (
                <img src={logoUrl} alt={`${appName} logo`} className="h-8 w-auto" />
              ) : (
                <span>{appName}</span>
              )}
            </Link>
            <div className="space-x-4">
              
              
            </div>
          </div>
          <div className="space-x-4 flex items-center">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600 hidden sm:inline">Welcome, {user.name || user.email}</span>
                
                
                <button onClick={logout} className="text-sm font-medium text-gray-700 hover:text-indigo-600">Logout</button>
              </>
            ) : (
              <>
                
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
    