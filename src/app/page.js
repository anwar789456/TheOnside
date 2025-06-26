"use client";

import './globals.css';
import { useState, useEffect } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground/AnimatedBackground';
import Button from '@/components/Button/Button';
import { Mail, Zap, Clock } from 'lucide-react';
import GmailComponent from '@/components/gmail/GmailComponent';

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

  return (
    <div className="App">
      <AnimatedBackground />
      
      <main className="content">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-6xl font-bold mb-8 text-center">
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
          </h1>
          <p className={`text-2xl text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>AutoFollowUp monitors your inbox and sends AI-written follow-up <br/> emails — so you don't have to.</p>
          <div className='m-9 flex place-self-center'>
            <Button children='Join The Waitlist' />
            <p className={`mt-1.5 ml-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No credit card required</p>
          </div>

          <div className='place-self-center mt-40'>
            <div className='mb-4'>
              <h2 className='text-center text-4xl font-bold'>Email follow-ups, simplified</h2>
            </div>

            <div className='place-self-center text-center mb-14'>
              <p className={`text-xl mt-1.5 ml-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Stop losing deals and opportunities because you forgot to follow up. Let AI handle it <br/> for you.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card">
              <div className="background-gray-here place-self-center p-4 rounded-2xl text-[#0f948d]">
                <Mail size={34} strokeWidth={2} />
              </div>
              <h2 className="text-center text-xl font-semibold mt-7 mb-4">Connect Gmail in 2 clicks</h2>
              <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Seamless integration with your Gmail account. Setup takes less than 30 seconds.</p>
            </div>
            <div className="glass-card">
              <div className="background-gray-here place-self-center p-4 rounded-2xl text-[#2664eb]">
                <Zap size={34} strokeWidth={2} />
              </div>
              <h2 className="text-center text-xl font-semibold mt-7 mb-4">Follow-ups written by AI</h2>
              <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Smart, contextual follow-up messages that match your tone and style automatically.</p>
            </div>
            <div className="glass-card">
              <div className="background-gray-here place-self-center p-4 rounded-2xl text-[#4f46e5]">
                <Clock size={34} strokeWidth={2} />
              </div>
              <h2 className="text-center text-xl font-semibold mt-7 mb-4">Only triggers if no reply in 3–5 days</h2>
              <p className={`text-center mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Intelligent timing ensures you never seem pushy or send unnecessary emails.</p>
            </div>
          </div>
          <div className='mt-40'>
            <div>
              <h2 className='text-center text-4xl font-bold'>See AutoFollowUp in action</h2>
              <p className={`text-xl mt-5 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Here's how your AI assistant politely follows up on your behalf</p>
            </div>
          </div>

          <div className='mt-12'>
            <GmailComponent />
          </div>
        </div>

        <footer className="py-16 px-4 w-screen border-t-1 border-t-gray-300">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo and Brand */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 logo-css rounded-xl flex items-center justify-center">
                <div className="logo">
                  <Mail size={26} strokeWidth={2} />
                </div>
              </div>
              <h2 className="text-xl font-semibold ">AutoFollowUp</h2>
            </div>

            {/* Description */}
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-500'}  mb-8 max-w-md mx-auto leading-relaxed`}>
              Never miss a follow-up opportunity again. Let AI handle your 
              email follow-ups professionally and automatically.
            </p>

            {/* Navigation Links */}
            <div className="flex items-center justify-center gap-8 mb-12">
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
            </div>

            {/* Copyright */}
            <div className="text-gray-500 text-sm">
              © 2024 AutoFollowUp. All rights reserved. • Built with{' '}
              <span className="text-red-500">❤</span> for productivity
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}