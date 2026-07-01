const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const neonClasses = ' transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#6ee7b7] hover:shadow-[0_0_15px_rgba(110,231,183,0.5)] active:scale-95';
const neonClassesText = neonClasses + ' hover:text-[#6ee7b7]';

// A helper to strip neon classes
function removeNeon(str) {
    let classes = str.split(/\s+/);
    classes = classes.filter(c => !c.includes('shadow-[0_0_15px_rgba(110,231,183,0.5)]') && 
                                  !c.includes('border-[#6ee7b7]') && 
                                  c !== 'hover:-translate-y-1' &&
                                  c !== 'active:scale-95' &&
                                  c !== 'hover:text-[#6ee7b7]');
    return classes.join(' ');
}

// Another helper to add neon classes
function addNeon(str) {
    // first remove old if any to avoid duplicates
    let cleaned = removeNeon(str);
    return cleaned + neonClasses;
}

// 1. Remove from brand logo
html = html.replace(/(<a[^>]*id="brand-logo"[^>]*class=")([^"]*)(")/g, (match, p1, p2, p3) => {
    return p1 + removeNeon(p2) + p3;
});

// 2. Remove from footer icons
['footer-linkedin', 'footer-github', 'footer-instagram'].forEach(id => {
    let regex = new RegExp(`(<a[^>]*id="${id}"[^>]*class=")([^"]*)(")`, 'g');
    html = html.replace(regex, (match, p1, p2, p3) => {
        return p1 + removeNeon(p2) + p3;
    });
});

// 3. Remove from timeline items
html = html.replace(/(<li[^>]*class=")([^"]*timeline-item[^"]*)(")/g, (match, p1, p2, p3) => {
    return p1 + removeNeon(p2) + p3;
});

// 4. Add neon to the 3 boxes under the profile image
// In the previous update, we added it to "a" tags with mailto or project-link. The 3 boxes are mailto, github, linkedin in the About section.
// Let's identify them. They are in the About section, inside a flex container.
html = html.replace(/(<a[^>]*href="mailto:[^"]*"[^>]*class=")([^"]*)(")/g, (match, p1, p2, p3) => {
    return p1 + addNeon(p2) + p3;
});
// For the Github and LinkedIn boxes in the About section (they might not have an id, but they have href to github/linkedin and are flex items or have a specific structure)
// Let's use a regex to target the Github and LinkedIn links that contain "text-sm md:text-base font-medium" or similar
html = html.replace(/(<a[^>]*href="https:\/\/github\.com\/ahmaddzakis\/"[^>]*class=")([^"]*)(")/g, (match, p1, p2, p3) => {
    // Only apply if it's the one in the About section, not footer
    if (p1.includes('id="footer-github"')) return match; // skip footer
    return p1 + addNeon(p2) + p3;
});
html = html.replace(/(<a[^>]*href="https:\/\/www\.linkedin\.com\/in\/ahmaddzakis\/"[^>]*class=")([^"]*)(")/g, (match, p1, p2, p3) => {
    if (p1.includes('id="footer-linkedin"')) return match; // skip footer
    return p1 + addNeon(p2) + p3;
});

// 5. Add neon to the image (flip card). 
// The flip card container has 'group' and 'perspective-1000'. The inner 'relative w-full h-full' has transition.
// The user wants it on the "gambar" (image card). 
// Let's target the outer div of the flip card or the inner card itself.
// The flip card has class `relative w-full h-full transition-transform duration-1000 [transform-style:preserve-3d]`
// Or maybe the outer container `<div class="relative w-full aspect-[4/5] perspective-1000 group cursor-pointer" id="bio-card">`
// Let's add it to the outer container. Wait, if it has 3D transform, shadow might act weird, but `hover:shadow-neon hover:border` on a rounded container is fine.
// The front face is `<div class="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden ...">`
// Let's add the neon classes to the flip card container (the one with perspective-1000). But it doesn't have border or bg. 
// It's better to add it to the `front` and `back` faces or the container that triggers it. 
// I will target the container `<div class="relative w-full aspect-[4/5] perspective-1000 group">` or similar
html = html.replace(/(<div[^>]*class="[^"]*perspective-1000[^"]*group[^"]*)(")/g, (match, p1, p2) => {
    return p1 + addNeon("") + p2;
});

fs.writeFileSync('index.html', html);
console.log('fix-neon complete');
