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
              Permission is granted to temporarily access and use Offline OCR for personal,
              non-commercial transitory viewing only. This is the grant of a license, not a
              transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer, disassemble, or decode the software</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>{termsContent.license}</li>
              <li>Use automated systems (bots, crawlers) to access our service</li>
            </ul>

            {/* 新增：平台说明 */}
            <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 p-4 rounded-lg">
              <p className="text-blue-900 dark:text-blue-100 font-semibold mb-2">
                📌 Note on Platform Differences
              </p>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                The above restrictions apply equally to both our web version and mobile app. 
                However, please see Section 9 (User Content) for important differences regarding 
                image processing and storage between the two platforms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. Disclaimer
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {termsContent.disclaimer}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Limitations
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              In no event shall Offline OCR or its suppliers be liable for any damages (including,
              without limitation, damages for loss of data or profit, or due to business
              interruption) arising out of the use or inability to use the materials on Offline
              OCR, even if Offline OCR or an authorized representative has been notified orally or
              in writing of the possibility of such damage. This limitation applies to both the web
              and mobile app versions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Accuracy of Materials
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The materials appearing on Offline OCR could include technical, typographical, or
              photographic errors. Offline OCR does not warrant that any of the materials on
              Offline OCR are accurate, complete, or current. Offline OCR may make changes to the
              materials contained on its Service at any time without notice. However, Offline OCR
              does not commit to updating the materials.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              <strong>OCR Recognition Accuracy:</strong> The accuracy of OCR recognition results
              may vary depending on image quality, language, and complexity. We make no guarantees
              regarding the accuracy of recognized text. Users should verify the results
              independently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Links
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {termsContent.links}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. Modifications
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Offline OCR may revise these terms of service for its website at any time without
              notice. By using this website, you are agreeing to be bound by the then current
              version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              8. Governing Law
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws
              of the jurisdiction in which Offline OCR operates, and you irrevocably submit to the
              exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          {/* 完全改写第 9 条 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              9. User Content and Image Processing
            </h2>

            {/* 网页版 */}
            <div className="mb-6 pb-6 border-b border-gray-200 dark:border-slate-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                9.1 Web Version
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                When you upload images to our web-based OCR service:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                <li>
                  You grant Offline OCR a non-exclusive, royalty-free license to upload, process,
                  analyze, and temporarily store your images for the purpose of providing the OCR
                  Service.
                </li>
                <li>
                  Your images will be processed by our servers and will be automatically deleted
                  within 24 hours of upload.
                </li>
                <li>
                  The recognized text output will not be stored on our servers unless you
                  explicitly choose to save it in your account (if available).
                </li>
                <li>
                  Offline OCR may retain processing logs (but not original images) for up to 7
                  days for debugging, security, and service improvement purposes.
                </li>
                <li>
                  You represent and warrant that you own or have obtained all necessary rights to
                  upload and process the images you submit.
                </li>
              </ul>

              <div className="bg-orange-50 dark:bg-orange-900 border-l-4 border-orange-500 p-4 rounded-lg">
                <p className="text-orange-900 dark:text-orange-100 text-sm">
                  ⚠️ <strong>Important:</strong> By uploading to the web version, you acknowledge
                  that your images will be transmitted to and processed on our servers, and you
                  accept the privacy and security practices described in our Privacy Policy.
                </p>
              </div>
            </div>

            {/* App版 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                9.2 Mobile App Version
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                When you use our mobile app for offline OCR processing:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                <li>
                  All image processing occurs entirely on your mobile device. Images are never
                  transmitted to our servers.
                </li>
                <li>
                  You retain full ownership and control of all images and recognized text. Offline
                  OCR has no access to or use of your data.
                </li>
                <li>
                  Images and results are only stored on your device and are deleted when you
                  remove them from your device.
                </li>
                <li>
                  Offline OCR collects no data regarding your images, processing, or results on
                  the mobile app version.
                </li>
              </ul>

              <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-500 p-4 rounded-lg">
                <p className="text-green-900 dark:text-green-100 text-sm">
                  ✅ <strong>Privacy Notice:</strong> Your data is 100% private on the mobile app.
                  Nothing leaves your device.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              10. Contact Information
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


