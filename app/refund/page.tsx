'use client';

export default function RefundPolicyPage() {
  const lastUpdated = 'Last Updated: May 19, 2026';

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
          Refund Policy
        </h1>

        <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-lg p-8 space-y-8">
          <section>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Thank you for choosing Offline OCR. We want to ensure you have a satisfying experience with our products. This Refund Policy describes the terms and conditions for cancelations and refunds for purchases made through our Google Play application and our authorized online merchant of record.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. Merchant of Record Disclaimer
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our web order process is conducted by our online reseller, <strong><a href="https://www.lemonsqueezy.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">Lemon Squeezy</a></strong>. <strong>Lemon Squeezy is the Merchant of Record</strong> for all our web orders.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Lemon Squeezy provides customer service inquiries and handles returns. If you have any billing or transaction-related concerns for web orders, please contact Lemon Squeezy directly via their support portals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. Web Subscriptions (Authorized Reseller)
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We offer digital subscription services for our optional &quot;Plus&quot; and &quot;Pro&quot; plans. By purchasing our Plus or Pro web subscriptions, you acknowledge that because digital services are provisioned instantly, refunds are generally not provided for partially used or unused billing cycles.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  UK & European Union Consumer Rights
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  If you reside in the United Kingdom or European Union, you are entitled to a 14-day statutory cooling-off period to cancel your digital subscription purchase and receive a full refund, provided you have not actively initiated cloud-mode text or formula recognition tasks during those 14 days. Once you use the premium credit or initiate a cloud request, you explicitly agree that you waive your right of withdrawal.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Quality & Performance Issues
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  If you encounter technical issues or poor recognition quality with our Plus or Pro service, please contact us at <a href="mailto:offlineocr.service@outlook.com" className="text-purple-600 dark:text-purple-400 hover:underline">offlineocr.service@outlook.com</a> within 7 days of the transaction. If we cannot resolve the issue or provide adequate technical support, we will instruct the reseller to issue a full or prorated refund for your subscription.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. Mobile App Subscriptions (Google Play)
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Subscribing via the Android app is processed entirely through Google Play Store billing.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4 pl-4">
              <li><strong>Self-Service Cancelation:</strong> You can manage or cancel your mobile subscriptions at any time through Google Play account settings.</li>
              <li><strong>Google Refunds:</strong> Because Google Play handles mobile billing transactions, they are responsible for all refunds. You can request a refund directly from Google Play support according to their guidelines (typically within 48 hours of purchase).</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If Google rejects your request and you believe you have a valid claim due to technical errors, please contact us with your Google Play order number (usually starting with GPA.) for further assistance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Subscription Cancelation & Account Termination
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              You may cancel your subscription at any time. Upon cancelation, you will continue to have access to the Plus or Pro premium features until the end of your current billing cycle, after which your account will revert to the free &quot;Basic Mode.&quot;
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Account Violations:</strong> No refunds will be issued for accounts terminated due to a violation of our Fair Use, Prohibited Conduct, API abuse, or malicious manipulation of referral schemes as detailed in our Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For any questions regarding refunds, cancellations, or quality verification, please reach out to us at:{' '}
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
