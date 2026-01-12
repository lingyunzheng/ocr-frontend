'use client';

export default function PrivacyPage() {
  const privacyContent = {
    intro: `Offline OCR ("we", "us", "our", or "Company") operates the OCR text recognition service available on both web and mobile platforms. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.`,
    
    // 新增：平台说明
    platformNotice: `Please note: Our service is available on two platforms with different processing methods:
    • Web Version: Images are uploaded to our servers for processing
    • Mobile App: Images are processed entirely on your device (offline)
    
    This policy applies to both versions. Please review the section below that corresponds to the platform you are using.`,

    // 网页版
    webVersion: `2.1 Web Version (Website)

When you use our web-based OCR service:
    • Your images ARE uploaded to our servers for processing
    • Your images are processed by our backend API
    • Uploaded images are deleted within 24 hours after processing
    • The recognized text is not stored unless you explicitly save it
    • Your IP address and basic usage data may be logged for security and analytics purposes`,

    // App版
    appVersion: `2.2 Mobile App Version

When you use our mobile app:
    • Images are processed entirely on your device
    • Images are NEVER uploaded to our servers
    • Images are NOT stored after processing
    • The recognized text remains only on your device
    • No personal data or images leave your device`,

    usageData: `We may collect information about how you interact with our Service ("Usage Data"). This may include:
    • Browser type and version (web only)
    • IP address (anonymous, web only)
    • Pages visited and time spent
    • App version and device type
    • Approximate location (optional, with your permission)
    This data is collected for service improvement, analytics, and security purposes only.`,

    dataRetention: `Data Retention Policy:
    • Uploaded images (web): Automatically deleted within 24 hours
    • Processing logs (web): Retained for 7 days for debugging purposes
    • Usage analytics: Retained for 90 days, then anonymized
    • User account data: Retained as long as your account is active`,

    security: `For web users: We use industry-standard SSL/TLS encryption for data transmission. However, no method of transmission over the Internet is 100% secure.

For app users: All processing happens locally on your device, providing maximum security.`,

    effectiveDate: 'Effective Date: January 1, 2026',
    lastUpdated: 'Last Updated: January 12, 2026',
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
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Privacy Policy
        </h1>

        <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {privacyContent.intro}
            </p>
          </section>

          {/* 新增：平台说明 */}
          <section className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 p-6 rounded">
            <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
              ⚠️ Important Platform Notice
            </h2>
            <p className="text-blue-800 dark:text-blue-200 whitespace-pre-line leading-relaxed">
              {privacyContent.platformNotice}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. Information Collection and Use
            </h2>
            <div className="space-y-6">
              {/* 网页版 */}
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  🌐 {privacyContent.webVersion.split('\n')[0]}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {privacyContent.webVersion.split('\n').slice(2).join('\n')}
                </p>
              </div>

              {/* App版 */}
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  📱 {privacyContent.appVersion.split('\n')[0]}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {privacyContent.appVersion.split('\n').slice(2).join('\n')}
                </p>
              </div>

              {/* 使用数据 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  2.3 Usage Data
                </h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {privacyContent.usageData}
                </p>
              </div>

              {/* 数据保留 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  2.4 Data Retention
                </h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {privacyContent.dataRetention}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. Privacy and Security
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                <strong>Web Version Security:</strong> {privacyContent.security.split('\n')[0]}
              </p>
              <p>
                <strong>Mobile App Security:</strong> {privacyContent.security.split('\n')[1]}
              </p>
              <p>
                <strong>HTTPS Encryption:</strong> All data transmitted to our website is
                encrypted using SSL/TLS protocols.
              </p>
              <p>
                <strong>No Third-Party Sharing:</strong> We do not sell, trade, or share your
                personal information with third parties.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Cookies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our web service uses Cookies to enhance user experience. You can instruct your browser
              to refuse all Cookies or to indicate when a Cookie is being sent. The mobile app does
              not use Cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the effective date at the
              bottom of this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please{' '}
              <a href="/contact" className="text-purple-600 hover:text-purple-700 underline">
                contact us
              </a>
              .
            </p>
          </section>

          <div className="border-t border-gray-200 dark:border-slate-600 pt-8 text-sm text-gray-600 dark:text-gray-400">
            <p>{privacyContent.effectiveDate}</p>
            <p>{privacyContent.lastUpdated}</p>
          </div>
        </div>

        <div className="mt-8 text-center">
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


