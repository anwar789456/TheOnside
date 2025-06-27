"use client"
import React, { useState, useEffect } from 'react';
import { validateEmail, validateName } from '@/utils/email';

function WaitList() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    provider: 'Not sure'
  });
  
  const [formErrors, setFormErrors] = useState({
    email: '',
    firstName: ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    error: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return '';
      case 'firstName':
        if (!value) return 'First name is required';
        if (!validateName(value)) return 'Please enter a valid name (letters, spaces, and hyphens only)';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate field on change
    setFormErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProviderChange = (provider) => {
    setFormData({
      ...formData,
      provider: provider
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const errors = {
      email: validateField('email', formData.email),
      firstName: validateField('firstName', formData.firstName)
    };

    setFormErrors(errors);

    // Check if there are any errors
    if (Object.values(errors).some(error => error)) {
      return;
    }

    setSubmitStatus({ loading: true, error: '' });

    try {
      // Send welcome email through API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          provider: formData.provider
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send welcome email');
      }
      setSubmitStatus({ loading: false, error: '' });
      setIsSubmitted(true);
    } catch (error) {
      setSubmitStatus({
        loading: false,
        error: 'Something went wrong. Please try again.'
      });
    }

  };

  if (isSubmitted) {
    return (
        
      <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900' : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'}`}>
        <div className={`backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center border ${isDarkMode ? 'bg-gray-800/80 border-gray-700/20 text-white' : 'bg-white/80 border-white/20'}`}>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>You're In! 🎉</h2>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Thanks for joining the AutoFollowUp waitlist. We'll notify you as soon as we launch!
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            Join Another Person
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900' : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'}`}>
      <div className={`mt-20 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-2xl w-full border ${isDarkMode ? 'bg-gray-800/80 border-gray-700/20' : 'bg-white/80 border-white/20'}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl">🚀</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Join the AutoFollowUp Waitlist
          </h1>
          <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Be the first to try AutoFollowUp — an AI tool that sends polite follow-up emails when your 
            message is ignored. No spam, no fluff — just real value.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email *
            </label>
            <div className="space-y-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl border focus:border-indigo-500 focus:ring-2 transition-all duration-200 outline-none ${isDarkMode ? 'border-gray-600 bg-gray-700/50 text-white focus:ring-indigo-900' : 'border-gray-200 bg-white/50 focus:ring-indigo-100'} ${formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                  placeholder="Enter your email"
                />
                {formErrors.email && (
                  <p className={`text-sm ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                    {formErrors.email}
                  </p>
                )}
              </div>
          </div>

          {/* First Name Input */}
          <div className="space-y-2">
            <label htmlFor="firstName" className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              First Name
            </label>
            <div className="space-y-1">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl border focus:border-indigo-500 focus:ring-2 transition-all duration-200 outline-none ${isDarkMode ? 'border-gray-600 bg-gray-700/50 text-white focus:ring-indigo-900' : 'border-gray-200 bg-white/50 focus:ring-indigo-100'} ${formErrors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                  placeholder="Your first name"
                />
                {formErrors.firstName && (
                  <p className={`text-sm ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                    {formErrors.firstName}
                  </p>
                )}
              </div>
          </div>

          {/* Email Provider Selection */}
          <div className="space-y-3">
            <label className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              What email provider do you use? *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Gmail', icon: '📧' },
                { name: 'Outlook', icon: '📮' },
                { name: 'Custom domain', icon: '🌐' },
                { name: 'Not sure', icon: '❓' }
              ].map((provider) => (
                <button
                  key={provider.name}
                  type="button"
                  onClick={() => handleProviderChange(provider.name)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center space-x-2 ${
                    formData.provider === provider.name
                      ? `border-indigo-500 ${isDarkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-50 text-indigo-700'}`
                      : `${isDarkMode ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50 text-gray-300' : 'border-gray-200 hover:border-gray-300 bg-white/50 text-gray-700'}`
                  }`}
                >
                  <span className="text-lg">{provider.icon}</span>
                  <span className="font-medium text-sm">{provider.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitStatus.loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            {submitStatus.error && (
              <p className={`text-sm ${isDarkMode ? 'text-red-400' : 'text-red-600'} text-center mb-4`}>
                {submitStatus.error}
              </p>
            )}
            {submitStatus.loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Joining...</span>
              </>
            ) : (
              <>
                <span>Join Waitlist</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            We respect your privacy. No spam, ever. 🔒
          </p>
        </div>
      </div>
    </div>
  );
}

export default WaitList;