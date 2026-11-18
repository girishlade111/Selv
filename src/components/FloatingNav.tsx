import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, Briefcase, FileText, User, Send } from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Projects', path: '/projects', icon: Briefcase },
  { name: 'Blog', path: '/blog', icon: FileText },
  { name: 'About', path: '/about', icon: User },
  { name: 'Contact', path: '/contact', icon: Send },
];

export const FloatingNav: React.FC = () => {
  const location = useLocation();

  // Helper to determine active state for nested routes
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Floating Navigation Rail (Right Edge) */}
      <nav
        aria-label="Desktop primary navigation"
        className="hidden md:flex fixed right-6 lg:right-8 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-1.5 p-2 rounded-full glass-panel backdrop-blur-2xl bg-black/65 border border-white/10 shadow-2xl"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative w-10 h-10 rounded-full flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group"
              aria-label={item.name}
              title={item.name}
            >
              {active && (
                <motion.div
                  layoutId="active-nav-pill-desktop"
                  className="absolute inset-0 bg-white rounded-full shadow-md"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <Icon
                className={`w-4 h-4 z-10 transition-colors duration-200 ${
                  active ? 'text-black' : 'text-white/60 group-hover:text-white'
                }`}
              />
              <span className="sr-only">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Mobile Floating Navigation Bar (Bottom Center) */}
      <nav
        aria-label="Mobile primary navigation"
        className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2 rounded-full glass-panel backdrop-blur-2xl bg-black/80 border border-white/10 shadow-2xl safe-bottom"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative w-9 h-9 rounded-full flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group"
              aria-label={item.name}
            >
              {active && (
                <motion.div
                  layoutId="active-nav-pill-mobile"
                  className="absolute inset-0 bg-white rounded-full shadow-md"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <Icon
                className={`w-4 h-4 z-10 transition-colors duration-200 ${
                  active ? 'text-black' : 'text-white/60 group-hover:text-white'
                }`}
              />
              <span className="sr-only">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};
