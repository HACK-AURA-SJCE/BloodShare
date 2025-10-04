

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Animated Counter Hook
const useCounter = (end, duration = 1500) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 30);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [end, duration]);
  return count;
};

// Hover Card Component
const HoverCard = ({ icon, title, desc }) => (
  <div className="group relative bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition hover:scale-105 hover:ring-2 hover:ring-red-500">
    <div className="absolute inset-0 bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
    <div className="relative z-10">
      <div className="text-red-600 mb-2 text-3xl">{icon}</div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  </div>
);

// Timeline Step Component
const TimelineStep = ({ step, icon, title, desc, active }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className={`flex items-start space-x-4 p-4 rounded-lg shadow-md border ${active ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"}`}
  >
    <div className="text-red-600 text-4xl">{icon}</div>
    <div>
      <h4 className="font-semibold mb-1">{step}. {title}</h4>
      <p className="text-gray-700 text-sm">{desc}</p>
    </div>
  </motion.div>
);

// Flip Card for Facts
const FlipCard = ({ front, back, flipped, onClick }) => (
  <div className="w-64 h-40 perspective cursor-pointer" onClick={onClick}>
    <div className={`relative w-full h-full transition-transform duration-700 ${flipped ? 'rotate-y-180' : ''}`}>
      <div className="absolute backface-hidden bg-red-50 rounded-lg shadow p-6 flex flex-col justify-center items-center">
        <p className="text-3xl mb-2">{front.icon}</p>
        <p className="font-semibold text-lg text-red-600">{front.text}</p>
      </div>
      <div className="absolute backface-hidden rotate-y-180 bg-white rounded-lg shadow p-6 text-center text-gray-700 flex items-center justify-center">
        {back}
      </div>
    </div>
  </div>
);

// FAQ Accordion Item
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full px-4 py-3 flex justify-between items-center text-left focus:outline-none focus-visible:ring focus-visible:ring-red-500"
      >
        <span className="font-semibold">{question}</span>
        {open ? <ChevronUp size={20} className="text-red-500" /> : <ChevronDown size={20} />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden px-4 pb-4 text-gray-700"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AboutUsPage = () => {
  // Counters for stats
  const donors = useCounter(10000);
  const livesSaved = useCounter(50000);
  const hospitals = useCounter(200);

  // State for facts carousel
  const facts = [
    { icon: '🩸', text: '1 Donation = 3 Lives Saved', detail: 'Blood separates into red cells, plasma, and platelets.' },
    { icon: '🚫', text: 'No Substitute for Blood', detail: 'It only comes from voluntary donors.' },
    { icon: '📅', text: 'Donate Every 90 Days', detail: 'Whole blood donation is safe every 3 months.' },
    { icon: '🌍', text: 'Less Than 1% Donate Regularly', detail: 'More donations mean more lives saved.' },
    { icon: '❤️', text: 'Health Benefits', detail: 'Donation improves heart health & cell renewal.' },
  ];
  const [currentFact, setCurrentFact] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Auto carousel effect
  useEffect(() => {
    const timer = setInterval(() => {
      setFlipped(false);
      setCurrentFact(prev => (prev + 1) % facts.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [facts.length]);

  return (
    <div className="max-w-6xl mx-auto p-6 pt-28 space-y-16 text-gray-900">

      {/* ✨ About Us Section */}
      <section>
        <h2 className="text-4xl font-extrabold mb-6 flex items-center space-x-3">
          {/* <span>✨</span> <span>About Us</span> */}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <HoverCard
            icon="🩸"
            title="Our Mission"
            desc="“Every drop counts.” We exist to bridge the gap between donors, hospitals, and patients using real-time technology."
          />
          <HoverCard
            icon="✅"
            title="Why We’re Different"
            desc="Instant SOS alerts, verified users, live stock management, and hospital collaboration to avoid shortages."
          />
          <HoverCard
            icon="🌟"
            title="Our Vision"
            desc="Building a community-driven ecosystem where donating blood is a movement of compassion saving thousands daily."
          />
        </div>
        <div className="mt-6 text-center text-3xl font-bold space-x-8 text-red-600">
          <span>{donors.toLocaleString()}+ Donors</span>
          <span>{livesSaved.toLocaleString()}+ Lives Saved</span>
          <span>{hospitals.toLocaleString()}+ Hospitals Connected</span>
        </div>
      </section>

      {/* ⚙️ How It Works Animated Timeline */}
    
    </div>
  );
};

export default AboutUsPage;
