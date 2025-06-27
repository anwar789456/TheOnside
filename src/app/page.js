"use client";

import './globals.css';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground/AnimatedBackground';
import Button from '@/components/Button/Button';
import { Mail, Zap, Clock } from 'lucide-react';
import GmailComponent from '@/components/gmail/GmailComponent';
import Link from 'next/link';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const fadeInDown = {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariant = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="App">
      <AnimatedBackground />
      
      <main className="content">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <motion.h1 
            className="text-6xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Never forget to{' '}
            <span 
              style={{
                background: 'linear-gradient(90deg, #0f948d, #1879ba, #2566e8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              follow up
            </span>{' '}
            again.
          </motion.h1>

          <motion.p 
            className={`text-2xl text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            AutoFollowUp monitors your inbox and sends AI-written follow-up <br/> emails — so you don't have to.
          </motion.p>

          <motion.div 
            className='m-9 flex place-self-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <Link href='/waitlist'>
              <Button children='Join The Waitlist' />
            </Link>
            <p className={`mt-1.5 ml-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No credit card required</p>
          </motion.div>

          {/* Features Section Header */}
          <motion.div 
            className='place-self-center mt-40'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className='mb-4'
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className='text-center text-4xl font-bold'>Email follow-ups, simplified</h2>
            </motion.div>

            <motion.div 
              className='place-self-center text-center mb-14'
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className={`text-xl mt-1.5 ml-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Stop losing deals and opportunities because you forgot to follow up. Let AI handle it <br/> for you.
              </p>
            </motion.div>
          </motion.div>
          
          {/* Feature Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div className="glass-card" variants={cardVariant}>
              <div className="background-gray-here place-self-center p-4 rounded-2xl text-[#0f948d]">
                <Mail size={34} strokeWidth={2} />
              </div>
              <h2 className="text-center text-xl font-semibold mt-7 mb-4">Connect Gmail in 2 clicks</h2>
              <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Seamless integration with your Gmail account. Setup takes less than 30 seconds.
              </p>
            </motion.div>

            <motion.div className="glass-card" variants={cardVariant}>
              <div className="background-gray-here place-self-center p-4 rounded-2xl text-[#2664eb]">
                <Zap size={34} strokeWidth={2} />
              </div>
              <h2 className="text-center text-xl font-semibold mt-7 mb-4">Follow-ups written by AI</h2>
              <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Smart, contextual follow-up messages that match your tone and style automatically.
              </p>
            </motion.div>

            <motion.div className="glass-card" variants={cardVariant}>
              <div className="background-gray-here place-self-center p-4 rounded-2xl text-[#4f46e5]">
                <Clock size={34} strokeWidth={2} />
              </div>
              <h2 className="text-center text-xl font-semibold mt-7 mb-4">Only triggers if no reply in 3–5 days</h2>
              <p className={`text-center mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Intelligent timing ensures you never seem pushy or send unnecessary emails.
              </p>
            </motion.div>
          </motion.div>

          {/* Demo Section */}
          <motion.div 
            className='mt-40'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className='text-center text-4xl font-bold'>See AutoFollowUp in action</h2>
              <p className={`text-xl mt-5 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Here's how your AI assistant politely follows up on your behalf
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            className='mt-12'
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GmailComponent />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer 
          className="py-16 px-4 w-screen border-t-1 border-t-gray-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo and Brand */}
            <motion.div 
              className="flex items-center justify-center gap-3 mb-6"
              variants={fadeInDown}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 logo-css rounded-xl flex items-center justify-center">
                <div className="logo">
                  <Mail size={26} strokeWidth={2} />
                </div>
              </div>
              <h2 className="text-xl font-semibold ">AutoFollowUp</h2>
            </motion.div>

            {/* Description */}
            <motion.p 
              className={`${isDarkMode ? 'text-gray-300' : 'text-gray-500'}  mb-8 max-w-md mx-auto leading-relaxed`}
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Never miss a follow-up opportunity again. Let AI handle your 
              email follow-ups professionally and automatically.
            </motion.p>

            {/* Navigation Links */}
            <motion.div 
              className="flex items-center justify-center gap-8 mb-12"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <a 
                href="/privacy" 
                className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} hover:text-gray-900 transition-colors duration-200`}
              >
                Privacy
              </a>
              <a 
                href="/terms" 
                className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} hover:text-gray-900 transition-colors duration-200`}
              >
                Terms
              </a>
            </motion.div>

            {/* Copyright */}
            <motion.div 
              className="text-gray-500 text-sm"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              © 2024 AutoFollowUp. All rights reserved. • Built with{' '}
              <span className="text-red-500">❤</span> for productivity
            </motion.div>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}