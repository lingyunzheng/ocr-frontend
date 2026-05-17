'use client';

import { useState } from 'react';

export default function ContactPage() {
  const contactText = {
    subtitle: "Have a question or feedback? We'd love to hear from you!",
    successMessage: "Thank you! Your message has been sent successfully. We'll get back to you soon!",
  };

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // 提交成功后显示消息
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    // Formspree 会自动处理提交，我们只需要等待响应
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setTimeout(() => setSubmitted(false), 5000);
      // 重置表单
      e.currentTarget.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <a
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent"
          >
            Offline OCR
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12">
          {contactText.subtitle}
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-3">📧</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Email</h3>
            <a
              href="mailto:zhenglingyun829@gmail.com"
              className="text-purple-600 hover:text-purple-700"
            >
              zhenglingyun829@gmail.com
            </a>
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-3">🕐</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Response Time</h3>
            <p className="text-gray-600 dark:text-gray-400">Usually within 24 hours</p>
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Language</h3>
            <p className="text-gray-600 dark:text-gray-400">English &amp; 中文</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Send us a Message
          </h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
              <p className="text-green-700 dark:text-green-200">
                ✅ {contactText.successMessage}
              </p>
            </div>
          )}

          {/* Formspree 表单 */}
          <form
            action="https://formspree.io/f/mlggejyd"
            method="POST"
            onSubmit={handleFormSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Subject *
              </label>
              <select
                name="subject"
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

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Message *
              </label>
              <textarea
                name="message"
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                placeholder="Please describe your message in detail..."
              />
            </div>

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

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                What is Offline OCR?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Offline OCR is a privacy-first text and formula recognition tool. It operates using a dual-engine architecture: a secure, free local offline mode that processes images entirely on your device, and an advanced, opt-in cloud mode for the highest recognition accuracy.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Is my data safe?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Yes! In the default On-Device AI Mode, all processing happens locally on your device, and your images never leave your phone. If you opt to use the Cloud Assist Mode, your image is temporarily transmitted via a secure, encrypted connection to our servers and is permanently deleted immediately after processing. We never store or sell your data, nor use it to train models.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Do you have a mobile app?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Yes! Download our mobile app from Google Play for the full dual-engine experience, including complex math formula parsing and complete offline processing capabilities.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Is it really free?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                The core On-Device AI Mode is completely free to use with no limitations on the number of images you can process. We also offer optional &quot;Pro&quot; or &quot;Plus&quot; subscriptions for access to our advanced Cloud Assist Mode, which provides enhanced recognition capabilities for complex tasks.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </main>

      <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© 2026 Offline OCR. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


