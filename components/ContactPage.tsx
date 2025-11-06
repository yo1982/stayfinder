import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here (e.g., API call)
    setIsSubmitted(true);
  };

  const commonInputStyles = "w-full p-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-colors duration-200";

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md text-center">
            <h1 className="text-3xl font-bold text-gray-900">Thank You!</h1>
            <p className="mt-4 text-gray-600">Your message has been sent successfully. We will get back to you as soon as possible.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-2 text-lg text-gray-600">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="mt-12 bg-white p-8 rounded-xl shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className={commonInputStyles} />
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className={commonInputStyles} />
                </div>
                 <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} required rows={5} className={commonInputStyles}></textarea>
                </div>
                <div>
                     <button
                        type="submit"
                        className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors duration-200 text-lg"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
