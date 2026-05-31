const fs = require('fs');
let content = fs.readFileSync('F:/ocr-frontend/app/page.tsx', 'utf8');

// Update en
content = content.replace(
  /downloadAppCTA: 'Download App Now',/,
  "downloadAppCTA: 'Download App Now',\n    downloadWindowsCTA: 'Windows Desktop',"
);

// Update zh
content = content.replace(
  /downloadAppCTA: '立即下载 App',/,
  "downloadAppCTA: '立即下载 App',\n    downloadWindowsCTA: 'Windows 桌面版',"
);

// Update Top Banner Button
const topBannerOld = `<a
                  href="https://play.google.com/store/apps/details?id=io.github.lingyunzheng.ocr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95"
                >
                  📱 {t.downloadAppCTA}
                </a>`;
const topBannerNew = `<div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
                <a
                  href="https://play.google.com/store/apps/details?id=io.github.lingyunzheng.ocr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 text-center"
                >
                  📱 {t.downloadAppCTA}
                </a>
                <a
                  href="https://github.com/lingyunzheng/offline-ocr/releases/download/v0.1.0/offline-ocr_0.1.0_x64_en-US.msi"
                  className="whitespace-nowrap px-5 py-2 bg-slate-700 hover:bg-slate-800 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-2"
                >
                  💻 {t.downloadWindowsCTA}
                </a>
              </div>`;
content = content.replace(topBannerOld, topBannerNew);

// Update Bottom App Promotion Section
const bottomSectionOld = `<a
                href="https://play.google.com/store/apps/details?id=io.github.lingyunzheng.ocr"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2"
              >
                🤖 {t.googlePlay}
              </a>`;
const bottomSectionNew = `<a
                href="https://play.google.com/store/apps/details?id=io.github.lingyunzheng.ocr"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2"
              >
                🤖 {t.googlePlay}
              </a>
              <a
                href="https://github.com/lingyunzheng/offline-ocr/releases/download/v0.1.0/offline-ocr_0.1.0_x64_en-US.msi"
                className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2"
              >
                💻 {t.downloadWindowsCTA}
              </a>`;
content = content.replace(bottomSectionOld, bottomSectionNew);

fs.writeFileSync('F:/ocr-frontend/app/page.tsx', content);
console.log('Update complete.');
