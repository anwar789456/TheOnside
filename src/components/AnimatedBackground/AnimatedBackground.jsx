"use client";

import React, { useEffect, useState } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [emailIcons, setEmailIcons] = useState([]);

  // Check for dark mode on component mount and when body class changes
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    };

    // Initial check
    checkDarkMode();

    // Create an observer to watch for class changes on the body
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, []);

  // Generate floating email icons
  useEffect(() => {
    const generateEmailIcons = () => {
      const newIcons = [];
      const iconCount = 15; // Number of email icons

      for (let i = 0; i < iconCount; i++) {
        newIcons.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: `${Math.random() * 0.5 + 0.5}`, // Scale between 0.5 and 1
          delay: `${Math.random() * 20}s`, // Random delay for animation
          duration: `${Math.random() * 10 + 15}s`, // Random duration between 15-25s
        });
      }

      setEmailIcons(newIcons);
    };

    generateEmailIcons();
    
    // Regenerate icons periodically for variety
    const interval = setInterval(generateEmailIcons, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`animated-background ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Floating email icons */}
      {emailIcons.map((icon) => (
        <div
          key={icon.id}
          className={`email-icon ${isDarkMode ? 'dark' : 'light'}`}
          style={{
            left: icon.left,
            top: icon.top,
            transform: `scale(${icon.size})`,
            animationDelay: icon.delay,
            animationDuration: icon.duration,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;