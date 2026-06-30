const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const cardNeon = ' hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-[#22D3EE] hover:border-cyan-400';
const btnNeon = ' hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] active:scale-95 transition-all duration-200 hover:border-[#A855F7] hover:border-purple-400 hover:text-purple-400';

html = html.replace(/<button([^>]*)class="([^"]*)"/g, (match, p1, p2) => {
    if(p2.includes('shadow-[0_0_20px')) return match;
    let newClass = p2.replace(/transition-\w+/g, '').replace(/duration-\d+/g, '').replace(/hover:border-[^\s]+/g, '').replace(/hover:text-[^\s]+/g, '').replace(/active:scale-\d+/g, '').replace(/\s+/g, ' ');
    return '<button' + p1 + 'class="' + newClass + btnNeon + '"';
});

html = html.replace(/<a([^>]*)class="([^"]*inline-flex[^"]*bg-white\/5[^"]*)"/g, (match, p1, p2) => {
    if(p2.includes('shadow-[0_0_20px')) return match;
    let newClass = p2.replace(/transition-\w+/g, '').replace(/duration-\d+/g, '').replace(/hover:bg-[^\s]+/g, '').replace(/\s+/g, ' ');
    return '<a' + p1 + 'class="' + newClass + btnNeon + '"';
});

html = html.replace(/<div([^>]*)class="([^"]*project-card[^"]*)"/g, (match, p1, p2) => {
    if(p2.includes('shadow-[0_0_15px')) return match;
    let newClass = p2.replace(/transition-\w+/g, '').replace(/duration-\d+/g, '').replace(/hover:border-[^\s]+/g, '').replace(/hover:-translate-y-\d/g, '').replace(/\s+/g, ' ');
    return '<div' + p1 + 'class="' + newClass + cardNeon + '"';
});

html = html.replace(/<div([^>]*)class="([^"]*skill-card[^"]*)"/g, (match, p1, p2) => {
    if(p2.includes('shadow-[0_0_15px')) return match;
    let newClass = p2.replace(/transition-\w+/g, '').replace(/duration-\d+/g, '').replace(/hover:border-[^\s]+/g, '').replace(/\s+/g, ' ');
    return '<div' + p1 + 'class="' + newClass + cardNeon + '"';
});

fs.writeFileSync('index.html', html);
console.log('Done');
