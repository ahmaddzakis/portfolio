const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add ID to the Javanese text span
html = html.replace(
  '<span class="text-xl md:text-2xl text-[#10B981] drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] font-medium tracking-widest ml-4 mb-0.5 opacity-90">ꦏꦸꦭ</span>',
  '<span id="javanese-text" class="cursor-pointer text-xl md:text-2xl text-[#10B981] drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] font-medium tracking-widest ml-4 mb-0.5 opacity-90 transition-all duration-200">ꦏꦸꦭ</span>'
);

// 2. Add the Scramble Javascript before </body>
const scrambleJs = `
      // Javanese Scramble Effect
      const javaText = document.getElementById('javanese-text');
      if (javaText) {
        const originalText = 'ꦏꦸꦭ';
        const chars = '!<>-_\\\\/[]{}—=+*^?#_';
        let scrambleInterval;
        let isScrambled = false;

        const scramble = () => {
          if (isScrambled) return;
          isScrambled = true;
          
          const isEng = (typeof isEnglish !== 'undefined') ? isEnglish : (!document.querySelector('.lang-id').classList.contains('hidden') ? false : true);
          let targetText = isEng ? 'I am' : 'Saya';

          let iterations = 0;
          clearInterval(scrambleInterval);
          scrambleInterval = setInterval(() => {
            javaText.innerText = targetText.split('').map((char, index) => {
              if (index < iterations) return targetText[index];
              return chars[Math.floor(Math.random() * chars.length)];
            }).join('');
            
            if (iterations >= targetText.length) {
              clearInterval(scrambleInterval);
            }
            iterations += 1 / 3;
          }, 30);
        };

        const unscramble = () => {
          if (!isScrambled) return;
          let iterations = 0;
          clearInterval(scrambleInterval);
          scrambleInterval = setInterval(() => {
            javaText.innerText = originalText.split('').map((char, index) => {
              if (index < iterations) return originalText[index];
              return chars[Math.floor(Math.random() * chars.length)];
            }).join('');
            
            if (iterations >= originalText.length) {
              clearInterval(scrambleInterval);
              isScrambled = false;
            }
            iterations += 1 / 3;
          }, 30);
        };

        javaText.addEventListener('mouseenter', scramble);
        javaText.addEventListener('mouseleave', unscramble);
        javaText.addEventListener('click', scramble);
      }
    </script>
`;

html = html.replace('</script>\n  </body>', scrambleJs + '\n  </body>');

fs.writeFileSync('index.html', html);
console.log('Scramble effect added');
