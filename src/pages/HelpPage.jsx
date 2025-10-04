// // import React, { useState } from 'react';

// // const HelpPage = () => {
// //   // Form state
// //   const [formData, setFormData] = useState({
// //     role: '',
// //     name: '',
// //     email: '',
// //     subject: '',
// //     message: ''
// //   });
// //   const [submitted, setSubmitted] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // Integration with API/email service here
// //     console.log('Form Data Submitted:', formData);
// //     setSubmitted(true);
// //     setFormData({ role: '', name: '', email: '', subject: '', message: '' });
// //   };

// //   return (
// //     <main className="max-w-4xl mx-auto p-6 pt-28 min-h-screen bg-white rounded-lg shadow-lg">
// //       <h1 className="text-4xl font-bold mb-8">Support & Help Center 🤝</h1>

// //       <section className="mb-12">
// //         <p>We are committed to making your experience seamless. Find help below, or use our contact form for direct assistance.</p>

// //         <h2 className="text-2xl font-semibold mt-8 mb-4">Need Immediate Assistance?</h2>
// //         <table className="table-auto w-full mb-10 border border-gray-200">
// //           <thead>
// //             <tr className="bg-red-100 text-left text-gray-800">
// //               <th className="p-3">Issue</th>
// //               <th className="p-3">Quick Solution</th>
// //               <th className="p-3">Contact</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             <tr className="border-t border-gray-200">
// //               <td className="p-3 font-semibold">Urgent Blood Request Error</td>
// //               <td className="p-3">
// //                 If you are a hospital partner experiencing a critical technical issue with an active SOS alert.
// //               </td>
// //               <td className="p-3 text-red-600 font-semibold">Call 24/7 Support: +91-1234567890</td>
// //             </tr>
// //             <tr className="border-t border-gray-200 bg-gray-50">
// //               <td className="p-3 font-semibold">Donor Safety / Eligibility Concern</td>
// //               <td className="p-3">
// //                 Check Donor Health Guidelines or contact our medical support team.
// //               </td>
// //               <td className="p-3">Email: medicalsupport@bloodconnect.com</td>
// //             </tr>
// //           </tbody>
// //         </table>
// //       </section>

// //       <section className="mb-12">
// //         <h2 className="text-2xl font-semibold mb-4">Donor Help & Account Management 👤</h2>
// //         <ul className="list-disc pl-6 space-y-3 text-gray-700">
// //           <li><strong>Update location/availability:</strong> Use 'Profile Settings' on your dashboard to toggle availability.</li>
// //           <li><strong>Forgot password:</strong> Use the "Forgot Password" link on login to reset.</li>
// //           <li><strong>Download donation history:</strong> Found under 'Donation Records' in dashboard.</li>
// //           <li><strong>Cancel donation:</strong> Notify hospital via chat and select 'Cancel Donation'.</li>
// //           <li><strong>Post-donation care:</strong> Contact the hospital where you donated immediately if unwell.</li>
// //         </ul>
// //       </section>

// //       <section className="mb-12">
// //         <h2 className="text-2xl font-semibold mb-4">Still Need to Connect? Send Us a Message 📧</h2>
// //         {submitted && <p className="mb-6 text-green-600 font-semibold">Thank you! Your message was sent successfully.</p>}
// //         <form className="space-y-6" onSubmit={handleSubmit}>
// //           <div>
// //             <label htmlFor="role" className="block text-gray-800 font-semibold mb-2">I am a...</label>
// //             <select
// //               id="role"
// //               name="role"
// //               value={formData.role}
// //               onChange={handleChange}
// //               required
// //               className="w-full border border-gray-300 rounded px-3 py-2"
// //             >
// //               <option value="">Select</option>
// //               <option value="Donor">Donor</option>
// //               <option value="Hospital Partner">Hospital Partner</option>
// //               <option value="General Inquiry">General Inquiry</option>
// //             </select>
// //           </div>

// //           <div>
// //             <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">Your Name *</label>
// //             <input
// //               type="text"
// //               id="name"
// //               name="name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               placeholder="Full Name"
// //               required
// //               className="w-full border border-gray-300 rounded px-3 py-2"
// //             />
// //           </div>

