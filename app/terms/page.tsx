export default function TermsPage() {
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
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>

        <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-lg p-8 space-y-8">
          {/* Agreement */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              By accessing and using the LocalAI OCR service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          {/* Use License */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Use License</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Permission is granted to temporarily access and use LocalAI OCR for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer, disassemble, or decode the software</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              <li>Use automated systems (bots, crawlers) to access our service</li>
            </ul>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Disclaimer</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The materials on LocalAI OCR are provided on an 'as is' basis. LocalAI OCR makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          {/* Limitations */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Limitations</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              In no event shall LocalAI OCR or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on LocalAI OCR, even if LocalAI OCR or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          {/* Accuracy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Accuracy of Materials</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The materials appearing on LocalAI OCR could include technical, typographical, or photographic errors. LocalAI OCR does not warrant that any of the materials on LocalAI OCR are accurate, complete, or current. LocalAI OCR may make changes to the materials contained on its Service at any time without notice. However, LocalAI OCR does not commit to updating the materials.
            </p>
          </section>

          {/* Links */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Links</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              LocalAI OCR has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by LocalAI OCR of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Modifications</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              LocalAI OCR may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Governing Law</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which LocalAI OCR operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          {/* User Content */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. User Content</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              By submitting images to LocalAI OCR, you grant LocalAI OCR a non-exclusive, royalty-free, perpetual license to use, copy, modify, and distribute such images for the purpose of providing and improving the Service. You represent and warrant that you own or have the necessary rights to the images you submit.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Contact Information</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have any questions about these Terms of Service, please <a href="/contact" className="text-purple-600 hover:text-purple-700 underline">contact us</a>.
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
