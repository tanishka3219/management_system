import { useState, useEffect, useContext } from 'react';
import Sidebar from './Sidebar';
import { Moon, Sun, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-dark-950 transition-colors">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <header className="h-16 border-b border-slate-100 dark:border-dark-800 bg-white/80 dark:bg-dark-900/60 backdrop-blur-md flex items-center justify-end px-6 space-x-4 shrink-0 transition-colors">
          <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Welcome, <span className="font-bold text-primary-600 dark:text-primary-400">{user?.username}</span> ({user?.role})
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-2 text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={logout}
            className="flex items-center space-x-1 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </header>
        <main className="p-6 md:p-8 flex-1 text-slate-900 dark:text-slate-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
