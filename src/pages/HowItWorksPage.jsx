
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: '📝',
    title: 'Register',
    desc: 'Donors & hospitals sign up, verify credentials, and join the network.',
  },
  {
    icon: '📊',
    title: 'Smart Dashboards',
    desc: 'Donors manage profile & availability. Hospitals track stock & post requests.',
  },
  {
    icon: '📢',
    title: 'Blood Requests',
    desc: 'Hospitals request blood instantly. System alerts eligible donors nearby.',
  },
  {
    icon: '🩸',
    title: 'Donation & Tracking',
    desc: 'Donors donate safely, and reminders are sent when eligible.',
  },
  {
    icon: '🚨',
    title: 'Emergency Mode',
    desc: 'One-click SOS broadcasts notify matching donors immediately.',
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-red-50">
      <h2 className="max-w-7xl mx-auto px-4 text-4xl font-extrabold mb-12 flex items-center space-x-3">
        {/* <span>⚙️</span>
        <span>How It Works</span> */}
      </h2>

      <div className="max-w-4xl mx-auto space-y-8">
        {steps.map(({ icon, title, desc }, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="flex items-start space-x-6 bg-white p-6 rounded-lg shadow-md border border-red-200"
          >
            <div className="text-red-600 text-5xl">{icon}</div>
            <div>
              <h3 className="font-bold text-xl mb-1">{title}</h3>
              <p className="text-gray-700">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

