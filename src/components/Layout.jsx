import React, { useState } from 'react';
import { 
  RefreshCw, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  Globe,
  Sun,
  Moon,
  Wallet
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  
  const currencies = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' }
  ];
  
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-slate-900' : 'bg-gray-50'}`}>
      <Sidebar />
      <div className="ml-20 lg:ml-64">
        <header className="bg-white dark:bg-slate-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="flex items-center bg-blue-600 dark:bg-blue-500 text-white p-2 rounded-lg mr-3">
                  <Wallet className="h-6 w-6" />
                </div>
                <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
                  Wealthi<span className="text-blue-600 dark:text-blue-400">Hq</span>
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-1.5 text-slate-500 dark:text-slate-400 
                    hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full
                    transition-colors duration-200"
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDark ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>

                {/* Currency Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
                    className="flex items-center px-3 py-1.5 text-sm font-medium rounded-md 
                      text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 
                      transition-colors duration-200"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    <span>{selectedCurrency.code}</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </button>
                  
                  {showCurrencyMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg 
                      border border-gray-200 dark:border-slate-700 py-1 z-50">
                      {currencies.map((currency) => (
                        <button
                          key={currency.code}
                          onClick={() => {
                            setSelectedCurrency(currency);
                            setShowCurrencyMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 
                            hover:bg-gray-100 dark:hover:bg-slate-700"
                        >
                          <span className="mr-2">{currency.symbol}</span>
                          {currency.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sync Button */}
                <button className="inline-flex items-center px-3 py-1.5 border border-blue-600 dark:border-blue-500 
                  text-sm font-medium rounded-md text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 
                  hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors duration-200">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync
                </button>

                {/* Notifications */}
                <button className="relative p-1.5 text-slate-500 dark:text-slate-400 
                  hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-3 p-1.5 rounded-full 
                      hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <img
                      src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg 
                      border border-gray-200 dark:border-slate-700 py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-slate-700">
                        <p className="text-sm font-medium text-slate-800 dark:text-white">John Doe</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">john@example.com</p>
                      </div>
                      
                      <button className="w-full flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 
                        hover:bg-gray-100 dark:hover:bg-slate-700">
                        <User className="h-4 w-4 mr-3" />
                        Profile
                      </button>
                      
                      <button className="w-full flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 
                        hover:bg-gray-100 dark:hover:bg-slate-700">
                        <Settings className="h-4 w-4 mr-3" />
                        Settings
                      </button>
                      
                      <div className="border-t border-gray-200 dark:border-slate-700 mt-1">
                        <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 
                          hover:bg-gray-100 dark:hover:bg-slate-700">
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;