"use client"
import { React, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Mail, Menu, X } from 'lucide-react';
import './Navbar.css';
import Button from '../Button/Button';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Smooth scroll function
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    // Close mobile menu after clicking
    setIsMenuOpen(false);
  };

  // Animation variants for the mobile menu
  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  // Animation variants for individual menu items
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="navbar-container">
        <div className="flex space-x-2">
          <div className="logo">
            <Mail size={26} strokeWidth={2} />
          </div>
          <p className='mt-2 font-semibold'>AutoFollowUp</p>
        </div>
        
        {/* Desktop navigation - always visible on desktop */}
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="/" className="nav-link">Home</a>
          <a href="/waitlist" className="nav-link">Contact</a>
        </div>

        {/* Animated mobile menu overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="nav-links active animated-menu"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.a href="/" className="nav-link" variants={itemVariants}>
                Home
              </motion.a>
              <motion.a href="/waitlist" className="nav-link" variants={itemVariants}>
                Contact
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="nav-buttons">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun size={20} strokeWidth={2} /> : <Moon size={20} strokeWidth={2} />}
          </button>
          <Link href='/waitlist'>
            <Button children='join'/>
          </Link>
          <motion.button 
            className="menu-btn" 
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isMenuOpen ? <X size={24} strokeWidth={2} /> : <Menu strokeWidth={2} />}
            </motion.div>
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;