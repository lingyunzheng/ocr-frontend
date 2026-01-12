'use client';

export default function PrivacyPage() {
  const privacyContent = {
    intro: `Offline OCR ("we", "us", "our", or "Company") operates the OCR text recognition service available on both web and mobile platforms. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.`,
    
    // 新增：推荐使用 App
    appRecommendation: `⭐ RECOMMENDED: Mobile App Version

For the best privacy experience, we strongly recommend using our mobile app. The app provides complete offline processing with zero data transmission. Download it from Google Play for maximum privacy and offline functionality.`,

    // 网页版：明确说明是 Demo
    webVersion: `🌐 2.1 Web Version (Demo)

The web version is a DEMO designed for quick testing and evaluation purposes. It is NOT recommended for regular use or sensitive content.

When you use our web-based OCR demo:
    • Your images ARE uploaded to our servers for processing
    • Your images are processed by our backend API on Hugging Face
    • Uploaded images are deleted after processing (typically within minutes)
    • The recognized text is not stored on our servers
    • Your IP address and basic browser information may be logged for server monitoring
    
⚠️ IMPORTANT: For everyday use and to protect your privacy, please use the mobile app instead.`,

    // App版：完全本地
    appVersion: `📱 2.2 Mobile App Version (Recommended)

Our mobile app provides the ultimate privacy experience with complete offline processing.

When you use our mobile app:
    • ✅ Images are processed ENTIRELY on your device
    • ✅ Images are NEVER transmitted to our servers
    • ✅ Images are NOT stored after processing
    • ✅ The recognized text remains only on your device
    • ✅ No personal data, images, or processing information leaves your device
    • ✅ Works completely offline - no internet connection required
    
This is the recommended way to use Offline OCR for maximum privacy and security.`,

    usageData: `Usage Data Collection:
    • WEB DEMO ONLY: Basic server metrics (page views, request counts)
    • MOBILE APP: No data collection whatsoever
    
We do NOT collect:
    • Personal identification information
    • Location data
    • Device identifiers
    • Browsing history
    • Image content or metadata`,

    dataRetention: `Data Retention Policy:
    • Web demo uploaded images: Deleted after processing (within minutes)
    • Mobile app: No data retention (processing happens on your device)
    • Web demo server logs: Retained for up to 7 days for security monitoring only
    • Analytics: Minimal - only basic request counts, no personal data
    • User accounts: Not required - no account system`,

    security: `For web demo users: We use industry-standard SSL/TLS encryption for data transmission. However, for sensitive content, the mobile app is strongly recommended as it requires NO transmission.

For mobile app users: All processing happens locally on your device with military-grade security - no transmission means zero risk of interception.`,

    whyChooseApp: `Why Choose the Mobile App?

1. 🔒 ZERO Data Transmission
   - Complete offline processing
   - Nothing leaves your device

2. ⚡ Better Performance
   - Faster processing (no network delay)
   - Works without internet

3. 🎯 Full Features
   - Advanced OCR capabilities
   - More languages supported
   - Batch processing

4. 🆓 Same Price
   - Completely free
   - No hidden charges`,

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

          {/* 推荐使用 App */}
          <section className="bg-green-50 dark:bg-green-900 border-l-4 border-green-500 p-6 rounded">
            <p className="text-green-900 dark:text-green-100 whitespace-pre-line leading-relaxed font-semibold">
              {privacyContent.appRecommendation}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. Information Collection and Use
            </h2>
            <div className="space-y-6">
              {/* 网页版 Demo */}
              <div className="border-l-4 border-orange-500 pl-6 bg-orange-50 dark:bg-orange-900/20 p-4 rounded">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {privacyContent.webVersion.split('\n')[0]}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {privacyContent.webVersion.split('\n').slice(2).join('\n')}
                </p>
              </div>

              {/* App 版 - 推荐 */}
              <div className="border-l-4 border-green-500 pl-6 bg-green-50 dark:bg-green-900/20 p-4 rounded">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {privacyContent.appVersion.split('\n')[0]}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {privacyContent.appVersion.split('\n').slice(2).join('\n')}
                </p>
              </div>

              {/* 使用数据 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  2.3 Usage Data Collection
                </h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {privacyContent.usageData}
                </p>
              </div>

              {/* 数据保留 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  2.4 Data Retention Policy
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
                <strong>Web Demo Security:</strong> {privacyContent.security.split('\n')[0]}
              </p>
              <p>
                <strong>Mobile App Security:</strong> {privacyContent.security.split('\n')[1]}
              </p>
              <p>
                <strong>Best Practice:</strong> For any sensitive information, we strongly recommend
                using the offline mobile app where processing happens entirely on your device.
              </p>
            </div>
          </section>

          {/* 新增：为什么选择 App */}
          <section className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-l-4 border-purple-500 p-6 rounded">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Why Choose Our Mobile App?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
              {privacyContent.whyChooseApp}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Cookies and Tracking
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                <strong>Web Demo:</strong> May use essential cookies for basic functionality and
                server session management.
              </p>
              <p>
                <strong>Mobile App:</strong> No cookies, tracking, or data collection whatsoever.
              </p>
              <p>
                <strong>Third-Party Services:</strong> We do not use analytics services, marketing
                pixels, or any third-party tracking tools. No personal data is shared with third parties.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the effective date at the
              bottom of this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. Contact Us
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

        {/* 下载 App 的 CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">🔒 Maximum Privacy with Our App</h2>
          <p className="text-lg mb-6 opacity-90">
            Switch to our mobile app for complete offline processing. Your data stays on your device.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
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

