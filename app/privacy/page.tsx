export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>

        <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-lg p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              LocalAI OCR ("we", "us", "our", or "Company") operates the OCR text recognition service. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Information Collection and Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">2.1 Images You Upload</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  • Images are processed locally on your device<br />
                  • We do NOT upload your images to our servers<br />
                  • Images are NOT stored or retained after processing<br />
                  • All OCR processing happens in-device for maximum privacy
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">2.2 Usage Data</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We may collect information about how you interact with our Service ("Usage Data"). This may include:
                  <br />• Browser type and version<br />
                  • IP address (anonymous)<br />
                  • Pages visited and time spent<br />
                  • Device type and operating system<br />
                  This data is collected for service improvement and analytics purposes only.
                </p>
              </div>
            </div>
          </section>

          {/* Data Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Privacy & Security</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                <strong>Local Processing:</strong> All image recognition happens on your device. Images never leave your computer or phone.
              </p>
              <p>
                <strong>No Storage:</strong> Recognized text is not stored on our servers. Only you have access to your results.
              </p>
              <p>
                <strong>HTTPS Encryption:</strong> All data transmitted to our website is encrypted using SSL/TLS protocols.
              </p>
              <p>
                <strong>No Third-Party Sharing:</strong> We do not sell, trade, or share your personal information with third parties.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our Service uses Cookies to enhance user experience. You can instruct your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if you do not accept Cookies, you may not be able to use some portions of our Service.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the bottom of this page.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please <a href="/contact" className="text-purple-600 hover:text-purple-700 underline">contact us</a>.
            </p>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-slate-600 pt-8 text-sm text-gray-600 dark:text-gray-400">
            <p>Effective Date: January 1, 2025</p>
            <p>Last Updated: December 31, 2025</p>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
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
