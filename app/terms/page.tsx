'use client';

export default function TermsPage() {
  const termsContent = {
    license:
      'Transfer the materials to another person or "mirror" the materials on any other server',
    disclaimer:
      'The materials on Offline OCR are provided on an "as is" basis. Offline OCR makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
    links:
      "Offline OCR has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Offline OCR of the site. Use of any such linked website is at the user's own risk.",
    effectiveDate: 'Effective Date: January 1, 2026',
    lastUpdated: 'Last Updated: January 13, 2026',
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
          Terms of Service
        </h1>

        <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              By accessing and using the Offline OCR service (available on web and mobile
              platforms), you accept and agree to be bound by the terms and provision of this
              agreement. If you do not agree to abide by the above, please do not use this
              service. Please note that different terms may apply to the web version and mobile
              app version as described in the sections below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. Use License
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Permission is granted to access and use Offline OCR for personal, educational, and
              professional purposes. This is the grant of a license, not a transfer of title, and
              under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li>Modify or copy the software or materials for redistribution</li>
              <li>Resell, redistribute, or provide the service as your own</li>
              <li>Use the service for automated bulk processing or mass extraction</li>
              <li>Attempt to reverse engineer, disassemble, or decode the software</li>
            
  <li>Remove any copyright or other proprietary notations from the materials</li>

              <li>{termsContent.license}</li>
              <li>Use automated systems (bots, crawlers, scrapers) to access our service</li>
              <li>Attempt to harm, disrupt, or overload the service infrastructure</li>
            </ul>

            {/* 平台说明 */}
            <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 p-4 rounded-lg">
              <p className="text-blue-900 dark:text-blue-100 font-semibold mb-2">
                📌 Platform-Specific Terms
              </p>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                The restrictions in this section apply to both our web demo and mobile app. 
                However, the mobile app operates offline, so many restrictions are 
                technically unenforceable after download. Please see Section 9 for 
                data processing differences between platforms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. Disclaimer of Warranties
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {termsContent.disclaimer}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Limitation of Liability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              In no event shall Offline OCR or its suppliers be liable for any damages (including,
              without limitation, damages for loss of data or profit, or due to business
              interruption) arising out of the use or inability to use the materials on Offline
              OCR, even if Offline OCR or an authorized representative has been notified orally or
              in writing of the possibility of such damage. This limitation applies to both the web
              demo and mobile app versions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. OCR Accuracy Disclaimer
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The accuracy of OCR recognition results may vary significantly depending on:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mt-3 mb-4">
              <li>Image quality and resolution</li>
              <li>Language and character sets</li>
              <li>Text complexity and formatting</li>
              <li>Background noise and distortions</li>
              <li>Font types and sizes</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We make <strong>no guarantees</strong> regarding the accuracy of recognized text.
              Users should always verify the results independently before relying on them for
              important purposes. We are not liable for errors, omissions, or inaccuracies in OCR
              results.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Third-Party Links
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {termsContent.links}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. Modifications to Service
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Offline OCR may revise these terms of service at any time without notice. By using
              this website or app, you are agreeing to be bound by the then current version of
              these terms of service.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              We may also modify, suspend, or discontinue the web demo service at any time with or
              without notice. The mobile app is independent and will continue to function offline
              regardless of our service status.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              8. Service Availability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Web Demo:</strong> The web version is provided "as-is" without guarantees of
              continuous availability. We may:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Perform maintenance that temporarily suspends the service</li>
              <li>Modify or discontinue features with or without notice</li>
              <li>Limit service access due to abuse or technical issues</li>
              <li>Restrict usage if rate limits or resource limits are exceeded</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Mobile App:</strong> The mobile app does not depend on our servers and will
              continue working offline indefinitely, regardless of any changes to our web service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              9. Governing Law
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws
              of the jurisdiction in which Offline OCR operates, and you irrevocably submit to the
              exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          {/* 完全改写第 10 条 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              10. User Responsibilities and Content
            </h2>

            <div className="space-y-6">
              {/* 用户责任 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  10.1 Your Responsibilities
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  When using Offline OCR, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    Not upload illegal, harmful, or copyrighted content without proper authorization
                  </li>
                  <li>
                    Not use the service for illegal, unethical, or harmful purposes
                  </li>
                  <li>
                    Comply with all applicable laws, regulations, and third-party intellectual
                    property rights
                  </li>
                  <li>
                    Take full responsibility for the content you upload and process
                  </li>
                  <li>
                    Not attempt to abuse, exploit, or harm the service or other users
                  </li>
                </ul>
              </div>

              {/* 网页版 */}
              <div className="border-l-4 border-orange-500 pl-6 bg-orange-50 dark:bg-orange-900/20 p-4 rounded">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  🌐 10.2 Web Demo Version
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  When you upload images to our web-based OCR demo:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li>
                    You grant Offline OCR a temporary, non-exclusive license to process and analyze
                    your images
                  </li>
                  <li>
                    Your images will be processed and automatically deleted after processing
                    (typically within minutes)
                  </li>
                  <li>
                    The recognized text is not stored on our servers
                  </li>
                  <li>
                    Server logs may be retained for up to 7 days for security and debugging
                  </li>
                  <li>
                    You represent and warrant that you own or have proper rights to process the
                    images you submit
                  </li>
                </ul>

                <div className="bg-orange-100 dark:bg-orange-900/40 border border-orange-300 dark:border-orange-700 p-3 rounded mt-3">
                  <p className="text-orange-900 dark:text-orange-100 text-sm">
                    ⚠️ <strong>Important:</strong> The web demo is for testing only. For sensitive
                    content, use the offline mobile app where nothing leaves your device.
                  </p>
                </div>
              </div>

              {/* App 版 */}
              <div className="border-l-4 border-green-500 pl-6 bg-green-50 dark:bg-green-900/20 p-4 rounded">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  📱 10.3 Mobile App Version (Recommended)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  When you use our mobile app:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li>
                    All image processing occurs entirely on your device
                  </li>
                  <li>
                    Images are NEVER transmitted to our servers
                  </li>
                  <li>
                    You retain 100% ownership and control of all your data
                  </li>
                  <li>
                    Offline OCR has no access to, visibility into, or use of your images or results
                  </li>
                  <li>
                    Nothing is stored on our servers
                  </li>
                  <li>
                    The app works completely offline without internet connection
                  </li>
                </ul>

                <div className="bg-green-100 dark:bg-green-900/40 border border-green-300 dark:border-green-700 p-3 rounded mt-3">
                  <p className="text-green-900 dark:text-green-100 text-sm">
                    ✅ <strong>Privacy Guarantee:</strong> Your data is 100% private and secure on
                    the mobile app. Nothing leaves your device.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              11. Violations and Enforcement
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              If you violate these terms of service, we may:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Suspend or terminate your access to the web demo service</li>
              <li>Block your IP address from accessing our services</li>
              <li>Report illegal activity to appropriate authorities</li>
              <li>Pursue legal remedies as permitted by law</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm italic">
              Note: The mobile app is offline and independent. After download, we cannot enforce
              any restrictions on your local use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              12. Contact Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have any questions about these Terms of Service, please{' '}
              <a href="/contact" className="text-purple-600 hover:text-purple-700 underline">
                contact us
              </a>
              .
            </p>
          </section>

          <div className="border-t border-gray-200 dark:border-slate-600 pt-8 text-sm text-gray-600 dark:text-gray-400">
            <p>{termsContent.effectiveDate}</p>
            <p>{termsContent.lastUpdated}</p>
          </div>
        </div>

        {/* 推荐使用 App 的 CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">📱 Complete Offline Privacy</h2>
          <p className="text-lg mb-6 opacity-90">
            Use our mobile app for 100% offline OCR processing. No data transmission, no privacy concerns.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            📱 Download Mobile App
          </a>
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

