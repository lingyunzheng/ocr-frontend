'use client';

export default function TermsPage() {
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
          Terms of Service
        </h1>

        <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-lg p-8 space-y-8">
          
          <section>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Please read these Terms of Service (&quot;Terms&quot;) carefully before using the Offline OCR application (io.github.lingyunzheng.ocr) operated by us (the &quot;Service&quot;).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. Acceptance of Terms & Age Requirements
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              By accessing or using the Service, you agree to be bound by these Terms.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong>Usage Age:</strong> You must be at least 13 years old to use the basic features of this Service.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Purchase Age:</strong> To purchase a &quot;Pro&quot; or &quot;Plus&quot; subscription, you must be at least 18 years old (or the age of legal majority in your jurisdiction), or have the explicit permission of a parent or legal guardian to make the purchase through your respective Google Play account. If you disagree with any part of the terms or do not meet these age requirements, you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. Academic Integrity & Appropriate Use
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The Service is designed as a study aid to assist you in understanding mathematical concepts and extracting text.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>No Cheating:</strong> You agree NOT to use the Service in a manner that violates any academic integrity policies, anti-cheating rules, or regulations of your educational institution (e.g., using it during closed-book exams). The Service is designed to aid your understanding, not to circumvent the learning process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. AI Accuracy Disclaimer
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our advanced mathematical solving features are powered by Artificial Intelligence (AI).
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong>No Guarantee of Accuracy:</strong> While we strive for high accuracy, we do not guarantee that the solutions, steps, or extracted texts are 100% correct, complete, or error-free.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>You should always use the Service as a reference and manually verify critical results.</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We shall not be held liable for any direct or indirect consequences (including but not limited to academic penalties, failed exams, or calculation errors) resulting from your reliance on the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Subscriptions, Auto-Renewal, and Refunds
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Some parts of the Service are billed on a subscription or pay-as-you-go basis (e.g., &quot;Plus&quot; or &quot;Pro&quot; plans). We offer two billing channels depending on where you make your purchase:
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  4.1 Web Subscriptions (Authorized Reseller)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Purchases made through our official website are conducted and processed by our online reseller, <a href="https://www.lemonsqueezy.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">Lemon Squeezy</a>, who is the Merchant of Record for all web transactions. Lemon Squeezy handles billing, automatic renewals, sales tax compliance, and web-related refund requests. Web subscriptions automatically renew unless canceled before the end of the current billing cycle.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  4.2 Mobile App Subscriptions (Google Play)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Subscriptions initiated inside the Android application are handled entirely through your Google Play account. Mobile subscriptions automatically renew unless canceled at least 24 hours before the end of the current period.
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Cancellations &amp; Refunds:</strong> You can manage or cancel your subscriptions at any time through your respective account dashboards (Lemon Squeezy&apos;s customer portal for web orders, or Google Play Store settings for mobile orders). Refunds are handled by the respective merchant of record (Lemon Squeezy or Google) in accordance with our Refund Policy. No refunds or compensations will be issued for accounts terminated due to a violation of our Fair Use or Prohibited Conduct policies (see Section 5).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Fair Use, Prohibited Conduct & Account Termination
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our &quot;Cloud Mode&quot; features rely on integrations with third-party AI APIs. We cannot guarantee 100% uninterrupted uptime. Temporary outages or degraded performance of these APIs may affect the App&apos;s functionality and do not constitute a breach of our service obligations.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong>Prohibited Conduct:</strong> To ensure high-quality service, all subscriptions and virtual credits (tokens) are subject to a Fair Use Policy. You strictly agree NOT to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4 pl-4">
              <li>Use automated scripts, bots, or emulators to access the Service.</li>
              <li>Reverse engineer, bypass, or exploit our APIs.</li>
              <li>Artificially manipulate the referral/invite system (e.g., creating fake accounts to farm reward tokens).</li>
              <li>Engage in any fraudulent activity or abuse of the billing system.</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Termination & Forfeiture of Assets:</strong> We reserve the right to immediately suspend or permanently terminate your account without prior notice if we determine, in our sole discretion, that you have violated any of these Terms. In the event of account termination due to a violation, your access to the Service will be revoked immediately. Any remaining subscription duration, unused virtual credits (tokens), and accumulated rewards will be permanently forfeited. You will not be entitled to any form of compensation, transfer, or refund for forfeited assets.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Limitation of Liability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed uppercase">
              THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. WE EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR IN ANY WAY CONNECTED WITH YOUR USE OF THE SERVICE.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. Governing Law & Dispute Resolution
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These Terms shall be governed and construed in accordance with the laws of the People&apos;s Republic of China, without regard to its conflict of law provisions. Any dispute arising from these Terms shall be subject to the exclusive jurisdiction of the competent courts in the People&apos;s Republic of China.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              8. Changes to These Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will notify you of any changes by posting the new Terms on this page. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              9. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For any questions, concerns, or reports regarding these Terms, please contact us at:{' '}
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
