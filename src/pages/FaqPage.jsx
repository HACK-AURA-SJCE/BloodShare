
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqItems = [
  { question: "Who can donate blood?", answer: "Healthy individuals aged 18–65, weighing 50kg+, with no major health conditions." },
  { question: "How often can I donate?", answer: "Whole blood: every 3 months | Platelets: every 2 weeks | Plasma: every 28 days." },
  { question: "Is the process safe?", answer: "100% safe — sterile, single-use needles only. No risk of infection." },
  { question: "How will I know if my blood is needed?", answer: "You’ll get real-time notifications when a nearby hospital posts a request." },
  { question: "Can hospitals collaborate through the system?", answer: "Yes! Hospitals can share surplus stock and see nearby shortages." },
  { question: "Why should I donate regularly?", answer: "To keep blood banks ready for emergencies and save lives continuously." },
];

export default function FAQSection() {
  return (
    <section className="py-16 max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-extrabold mb-8 flex items-center space-x-3">
        {/* <span>❓</span>
        <span>FAQ</span> */}
      </h2>
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow">
        {faqItems.map(({ question, answer }, idx) => (
          <FAQItem key={idx} question={question} answer={answer} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none group hover:bg-red-50"
      >
        <p className="font-medium text-lg">{question}</p>
        <span className="text-red-600">
          {open ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-4 text-gray-700 text-base leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}
