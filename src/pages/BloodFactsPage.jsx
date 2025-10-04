
// import React, { useState, useEffect } from 'react';

// const facts = [
//   {
//     icon: '🩸',
//     front: '1 Donation = 3 Lives Saved',
//     back: 'Blood is separated into red cells, plasma, and platelets for different patients.'
//   },
//   {
//     icon: '🚫',
//     front: 'No Substitute for Blood',
//     back: 'Blood cannot be manufactured. It can only be donated by humans.'
//   },
//   {
//     icon: '📅',
//     front: 'Donate Whole Blood Every 90 Days',
//     back: 'Whole blood donation is safe every 3 months, with eligibility tracked automatically.'
//   },
//   {
//     icon: '🌍',
//     front: 'Less than 1% of India Donates Regularly',
//     back: 'Imagine lives saved if more people regularly donated blood.'
//   },
//   {
//     icon: '❤️',
//     front: 'Donation Improves Heart Health',
//     back: 'Regular donation reduces excess iron and promotes new blood cell growth.'
//   }
// ];

// export default function BloodFactsSection() {
//   const [index, setIndex] = useState(0);
//   const [flipped, setFlipped] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFlipped(false);
//       setTimeout(() => setIndex((i) => (i + 1) % facts.length), 300);
//     }, 8000);

//     return () => clearInterval(interval);
//   }, []);

//   const fact = facts[index];

//   return (
//     <section className="py-16 max-w-4xl mx-auto px-4 text-center">
//       <h2 className="text-4xl font-extrabold mb-12 flex justify-center items-center space-x-3">
//         {/* <span>📊</span>
//         <span>Blood Donation Facts</span> */}
//       </h2>

//       <div
//         onClick={() => setFlipped(!flipped)}
//         className={`relative w-72 h-44 mx-auto cursor-pointer perspective`}
//       >
//         <div
//           className={`absolute w-full h-full transition-transform duration-700 ease-in-out ${flipped ? 'rotate-y-180' : ''}`}
//           style={{ transformStyle: 'preserve-3d' }}
//         >
//           {/* Front */}
//           <div className="absolute backface-hidden bg-red-50 rounded-lg shadow-lg flex flex-col justify-center items-center p-6 w-full h-full">
//             <div className="text-6xl mb-3">{fact.icon}</div>
//             <h3 className="text-xl font-semibold text-red-600">{fact.front}</h3>
//           </div>

//           {/* Back */}
//           <div className="absolute backface-hidden rotate-y-180 bg-white rounded-lg shadow-lg p-6 w-full h-full flex items-center justify-center text-gray-700 text-center">
//             {fact.back}
//           </div>
//         </div>
//       </div>

//       <p className="mt-4 text-gray-500 text-sm">Click the card to flip for more info</p>
//     </section>
//   );
// }






import React, { useState } from 'react';

const factCards = [
  {
    icon: '🩸',
    front: '1 Donation = 3 Lives Saved',
    back: (
      <>
        <p>
          One blood donation is separated into red cells, plasma, and platelets, each used to save different patients.
        </p>
        <p className="mt-1 text-sm text-gray-600">
          This multiplies the impact of a single donation significantly.
        </p>
      </>
    ),
  },
  {
    icon: '🚫',
    front: 'No Substitute for Human Blood',
    back: (
      <>
        <p>
          Blood cannot be artificially manufactured — it only comes from generous voluntary donors.
        </p>
        <p className="mt-1 text-sm text-gray-600">
          Your donation literally saves lives every day.
        </p>
      </>
    ),
  },
  {
    icon: '❤️',
    front: 'Health Benefits for Donors',
    back: (
      <>
        <p>
          Donating blood regularly has health benefits including reducing excess iron, promoting cardiovascular health, and encouraging new blood cell growth.
        </p>
        <p className="mt-1 text-sm text-gray-600">
          It’s good for you and even better for someone else.
        </p>
      </>
    ),
  },
];

export default function BloodDonationFactsSection() {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const toggleFlip = (index) => {
    if (flippedIndex === index) {
      setFlippedIndex(null);
    } else {
      setFlippedIndex(index);
    }
  };

  return (
    <section className="py-16 max-w-5xl mx-auto px-4 text-center">
      <h2 className="text-4xl font-extrabold mb-12 flex justify-center items-center space-x-3">
        {/* <span>📊</span>
        <span>Blood Donation Facts</span> */}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {factCards.map(({ icon, front, back }, idx) => (
          <div
            key={idx}
            role="button"
            tabIndex={0}
            onClick={() => toggleFlip(idx)}
            onKeyDown={(e) => e.key === 'Enter' && toggleFlip(idx)}
            className="relative w-full h-56 cursor-pointer perspective mx-auto"
          >
            <div
              className={`relative w-full h-full text-left duration-700 transform-style preserve-3d ${
                flippedIndex === idx ? 'rotate-y-180' : ''
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front */}
              <div className="absolute w-full h-full bg-red-50 border border-red-200 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center backface-hidden">
                <div className="text-6xl mb-4">{icon}</div>
                <h3 className="text-xl font-semibold text-red-600">{front}</h3>
              </div>

              {/* Back */}
              <div className="absolute w-full h-full bg-white border border-gray-200 rounded-lg shadow-lg p-6 backface-hidden rotate-y-180 flex flex-col justify-center text-gray-700">
                {back}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-gray-500 italic">Click a card to flip and learn more!</p>
    </section>
  );
}
