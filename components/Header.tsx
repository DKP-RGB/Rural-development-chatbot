import React from 'react';
import { NAV_LINKS } from '../constants';
import { US_FLAG_B64, USDA_LOGO_B64 } from './assets';

const GovBanner: React.FC = () => (
  <div className="bg-[#f0f0f0] p-2 text-xs text-gray-700">
    <div className="container mx-auto flex items-center">
      <img src={US_FLAG_B64} alt="U.S. flag" className="h-4 mr-2" />
      <span>An official website of the United States government</span>
    </div>
  </div>
);

const Header: React.FC = () => {
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
      <GovBanner />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <a href="#" className="flex items-center">
            <img src={USDA_LOGO_B64} alt="USDA RD Logo" className="h-16 mr-4"/>
            <div>
              <h1 className="text-xl font-bold text-usda-blue font-serif">Rural Development</h1>
              <p className="text-sm text-gray-600 hidden sm:block">Committed to the future of rural communities.</p>
            </div>
          </a>
          <button className="lg:hidden p-2" aria-label="Open menu">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-usda-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
       <nav className="hidden lg:block bg-usda-blue text-white">
          <div className="container mx-auto">
            <ul className="flex">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="block px-4 py-3 font-bold hover:bg-white hover:text-usda-blue transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
    </header>
  );
};

export default Header;