// //           <div>
// //             <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">Your Email *</label>
// //             <input
// //               type="email"
// //               id="email"
// //               name="email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               placeholder="Email Address"
// //               required
// //               className="w-full border border-gray-300 rounded px-3 py-2"
// //             />
// //           </div>

// //           <div>
// //             <label htmlFor="subject" className="block text-gray-800 font-semibold mb-2">Subject *</label>
// //             <input
// //               type="text"
// //               id="subject"
// //               name="subject"
// //               value={formData.subject}
// //               onChange={handleChange}
// //               placeholder="Subject (e.g., Account issue, Feedback)"
// //               required
// //               className="w-full border border-gray-300 rounded px-3 py-2"
// //             />
// //           </div>

// //           <div>
// //             <label htmlFor="message" className="block text-gray-800 font-semibold mb-2">Your Message *</label>
// //             <textarea
// //               id="message"
// //               name="message"
// //               value={formData.message}
// //               onChange={handleChange}
// //               rows="5"
// //               placeholder="Please provide specific details, dates, account ID (optional)..."
// //               required
// //               className="w-full border border-gray-300 rounded px-3 py-2"
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-semibold transition"
// //           >
// //             Send Message
// //           </button>
// //         </form>
// //       </section>

// //       <section>
// //         <h2 className="text-2xl font-semibold mb-4">Partnerships & Media</h2>
// //         <p className="mb-2">For specific non-support inquiries:</p>
// //         <ul className="text-gray-700 space-y-2 list-disc pl-6">
// //           <li>Partnerships: Blood drive collaboration or hospital onboarding - <a href="mailto:partners@yourdomain.org" className="text-red-600 underline">partners@yourdomain.org</a></li>
// //           <li>Press & Media: Interview requests, news features, or data requests - <a href="mailto:media@yourdomain.org" className="text-red-600 underline">media@yourdomain.org</a></li>
// //         </ul>
// //       </section>
// //     </main>
// //   );
// // };

// // export default HelpPage;



// import React, { useState } from 'react';

