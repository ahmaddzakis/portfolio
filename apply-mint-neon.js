const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace old card neon with new card neon
// Note: handle multiple possible spaces, but since we inserted it exactly, we can match exactly.
const oldCardNeonRegex = /hover:shadow-\[0_0_15px_rgba\(34,211,238,0\.5\)\] transition-all duration-300 hover:-translate-y-1 hover:border-\[#22D3EE\] hover:border-cyan-400/g;
const newCardNeon = 'hover:border-[#6ee7b7] hover:shadow-[0_0_15px_rgba(110,231,183,0.5)] hover:-translate-y-1 transition-all duration-300 ease-in-out';
html = html.replace(oldCardNeonRegex, newCardNeon);

// Replace old button neon with new button neon
const oldBtnNeonRegex = /hover:shadow-\[0_0_20px_rgba\(168,85,247,0\.6\)\] active:scale-95 transition-all duration-200 hover:border-\[#A855F7\] hover:border-purple-400 hover:text-purple-400/g;
const newBtnNeon = 'hover:border-[#6ee7b7] hover:shadow-[0_0_20px_rgba(110,231,183,0.7)] active:scale-95 transition-all duration-300 ease-in-out';
html = html.replace(oldBtnNeonRegex, newBtnNeon);

// There might be some older transitions left if the user added them previously or I missed them. Let's make sure that's clean.
// Just doing the exact replacement is safer.

fs.writeFileSync('index.html', html);
console.log('Update Complete');
