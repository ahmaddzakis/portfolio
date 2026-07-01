const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const btnClassStr = 'transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#6ee7b7] hover:shadow-[0_0_15px_rgba(110,231,183,0.5)] active:scale-95 hover:text-[#6ee7b7]';
const cardClassStr = 'transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#6ee7b7] hover:shadow-[0_0_15px_rgba(110,231,183,0.5)] active:scale-95';
const smallClassStr = 'transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#6ee7b7] hover:shadow-[0_0_15px_rgba(110,231,183,0.5)] active:scale-95 hover:text-[#6ee7b7]';

const classesToRemove = [
    /^hover:shadow-\[[^\]]+\]$/,
    /^hover:border-\[#[a-zA-Z0-9]+\]$/,
    /^hover:text-\[#[a-zA-Z0-9]+\]$/,
    /^active:scale-\d+$/,
    /^transition-[a-zA-Z]+$/,
    /^duration-\d+$/,
    /^ease-[a-z-]+$/,
    /^hover:-translate-y-\d+$/
];

function updateClassAttr(classAttr, newClassesStr) {
    // Extract the content of class="content"
    const match = classAttr.match(/class=["'](.*?)["']/);
    if (!match) return classAttr;
    
    let currentClasses = match[1].split(/\s+/).filter(Boolean);
    
    // Filter out old classes
    currentClasses = currentClasses.filter(cls => {
        for (let regex of classesToRemove) {
            if (regex.test(cls)) return false;
        }
        return true;
    });
    
    // Add new classes
    const newClasses = newClassesStr.split(/\s+/).filter(Boolean);
    currentClasses.push(...newClasses);
    
    // Remove duplicates just in case
    currentClasses = [...new Set(currentClasses)];
    
    return `class="${currentClasses.join(' ')}"`;
}

// Map of regex to find tags -> which class string to apply
const replacements = [
    // 1. Buttons
    { pattern: /(<button[^>]*id="langToggleBtn"[^>]*class=["'][^"']+["'])/g, classStr: btnClassStr },
    { pattern: /(<button[^>]*class=["'][^"']*cv-modal-trigger[^"']+["'])/g, classStr: btnClassStr },
    { pattern: /(<button[^>]*id="hamburger-btn"[^>]*class=["'][^"']+["'])/g, classStr: btnClassStr },
    { pattern: /(<a[^>]*id="btn-view-projects"[^>]*class=["'][^"']+["'])/g, classStr: btnClassStr },
    { pattern: /(<a[^>]*class=["'][^"']*project-link[^"']+["'])/g, classStr: btnClassStr },
    { pattern: /(<button[^>]*type="submit"[^>]*class=["'][^"']+["'])/g, classStr: btnClassStr },
    { pattern: /(<a[^>]*href="mailto:[^"]*"[^>]*class=["'][^"']+["'])/g, classStr: btnClassStr },
    { pattern: /(<button[^>]*id="closeCvBtn"[^>]*class=["'][^"']+["'])/g, classStr: btnClassStr },
    { pattern: /(<button[^>]*class=["'][^"']*cv-modal-trigger[^"']+["'])/g, classStr: btnClassStr },

    // 2. Cards
    { pattern: /(<article[^>]*class=["'][^"']*project-card[^"']+["'])/g, classStr: cardClassStr },
    { pattern: /(<div[^>]*class=["'][^"']*skill-card[^"']+["'])/g, classStr: cardClassStr },
    { pattern: /(<li[^>]*class=["'][^"']*timeline-item[^"']+["'])/g, classStr: cardClassStr },

    // 3. Small Elements
    { pattern: /(<button[^>]*class=["'][^"']*skill-badge[^"']+["'])/g, classStr: smallClassStr },
    { pattern: /(<div[^>]*class=["'][^"']*soft-skill-badge[^"']+["'])/g, classStr: smallClassStr },
    { pattern: /(<a[^>]*id="footer-linkedin"[^>]*class=["'][^"']+["'])/g, classStr: smallClassStr },
    { pattern: /(<a[^>]*id="footer-github"[^>]*class=["'][^"']+["'])/g, classStr: smallClassStr },
    { pattern: /(<a[^>]*id="footer-instagram"[^>]*class=["'][^"']+["'])/g, classStr: smallClassStr },
    { pattern: /(<a[^>]*id="brand-logo"[^>]*class=["'][^"']+["'])/g, classStr: smallClassStr },
    // wait, cv preview icon in footer uses cv-modal-trigger, which is in Button category. That's fine.
];

for (let r of replacements) {
    html = html.replace(r.pattern, (match) => {
        // match is the entire tag opening up to the end of the class attribute
        // we need to replace the class="..." part inside it
        return match.replace(/class=["'](.*?)["']/, (classMatch) => {
            return updateClassAttr(classMatch, r.classStr);
        });
    });
}

fs.writeFileSync('index.html', html);
console.log('Update complete.');
