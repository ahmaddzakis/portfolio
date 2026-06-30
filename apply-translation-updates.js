const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Bandung, West Java
html = html.replace(
  '<p class="text-sm text-gray-400">Bandung, West Java, Indonesia</p>',
  '<p class="text-sm text-gray-400">\n                      <span class="lang-en">Bandung, West Java, Indonesia</span>\n                      <span class="lang-id hidden">Bandung, Jawa Barat, Indonesia</span>\n                    </p>'
);

// 2. First Game Jam
html = html.replace(
  '<span class="inline-block mb-2 text-[0.58rem] font-bold tracking-[0.22em] uppercase text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 px-2.5 py-0.5 rounded-full"> First Game Jam </span>',
  '<span class="inline-block mb-2 text-[0.58rem] font-bold tracking-[0.22em] uppercase text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 px-2.5 py-0.5 rounded-full">\n                      <span class="lang-en">First Game Jam</span>\n                      <span class="lang-id hidden">Game Jam Pertama</span>\n                    </span>'
);

// 3. Production
html = html.replace(
  '<span class="inline-block mb-2 text-[0.58rem] font-bold tracking-[0.22em] uppercase text-neutral-500 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full"> Production </span>',
  '<span class="inline-block mb-2 text-[0.58rem] font-bold tracking-[0.22em] uppercase text-neutral-500 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">\n                      <span class="lang-en">Production</span>\n                      <span class="lang-id hidden">Produksi</span>\n                    </span>'
);

// 4. Update the Javascript for skill-badge levels (Beginner, Intermediate, Advance)
const oldJs = `
              // Toggle logika
              if (currentText === skillName) {
                textEl.innerText = skillLevel;
                // Atur warna
                textEl.classList.remove('text-blue-400', 'text-yellow-400', 'text-red-400');
                const level = skillLevel.toLowerCase();
                if (level.includes('beginner')) {
                  textEl.classList.add('text-blue-400');
                } else if (level.includes('intermediate')) {
                  textEl.classList.add('text-yellow-400');
                } else if (level.includes('advance')) {
                  textEl.classList.add('text-red-400');
                }
              } else {
`;

const newJs = `
              // Toggle logika
              if (currentText === skillName) {
                let displayLevel = skillLevel;
                const isEng = (typeof isEnglish !== 'undefined') ? isEnglish : (!document.querySelector('.lang-id').classList.contains('hidden') ? false : true);
                if (!isEng) {
                  if (skillLevel.toLowerCase().includes('beginner')) displayLevel = 'Pemula';
                  else if (skillLevel.toLowerCase().includes('intermediate')) displayLevel = 'Menengah';
                  else if (skillLevel.toLowerCase().includes('advance')) displayLevel = 'Mahir';
                }
                textEl.innerText = displayLevel;
                
                // Atur warna
                textEl.classList.remove('text-blue-400', 'text-yellow-400', 'text-red-400');
                const level = skillLevel.toLowerCase();
                if (level.includes('beginner')) {
                  textEl.classList.add('text-blue-400');
                } else if (level.includes('intermediate')) {
                  textEl.classList.add('text-yellow-400');
                } else if (level.includes('advance')) {
                  textEl.classList.add('text-red-400');
                }
              } else {
`;

// Also need to handle the case where the user toggles the language WHILE the badge is showing the level.
// Let's modify the global langBtn toggle listener to also update currently displayed levels.
const globalJsOld = `
        const messageInput = document.getElementById('message');
        if (messageInput) {
          messageInput.placeholder = isEnglish 
            ? 'Tell me briefly about your project or the service you need..' 
            : 'Ceritakan singkat tentang proyek atau layanan yang Anda butuhkan..';
        }
      });
`;

const globalJsNew = `
        const messageInput = document.getElementById('message');
        if (messageInput) {
          messageInput.placeholder = isEnglish 
            ? 'Tell me briefly about your project or the service you need..' 
            : 'Ceritakan singkat tentang proyek atau layanan yang Anda butuhkan..';
        }
        
        // Update skill badges if they are currently displaying levels
        document.querySelectorAll('.skill-badge').forEach(badge => {
          const textEl = badge.querySelector('.skill-text');
          const skillName = badge.getAttribute('data-name');
          const skillLevel = badge.getAttribute('data-level');
          
          // If it's currently showing a level (not the name)
          if (textEl.innerText !== skillName) {
            let displayLevel = skillLevel;
            if (!isEnglish) {
              if (skillLevel.toLowerCase().includes('beginner')) displayLevel = 'Pemula';
              else if (skillLevel.toLowerCase().includes('intermediate')) displayLevel = 'Menengah';
              else if (skillLevel.toLowerCase().includes('advance')) displayLevel = 'Mahir';
            }
            textEl.innerText = displayLevel;
          }
        });
      });
`;

html = html.replace(oldJs.trim(), newJs.trim());
html = html.replace(globalJsOld.trim(), globalJsNew.trim());

fs.writeFileSync('index.html', html);
console.log("Translation Update Complete");
