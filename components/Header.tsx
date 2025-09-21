import React, { useState } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { NAV_LINKS, COLORS, TYPOGRAPHY } from '../constants.ts';
import { FluksosLogoIcon, MenuIcon, XIcon } from './icons/MiscIcons.tsx';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkClasses = ({ isActive }: { isActive: boolean }): string =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive
        ? `bg-[${COLORS.accent}] text-[${COLORS.background}]`
        : `text-[${COLORS.textSecondary}] hover:text-[${COLORS.textPrimary}] hover:bg-[${COLORS.border}]`
    } transition-colors duration-150 ease-in-out`;

  return (
    <header className={`bg-[${COLORS.background}] shadow-md sticky top-0 z-50 border-b border-[${COLORS.border}]`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <FluksosLogoIcon className={`h-8 w-auto text-[${COLORS.accent}]`} />
            <span className={`font-['IBM_Plex_Mono'] text-2xl font-medium text-[${COLORS.textPrimary}]`}>Fluksos</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 items-center">
            {NAV_LINKS.map((link) => (
              <RouterNavLink
                key={link.name}
                to={link.path}
                className={navLinkClasses}
              >
                {link.name}
              </RouterNavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md text-[${COLORS.textSecondary}] hover:text-[${COLORS.textPrimary}] hover:bg-[${COLORS.border}] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[${COLORS.accent}]`}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XIcon className="block h-6 w-6" />
              ) : (
                <MenuIcon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[${COLORS.border}]" id="mobile-menu">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <RouterNavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({isActive}) => `${navLinkClasses({isActive})} block`}
              >
                {link.name}
              </RouterNavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;