import { Page } from "../App";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import LogoSecond from "../images/LogoSecond.png";

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "home" as Page, label: "Ana Səhifə" },
    { id: "about" as Page, label: "Haqqımızda" },
    { id: "products" as Page, label: "Məhsullar" },
    { id: "production" as Page, label: "İstehsal" },
    { id: "contact" as Page, label: "Əlaqə" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="w-70 h-12 flex items-center justify-center">
            <img
              src={LogoSecond}
              alt="Bakı İnşaat Sənaye"
              className="w-700 h-16 object-contain"
            />
          </div>
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm tracking-wide transition-colors ${
                  currentPage === item.id
                    ? "text-blue-900"
                    : "text-gray-600 hover:text-blue-900"
                }`}
              >
                {item.label}
              </button>
            ))}
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
                    ? "text-blue-900 bg-blue-50"
                    : "text-gray-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
