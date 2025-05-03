import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Diamond, 
  Wallet, 
  Target, 
  Users, 
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuOptions = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/assets",
      name: "Assets",
      icon: Diamond,
    },
    {
      path: "/liabilities",
      name: "Liabilities",
      icon: Wallet,
    },
    {
      path: "/goals",
      name: "Goals",
      icon: Target,
    },
    {
      path: "/rules",
      name: "Global Rules",
      icon: Settings,
    },
    {
      path: "/beneficiary",
      name: "Beneficiary",
      icon: Users,
    },
    {
      path: "/transfer",
      name: "Transfer Assets",
      icon: ArrowLeftRight,
    },
  ];

  return (
    <div 
      className={`fixed left-0 top-0 h-screen bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 
        transition-all duration-300 z-20 ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-slate-700">
        <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : ''}`}>
          <div className="flex items-center bg-blue-600 dark:bg-blue-500 text-white p-2 rounded-lg">
            <Wallet className="h-6 w-6" />
          </div>
          {!isCollapsed && (
            <span className="ml-3 font-semibold text-slate-800 dark:text-white">
              Wealthi<span className="text-blue-600 dark:text-blue-400">Hq</span>
            </span>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400
            ${isCollapsed ? 'absolute right-0 translate-x-full bg-white dark:bg-slate-800 shadow-md border border-gray-200 dark:border-slate-700' : ''}`}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      <nav className="p-4">
        <ul className="space-y-1">
          {menuOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <li key={index}>
                <NavLink
                  to={option.path}
                  className={({ isActive }) => `
                    flex items-center px-3 py-2 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                  {!isCollapsed && (
                    <span className="font-medium">{option.name}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;