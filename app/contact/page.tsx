'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulated submission - in real app, send to backend
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
      // Clear message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <a href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            LocalAI OCR
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">Contact Us</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12">
          Have a question or feedback? We'd love to hear from you!
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-3">📧</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Email</h3>
            <a href="mailto:support@localai.ocr" className="text-purple-600 hover:text-purple-700">
              support@localai.ocr
            </a>
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-3">🕐</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Response Time</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Usually within 24 hours
            </p>
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Language</h3>
            <p className="text-gray-600 dark:text-gray-400">
              English & 中文
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
              <p className="text-green-700 dark:text-green-200">✅ Thank you! Your message has been sent successfully. We'll get back to you soon!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Subject *
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="">Select a subject</option>
                <option value="bug">🐛 Bug Report</option>
                <option value="feature">✨ Feature Request</option>
                <option value="feedback">💬 General Feedback</option>
                <option value="partnership">🤝 Partnership Inquiry</option>
                <option value="other">❓ Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                placeholder="Please describe your message in detail..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-purple-800 hover:shadow-lg active:scale-95'
              }`}
            >
              {loading ? '📤 Sending...' : '📤 Send Message'}
            </button>

            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              * Required fields
            </p>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">What is LocalAI OCR?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                LocalAI OCR is a free, privacy-first text recognition tool that processes images on your device without uploading them to any server.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Is my data safe?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Yes! All processing happens locally on your device. Your images are never uploaded to our servers and are not stored anywhere.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Do you have a mobile app?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Yes! Download our mobile app from Google Play for an enhanced experience with additional features.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Is it really free?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Yes! LocalAI OCR is completely free to use. There are no hidden fees, registration requirements, or limitations on the number of images you can process.
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <a href="/" className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            ← Back to Home
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© 2025 LocalAI OCR. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
