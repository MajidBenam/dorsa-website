'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  FaUserMd, 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaUser, 
  FaBriefcase, 
  FaFlask, 
  FaFileAlt, 
  FaEnvelope 
} from 'react-icons/fa';

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: FaHome },
    { href: '/#about', label: 'About', icon: FaUser },
    { href: '/experience', label: 'Experience', icon: FaBriefcase },
    { href: '/research', label: 'Research', icon: FaFlask },
    { href: '/cv', label: 'CV', icon: FaFileAlt },
    { href: '/contact', label: 'Contact', icon: FaEnvelope },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-all transform group-hover:scale-105 ring-2 ring-primary-100">
              <Image
                src="/images/dorsa_avatar.png"
                alt="Dr. Dorsa Ghasemi"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gradient-primary leading-tight">
                Dr. Dorsa Ghasemi
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Passionate Pathologist and Researcher
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all relative group rounded-lg ${
                    isActive
                      ? 'text-primary-600 bg-gray-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="text-base" />
                  <span>{link.label}</span>
                  <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-primary rounded-full transition-all duration-300 ${
                    isActive ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                  }`}></span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-primary-600 bg-gray-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="text-lg" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
