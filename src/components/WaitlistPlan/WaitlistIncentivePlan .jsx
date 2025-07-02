import { motion } from 'framer-motion';
import { Award, Gift, Percent } from 'lucide-react';
import { useState, useEffect } from 'react';

const WaitlistIncentivePlan = () => {
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
  const tiers = [
    {
      id: 'gold',
      title: 'GOLD',
      icon: <Award className="w-8 h-8 text-yellow-600" />,
      bgColor: isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50',
      borderColor: isDarkMode ? 'border-yellow-600/30' : 'border-yellow-200',
      tagColor: 'bg-yellow-500',
      mainTitle: 'First 10 Users',
      subtitle: 'Give feedback + post on Twitter/LinkedIn',
      reward: '🎁 500 FREE follow-up emails',
      rewardBg: isDarkMode ? 'bg-yellow-800/30' : 'bg-yellow-100',
      rewardText: isDarkMode ? 'text-yellow-300' : 'text-yellow-800'
    },
    {
      id: 'silver',
      title: 'SILVER',
      icon: <Gift className="w-8 h-8" />,
      bgColor: isDarkMode ? 'bg-gray-800/30' : 'bg-gray-50',
      borderColor: isDarkMode ? 'border-gray-600/30' : 'border-gray-200',
      tagColor: 'bg-gray-500',
      mainTitle: 'Next 20 Users',
      subtitle: 'Waitlist signups #11-30',
      reward: '🎁 100 FREE follow-up emails',
      rewardBg: isDarkMode ? 'bg-gray-700/40' : 'bg-gray-100',
      rewardText: isDarkMode ? 'text-gray-300' : 'text-gray-800'
    },
    {
      id: 'bronze',
      title: 'BRONZE',
      icon: <Percent className="w-8 h-8 text-orange-600" />,
      bgColor: isDarkMode ? 'bg-orange-900/20' : 'bg-orange-50',
      borderColor: isDarkMode ? 'border-orange-600/30' : 'border-orange-200',
      tagColor: 'bg-orange-500',
      mainTitle: 'Waitlist signups #31-500',
      subtitle: 'Waitlist signups #31-500',
      reward: '🎉 50% OFF first 3 months',
      rewardBg: isDarkMode ? 'bg-orange-800/30' : 'bg-orange-100',
      rewardText: isDarkMode ? 'text-orange-300' : 'text-orange-800'
    }
  ];

  return (
    <motion.div 
      className='mt-12'
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="w-full max-w-6xl mx-auto p-6">
        <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Waitlist Incentive Plan
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative ${tier.bgColor} ${tier.borderColor} border-2 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              {/* Tier Badge */}
              <div className={`inline-flex items-center px-4 py-2 ${tier.tagColor} text-white text-sm font-bold rounded-full mb-6`}>
                <span className="mr-1">
                  {tier.id === 'gold' && '🥇'}
                  {tier.id === 'silver' && '🥈'}
                  {tier.id === 'bronze' && '🥉'}
                </span>
                {tier.title}
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                {/* <div className={`p-4 rounded-full shadow-md bg-white`}> */}
                <div className={`p-4 rounded-full shadow-md ${isDarkMode ? 'bg-gray-700/50' : 'bg-white'}`}>
                  {tier.icon}
                </div>
              </div>

              {/* Main Title */}
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {tier.mainTitle}
              </h3>

              {/* Subtitle */}
              <p className={`text-sm mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {tier.subtitle}
              </p>

              {/* Reward */}
              <div className={`${tier.rewardBg} ${tier.rewardText} rounded-lg p-4 font-semibold text-sm`}>
                {tier.reward}
              </div>

              {/* Hover Effect Gradient */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                isDarkMode ? 'bg-gradient-to-t from-white/2 to-transparent' : 'bg-gradient-to-t from-white/5 to-transparent'
              }`}></div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </motion.div>
  );
};

export default WaitlistIncentivePlan;