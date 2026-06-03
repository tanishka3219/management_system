import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Users, ShoppingCart } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Customers', path: '/customers', icon: Users },
    { name: 'Orders', path: '/orders', icon: ShoppingCart },
  ];

  return (
    <div className="w-64 bg-white dark:bg-dark-900 border-r border-slate-100 dark:border-dark-800/80 h-full flex flex-col hidden md:flex transition-colors">
      <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-dark-800/80 shrink-0">
        <h1 className="text-xl font-extrabold bg-gradient-to-r from-primary-500 to-indigo-600 bg-clip-text text-transparent">InventorySystem</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-primary-500 to-indigo-600 text-white shadow-md shadow-primary-500/10 dark:shadow-primary-500/5 font-semibold' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-dark-800/60 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
