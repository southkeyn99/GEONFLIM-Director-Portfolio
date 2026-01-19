
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DIRECTOR_INFO } from '../data';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Directing', path: '/directing' },
    { name: 'AI Film', path: '/aifilm' },
    { name: 'Cinematography', path: '/cinematography' },
    { name: 'Commercial', path: '/commercial' },
    { name: 'AD & Producing', path: '/producing' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-serif font-bold tracking-widest text-white uppercase">
              {DIRECTOR_INFO.nameEn}<span className="text-yellow-500">.</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[10px] uppercase tracking-[0.3em] transition-all duration-300 ${
                  isActive(link.path) ? 'text-yellow-500 font-bold' : 'text-neutral-500 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-neutral-400">
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black border-b border-white/5 py-4 flex flex-col items-center space-y-4 animate-fade-in-down">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-[10px] uppercase tracking-widest ${isActive(link.path) ? 'text-yellow-500' : 'text-neutral-500'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