// const SupportTable = () => (
//   <table className="table-auto w-full mb-10 border border-gray-200 rounded-lg shadow-sm">
//     <thead className="bg-red-100 text-gray-800 font-semibold">
//       <tr>
//         <th className="p-4 text-left">Issue</th>
//         <th className="p-4 text-left">Quick Solution</th>
//         <th className="p-4 text-left">Contact</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr className="border-t border-gray-200 hover:bg-red-50 transition">
//         <td className="p-4">Urgent Blood Request Error</td>
//         <td className="p-4">If you are a hospital partner experiencing a critical technical issue with an active SOS alert.</td>
//         <td className="p-4 text-red-600 font-semibold">24/7 Support: +91-1234567890</td>
//       </tr>
//       <tr className="border-t border-gray-200 bg-gray-50 hover:bg-red-50 transition">
//         <td className="p-4">Donor Safety / Eligibility Concern</td>
//         <td className="p-4">Check Donor Health Guidelines or contact medical support team.</td>
//         <td className="p-4">Email: <a href="mailto:medicalsupport@bloodconnect.com" className="underline text-red-600">medicalsupport@bloodconnect.com</a></td>
//       </tr>
//     </tbody>
//   </table>
// );

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     role: '',
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(f => ({ ...f, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Integrate backend or email sending here
//     setSubmitted(true);
//     setFormData({ role: '', name: '', email: '', subject: '', message: '' });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Send Us a Message</h2>

//       {submitted && (
//         <div className="mb-6 p-4 bg-green-100 text-green-700 rounded">
//           Thank you! Your message has been sent.
//         </div>
//       )}

//       <label className="block mb-3">
//         <span className="text-gray-700 font-semibold">I am a...</span>
//         <select
//           className="mt-1 block w-full rounded border border-gray-300 p-2"
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select</option>
//           <option value="Donor">Donor</option>
//           <option value="Hospital Partner">Hospital Partner</option>
//           <option value="General Inquiry">General Inquiry</option>
//         </select>
//       </label>

//       <label className="block mb-3">
//         <span className="text-gray-700 font-semibold">Your Name *</span>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="mt-1 block w-full border border-gray-300 rounded p-2"
//           placeholder="Full Name"
//         />
//       </label>

//       <label className="block mb-3">
//         <span className="text-gray-700 font-semibold">Your Email *</span>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="mt-1 block w-full border border-gray-300 rounded p-2"
//           placeholder="Email Address"
//         />
//       </label>

//       <label className="block mb-3">
//         <span className="text-gray-700 font-semibold">Subject *</span>
//         <input
//           type="text"
//           name="subject"
//           value={formData.subject}
//           onChange={handleChange}
//           required
//           className="mt-1 block w-full border border-gray-300 rounded p-2"
//           placeholder="Subject"
//         />
//       </label>

//       <label className="block mb-6">
//         <span className="text-gray-700 font-semibold">Your Message *</span>
//         <textarea
//           name="message"
//           value={formData.message}
//           onChange={handleChange}
//           required
//           className="mt-1 block w-full border border-gray-300 rounded p-2 resize-y"
//           rows="5"
//           placeholder="Write your message here..."
//         ></textarea>
//       </label>

//       <button
//         type="submit"
//         className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition"
//       >
//         Send Message
//       </button>
//     </form>
//   );
// };

// const Partnerships = () => (
//   <div className="max-w-lg mx-auto mt-16">
//     <h2 className="text-2xl font-bold mb-4 text-center text-red-600">Partnerships & Media</h2>
//     <p className="mb-4 text-center text-gray-700">For specific non-support inquiries:</p>
//     <ul className="list-disc list-inside text-gray-700 space-y-2 max-w-sm mx-auto">
//       <li>
//         <strong>Partnerships:</strong> Blood drive collaboration, hospital onboarding —{" "}
//         <a href="mailto:partners@yourdomain.org" className="underline text-red-600">
//           partners@yourdomain.org
//         </a>
//       </li>
//       <li>
//         <strong>Press & Media:</strong> Interviews, news, data requests —{" "}
//         <a href="mailto:media@yourdomain.org" className="underline text-red-600">
//           media@yourdomain.org
//         </a>
//       </li>
//     </ul>
//   </div>
// );

// // Main HelpPage Component
// export default function HelpPage() {
//   return (
//     <main className="min-h-screen pt-28 max-w-5xl mx-auto px-4">
//       <h1 className="text-5xl font-extrabold mb-12 text-center text-red-600">Support & Help Center 🤝</h1>
//       <p className="text-center text-lg text-gray-700 max-w-xl mx-auto mb-10">
//         We are committed to making your experience seamless. Find help below, or use our contact form for direct assistance.
//       </p>

//       <SupportTable />

//       <section aria-labelledby="contact-form-heading">
//         <ContactForm />
//       </section>

//       <Partnerships />
//     </main>
//   );
// }






import React, { useState } from 'react';
import { Search, MessageCircle, Phone, Mail, Clock, ChevronDown, ChevronUp, CheckCircle, HelpCircle, Users, Newspaper, Heart } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg mb-3 overflow-hidden hover:shadow-md transition">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left flex justify-between items-center bg-white hover:bg-red-50 transition"
      >
        <span className="font-semibold text-gray-800">{question}</span>
        {isOpen ? <ChevronUp className="text-red-600" /> : <ChevronDown className="text-red-600" />}
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
};

const QuickAccessCard = ({ icon: Icon, title, description, action, isUrgent }) => (
  <div className={`p-6 rounded-xl shadow-lg transition transform hover:scale-105 ${isUrgent ? 'bg-gradient-to-br from-red-500 to-red-600 text-white' : 'bg-white'}`}>
    <div className="flex items-start mb-3">
      <Icon className={`w-8 h-8 mr-3 ${isUrgent ? 'text-white' : 'text-red-600'}`} />
      <div className="flex-1">
        <h3 className={`text-xl font-bold mb-2 ${isUrgent ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
        <p className={`text-sm mb-4 ${isUrgent ? 'text-red-100' : 'text-gray-600'}`}>{description}</p>
        {action}
      </div>
    </div>
  </div>
);

const SupportTable = () => (
  <div className="overflow-x-auto mb-10">
    <table className="table-auto w-full border border-gray-200 rounded-lg shadow-sm">
      <thead className="bg-gradient-to-r from-red-500 to-red-600 text-white">
        <tr>
          <th className="p-4 text-left">Issue Type</th>
          <th className="p-4 text-left">Quick Solution</th>
          <th className="p-4 text-left">Contact Method</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t border-gray-200 hover:bg-red-50 transition">
          <td className="p-4 font-semibold text-gray-800">🚨 Urgent Blood Request Error</td>
          <td className="p-4 text-gray-700">Critical technical issue with active SOS alert</td>
          <td className="p-4">
            <div className="flex items-center text-red-600 font-semibold">
              <Phone className="w-4 h-4 mr-2" />
              24/7: +91-1234567890
            </div>
          </td>
        </tr>
        <tr className="border-t border-gray-200 bg-gray-50 hover:bg-red-50 transition">
          <td className="p-4 font-semibold text-gray-800">💉 Donor Safety Concern</td>
          <td className="p-4 text-gray-700">Check guidelines or contact medical team</td>
          <td className="p-4">
            <a href="mailto:medicalsupport@bloodconnect.com" className="flex items-center text-red-600 hover:underline">
              <Mail className="w-4 h-4 mr-2" />
              medicalsupport@bloodconnect.com
            </a>
          </td>
        </tr>
        <tr className="border-t border-gray-200 hover:bg-red-50 transition">
          <td className="p-4 font-semibold text-gray-800">🏥 Hospital Portal Issues</td>
          <td className="p-4 text-gray-700">Technical problems with hospital dashboard</td>
          <td className="p-4">
            <a href="mailto:hospitals@bloodconnect.com" className="flex items-center text-red-600 hover:underline">
              <Mail className="w-4 h-4 mr-2" />
              hospitals@bloodconnect.com
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ role: '', name: '', email: '', subject: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl mx-auto border border-gray-200">
      <div className="flex items-center justify-center mb-6">
        <MessageCircle className="w-8 h-8 text-red-600 mr-3" />
        <h2 className="text-3xl font-bold text-red-600">Send Us a Message</h2>
      </div>

      {submitted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center animate-pulse">
          <CheckCircle className="w-5 h-5 mr-3" />
          <span>Thank you! Your message has been sent successfully.</span>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <label className="block">
          <span className="text-gray-700 font-semibold flex items-center mb-2">
            <Users className="w-4 h-4 mr-2 text-red-600" />
            I am a...
          </span>
          <select
            className="mt-1 block w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Donor">Donor</option>
            <option value="Hospital Partner">Hospital Partner</option>
            <option value="General Inquiry">General Inquiry</option>
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700 font-semibold mb-2 block">Your Name *</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            placeholder="Full Name"
          />
        </label>
      </div>

      <label className="block mb-4">
        <span className="text-gray-700 font-semibold mb-2 block">Your Email *</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
          placeholder="email@example.com"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 font-semibold mb-2 block">Subject *</span>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
          placeholder="Brief description of your issue"
        />
      </label>

      <label className="block mb-6">
        <span className="text-gray-700 font-semibold mb-2 block">Your Message *</span>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3 resize-y focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
          rows="5"
          placeholder="Please provide as much detail as possible..."
        ></textarea>
      </label>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 rounded-lg transition transform hover:scale-105 shadow-lg"
      >
        Send Message
      </button>
    </form>
  );
};

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <div className="max-w-2xl mx-auto mb-12">
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search for help articles, FAQs, or topics..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition shadow-md"
      />
    </div>
  </div>
);

const Partnerships = () => (
  <div className="max-w-2xl mx-auto mt-16 bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-lg">
    <h2 className="text-3xl font-bold mb-6 text-center text-red-600 flex items-center justify-center">
      <Heart className="w-8 h-8 mr-3" />
      Partnerships & Media
    </h2>
    <p className="mb-6 text-center text-gray-700 text-lg">For collaboration and media inquiries:</p>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <div className="flex items-start mb-3">
          <Users className="w-6 h-6 text-red-600 mr-3 mt-1" />
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Partnerships</h3>
            <p className="text-sm text-gray-600 mb-3">Blood drives, hospital onboarding, collaborations</p>
            <a href="mailto:partners@bloodconnect.com" className="text-red-600 hover:underline font-semibold text-sm">
              partners@bloodconnect.com
            </a>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <div className="flex items-start mb-3">
          <Newspaper className="w-6 h-6 text-red-600 mr-3 mt-1" />
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Press & Media</h3>
            <p className="text-sm text-gray-600 mb-3">Interviews, news coverage, data requests</p>
            <a href="mailto:media@bloodconnect.com" className="text-red-600 hover:underline font-semibold text-sm">
              media@bloodconnect.com
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const faqs = [
    {
      question: "How do I register as a blood donor?",
      answer: "You can register by clicking on the 'Register as Donor' button on our homepage and filling out the registration form with your details including blood type, location, and contact information."
    },
    {
      question: "What are the eligibility criteria for donating blood?",
      answer: "You must be 18-65 years old, weigh at least 50kg, be in good health, and not have donated blood in the last 3 months. Certain medical conditions may affect eligibility."
    },
    {
      question: "How does the SOS blood request system work?",
      answer: "Hospitals can send urgent SOS requests through our platform. Eligible donors in the area receive immediate notifications via SMS and app notifications to respond quickly."
    },
    {
      question: "Can I schedule a blood donation appointment?",
      answer: "Yes! You can schedule appointments through our platform by selecting available time slots at partner hospitals or blood banks near you."
    },
    {
      question: "How do hospitals join the BloodConnect network?",
      answer: "Hospitals can apply for partnership by contacting partners@bloodconnect.com. After verification, we'll provide access to our hospital portal for managing blood requests."
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-white pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            Support & Help Center
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            We're here to help you save lives. Find answers, get support, or reach out to our team.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Quick Access Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <QuickAccessCard
            icon={Phone}
            title="Urgent Support"
            description="Critical blood request issues"
            isUrgent={true}
            action={
              <a href="tel:+911234567890" className="inline-block bg-white text-red-600 font-bold py-2 px-4 rounded-lg hover:bg-red-50 transition">
                Call Now: +91-1234567890
              </a>
            }
          />
          <QuickAccessCard
            icon={Clock}
            title="Response Time"
            description="Average response: 2 hours during business hours"
            action={
              <div className="text-sm text-gray-600 font-semibold">Mon-Fri: 9 AM - 6 PM IST</div>
            }
          />
          <QuickAccessCard
            icon={HelpCircle}
            title="FAQ Library"
            description="Browse our comprehensive knowledge base"
            action={
              <button
                onClick={() => document.getElementById('faq-section').scrollIntoView({ behavior: 'smooth' })}
                className="text-red-600 font-semibold hover:underline"
              >
                View All FAQs →
              </button>
            }
          />
        </div>

        {/* Support Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Common Support Issues</h2>
          <SupportTable />
        </section>

        {/* FAQ Section */}
        <section id="faq-section" className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center flex items-center justify-center">
            <HelpCircle className="w-8 h-8 mr-3 text-red-600" />
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No FAQs found matching "{searchQuery}". Try different keywords or contact us directly.
              </div>
            )}
          </div>
        </section>

        {/* Contact Form */}
        <section aria-labelledby="contact-form-heading" className="mb-16">
          <h2 id="contact-form-heading" className="text-3xl font-bold mb-8 text-gray-800 text-center">
            Still Need Help?
          </h2>
          <ContactForm />
        </section>

        {/* Partnerships */}
        <Partnerships />

        {/* Live Chat Button (Fixed) */}
        <button className="fixed bottom-8 right-8 bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition transform z-50">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </main>
  );
}