import React from 'react';
import { LogoIcon, ShoppingCartIcon } from './icons';

type Page = 'home' | 'about' | 'contact' | 'checkout';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  basketCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, basketCount }) => {

  const NavLink: React.FC<{ page: Page, children: React.ReactNode }> = ({ page, children }) => (
    <button 
      onClick={() => onNavigate(page)}
      className="text-gray-600 hover:text-brand-primary font-medium transition-colors duration-200"
    >
      {children}
    </button>
  );

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2" aria-label="Go to homepage">
              <LogoIcon className="h-8 w-8 text-brand-primary" />
              <h1 className="text-2xl font-bold text-gray-800">StayFinder</h1>
            </button>
            <nav className="hidden md:flex items-center gap-6">
              <NavLink page="home">Home</NavLink>
              <NavLink page="about">About</NavLink>
              <NavLink page="contact">Contact Us</NavLink>
            </nav>
            <div className="flex items-center">
              <button onClick={() => onNavigate('checkout')} className="relative text-gray-600 hover:text-brand-primary transition-colors duration-200 p-2" aria-label={`View basket with ${basketCount} items`}>
                <ShoppingCartIcon className="h-7 w-7" />
                {basketCount > 0 && (
                  <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-brand-primary text-white text-xs flex items-center justify-center font-bold">
                    {basketCount}
                  </span>
                )}
              </button>
            </div>
          </div>
      </div>
    </header>
  );
};
