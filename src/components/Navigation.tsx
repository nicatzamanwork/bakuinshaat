import { Page } from '../App';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home' as Page, label: 'Ana Səhifə' },
    { id: 'about' as Page, label: 'Haqqımızda' },
    { id: 'products' as Page, label: 'Məhsullar' },
    { id: 'production' as Page, label: 'İstehsal' },
    { id: 'contact' as Page, label: 'Əlaqə' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
              <div className="text-white">BİS</div>
            </div>
            <div>
              <div className="text-gray-900">Bakı </div>
              <div className="text-xs text-gray-500">İnşaat Sənaye ASC</div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm tracking-wide transition-colors ${
                  currentPage === item.id
                    ? 'text-blue-900'
                    : 'text-gray-600 hover:text-blue-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => onNavigate('admin')}
              className="text-sm text-gray-400 hover:text-blue-900 transition-colors"
            >
              Admin
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-3 px-4 text-sm ${
                  currentPage === item.id
                    ? 'text-blue-900 bg-blue-50'
                    : 'text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-3 px-4 text-sm text-gray-400"
            >
              Admin
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
