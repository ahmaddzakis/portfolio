const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix Project Cards
// Old: hover:border-[#10B981]/50 hover:-translate-y-1 transition-all duration-300 ease-out
// New: hover:border-[#6ee7b7] hover:shadow-[0_0_15px_rgba(110,231,183,0.5)] hover:-translate-y-1 transition-all duration-300 ease-in-out
html = html.replace(/hover:border-\[#10B981\]\/50 hover:-translate-y-1 transition-all duration-300 ease-out/g, 'hover:border-[#6ee7b7] hover:shadow-[0_0_15px_rgba(110,231,183,0.5)] hover:-translate-y-1 transition-all duration-300 ease-in-out');

// 2. Fix Hero CTA (btn-view-projects) and other similar links
// Old: hover:bg-[#059669] transition-colors duration-200
// New: hover:bg-[#059669] hover:border-[#6ee7b7] hover:shadow-[0_0_20px_rgba(110,231,183,0.7)] active:scale-95 transition-all duration-300 ease-in-out
html = html.replace(/hover:bg-\[#059669\] transition-colors duration-200/g, 'hover:bg-[#059669] hover:border-[#6ee7b7] hover:shadow-[0_0_20px_rgba(110,231,183,0.7)] active:scale-95 transition-all duration-300 ease-in-out');

// 3. Fix Project Links
// Old: hover:text-white transition-colors duration-200
// New: hover:text-white hover:shadow-[0_0_20px_rgba(110,231,183,0.7)] transition-all duration-300 ease-in-out
html = html.replace(/hover:text-white transition-colors duration-200/g, 'hover:text-white hover:shadow-[0_0_20px_rgba(110,231,183,0.7)] transition-all duration-300 ease-in-out');

// 4. Fix About Contact button
// Old: hover:bg-[#10B981] hover:text-white transition-all duration-300
// New: hover:bg-[#10B981] hover:text-white hover:border-[#6ee7b7] hover:shadow-[0_0_20px_rgba(110,231,183,0.7)] active:scale-95 transition-all duration-300 ease-in-out
html = html.replace(/hover:bg-\[#10B981\] hover:text-white transition-all duration-300"/g, 'hover:bg-[#10B981] hover:text-white hover:border-[#6ee7b7] hover:shadow-[0_0_20px_rgba(110,231,183,0.7)] active:scale-95 transition-all duration-300 ease-in-out"');

// 5. Fix footer icons
// Old: hover:text-emerald-500 transition-colors duration-300
// New: hover:text-emerald-500 hover:shadow-[0_0_20px_rgba(110,231,183,0.7)] transition-all duration-300 ease-in-out
html = html.replace(/hover:text-emerald-500 transition-colors duration-300/g, 'hover:text-emerald-500 hover:shadow-[0_0_20px_rgba(110,231,183,0.7)] transition-all duration-300 ease-in-out');

// 6. Fix brand logo
// Old: hover:opacity-80 transition-opacity duration-200
// New: hover:opacity-80 hover:shadow-[0_0_20px_rgba(110,231,183,0.7)] transition-all duration-300 ease-in-out
html = html.replace(/hover:opacity-80 transition-opacity duration-200/g, 'hover:opacity-80 hover:shadow-[0_0_20px_rgba(110,231,183,0.7)] transition-all duration-300 ease-in-out');

fs.writeFileSync('index.html', html);
console.log('Update Complete 2');
