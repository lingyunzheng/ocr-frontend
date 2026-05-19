'use client';

export default function PrivacyPage() {
  const lastUpdated = 'Last Updated: May 2, 2026';

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
              This privacy policy applies to the Offline OCR app (io.github.lingyunzheng.ocr). We respect your privacy and are deeply committed to protecting it. To provide you with both maximum privacy and advanced recognition capabilities, our application operates using a dual-engine architecture featuring a secure local offline mode and an advanced, opt-in cloud mode.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. Permissions We Request & Data Handling
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Camera (android.permission.CAMERA)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  <strong>Purpose:</strong> Used solely to capture images of documents or math formulas for recognition and extraction.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  <strong>On-Device AI Mode (Default):</strong> When using our local AI models, all Optical Character Recognition (OCR) processing—including complex math formula parsing—is performed strictly and entirely on your device&apos;s hardware. Your images, documents, and recognized text never leave your phone. We do not upload any data to any server, guaranteeing 100% privacy.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>Cloud Assist Mode (Optional):</strong> To ensure users with standard-performance devices can still achieve the highest level of recognition accuracy without taxing their device&apos;s hardware, we offer an optional Cloud AI service. If you explicitly select this mode for enhanced results, the selected image is temporarily transmitted via a secure, encrypted connection to our AI processing servers. We do not store, sell, or use your images or text to train any models. All data is permanently and immediately deleted from the server once the recognition result is returned.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Internet (android.permission.INTERNET)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>Purpose:</strong> 1. To securely communicate with our Cloud AI servers ONLY when you actively choose to use the advanced Cloud recognition mode. 2. To process user authentication and subscription statuses securely. 3. To display advertisements provided by Google AdMob to support the ongoing development of this app.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Usage Data & Fraud Prevention
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  For users utilizing the subscription or Cloud features, we temporarily log basic usage metrics (such as request timestamps and token consumption) strictly for the purposes of quota management, billing reconciliation, and enforcing our Fair Use policy. We analyze this metadata to detect and block malicious activities, automated bots, and abuse of our reward systems.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. Third-Party Services & Data Collection
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We use trusted third-party services to enhance app functionality and support development:
            </p>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li>
                <strong>Secure Cloud Processing Engine:</strong> When you use the &quot;Cloud Mode&quot;, your selected image is transmitted via enterprise-grade, encrypted HTTPS connections. This process is routed through global edge networks (such as Cloudflare) to ensure maximum speed and security. We explicitly guarantee that your images are NEVER stored on our servers, NEVER sold, and NEVER used to train any machine learning models.
              </li>
              <li>
                <strong>Web Payment Processing (Paddle.com):</strong> For users who purchase subscriptions or credits through our website, payment processing is handled securely by our online reseller and Merchant of Record, Paddle.com. Paddle collects billing details (such as email, billing address, and payment card information) necessary to process the transaction and comply with global tax regulations. We do not store or have access to your full credit card numbers; we only receive anonymous transaction statuses and purchase tokens linked to your account ID to provision your Plus or Pro features. You can view Paddle&apos;s privacy practices on their official website.
              </li>
              <li>
                <strong>Google Play Billing:</strong> We use Google Play to process &quot;Pro&quot; or &quot;Plus&quot; subscriptions securely. We do not collect, process, or have access to your credit card information. We only store an anonymous purchase token linked to your account ID to verify your active subscription status across devices.
              </li>
              <li>
                <strong>Google Sign-In / Auth:</strong> To allow you to seamlessly restore your Premium subscriptions across multiple devices, we use Google authentication. This only collects basic account identifiers necessary for secure login.
              </li>
              <li>
                <strong>Firebase App Check (Device Integrity):</strong> To protect our backend infrastructure from abuse, bots, and unauthorized access, we utilize Firebase App Check. This service collects basic device and network information to verify that requests are coming from a legitimate, unmodified version of our application on a physical device.
              </li>
              <li>
                <strong>Google AdMob:</strong> This service may collect and use data such as your Device ID, Advertising ID, and IP address to provide personalized or non-personalized advertising, analytics, and fraud prevention. For more information, please visit: Google Privacy & Terms.
              </li>
              <li>
                <strong>Google API Usage Policy:</strong> Our application&apos;s use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements. We do not use user data obtained through Google APIs to develop, improve, or train generalized AI and/or ML models.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Children&apos;s Privacy (COPPA)
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These Services are not directed at individuals under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are under 13, please do not use the Cloud Assist Mode or the subscription features of this App. If we discover that a child under 13 has provided us with personal information via the cloud features, we will immediately delete this from our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Data Retention & Account Deletion
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              You may request the deletion of your account and associated data at any time via the in-app settings. Upon a successful deletion request, your usage history and account data will be permanently erased from our active databases.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Security Exception:</strong> Please note that if an account is suspended or terminated due to a violation of our Terms of Service (such as fraudulent billing or API abuse), we reserve the right to securely retain minimal, hashed identifiers (such as a generic user ID or device token) on a permanent blocklist. This is strictly necessary to protect our platform and prevent the offending user from circumventing the ban.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have any questions, concerns, or requests regarding this privacy policy or your data, please contact us directly at:{' '}
              <a href="mailto:offlineocr.service@outlook.com" className="text-purple-600 hover:text-purple-700 underline">
                offlineocr.service@outlook.com
              </a>
            </p>
          </section>

          <div className="border-t border-gray-200 dark:border-slate-600 pt-8 text-sm text-gray-600 dark:text-gray-400">
            <p>{lastUpdated}</p>
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
