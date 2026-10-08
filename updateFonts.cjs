const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    } else {
      if (file.endsWith('.jsx')) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

const files = walkSync('c:/Users/welcome/Desktop/vr4web/src');
let modifiedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  // Change font-poppins to just rely on global if it exists, or ensure it's removed.
  newContent = newContent.replace(/\bfont-inter\b/g, '');
  newContent = newContent.replace(/\bfont-poppins\b/g, '');

  // Typography for Navbar (Header.jsx)
  if (file.endsWith('Header.jsx')) {
    // Nav items are currently font-semibold or font-extrabold, change to font-medium (500)
    newContent = newContent.replace(/font-semibold/g, 'font-medium');
    newContent = newContent.replace(/font-extrabold/g, 'font-semibold');
  }

  // Highlighted Orange words -> 800 (font-extrabold)
  newContent = newContent.replace(/text-\[#F97316\]([^>]*?)font-bold/g, 'text-[#F97316]$1font-extrabold');
  newContent = newContent.replace(/text-\[#F97316\]([^>]*?)font-semibold/g, 'text-[#F97316]$1font-extrabold');
  newContent = newContent.replace(/text-\[#F97316\]([^>]*?)font-medium/g, 'text-[#F97316]$1font-extrabold');
  newContent = newContent.replace(/text-\[#F97316\]([^>]*?)font-normal/g, 'text-[#F97316]$1font-extrabold');

  // Small labels (About Us) -> 600 (font-semibold)
  newContent = newContent.replace(/uppercase([^>]*?)font-bold/g, 'uppercase$1font-semibold');
  newContent = newContent.replace(/uppercase([^>]*?)font-extrabold/g, 'uppercase$1font-semibold');

  // Headings h1, h2
  // We'll replace the long tailwind breakpoint sizing with clamp
  newContent = newContent.replace(/text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-\[44px\] 4xl:text-\[68px\]/g, 'text-[clamp(1.5rem,3.5vw,4.25rem)]');
  newContent = newContent.replace(/text-2xl xs:text-\[28px\] sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-\[68px\] 4xl:text-\[96px\]/g, 'text-[clamp(2rem,5.5vw,6rem)]');
  newContent = newContent.replace(/text-\[32px\] sm:text-\[40px\] lg:text-\[46px\] xl:text-\[52px\]/g, 'text-[clamp(2rem,4.5vw,3.5rem)]');
  
  // Clean up whitespace nowrap that forces overflow on mobile
  newContent = newContent.replace(/whitespace-nowrap/g, 'whitespace-normal sm:whitespace-nowrap');
  newContent = newContent.replace(/whitespace-normal sm:whitespace-normal sm:whitespace-nowrap/g, 'whitespace-normal sm:whitespace-nowrap'); // deduplicate

  // Change body text to 400 (font-normal)
  newContent = newContent.replace(/(<p[^>]*?)font-medium/g, '$1font-normal');
  newContent = newContent.replace(/(<p[^>]*?)font-semibold/g, '$1font-normal');

  // Buttons -> 600 (font-semibold)
  newContent = newContent.replace(/(<a[^>]*?)font-bold/g, '$1font-semibold');
  newContent = newContent.replace(/(<button[^>]*?)font-bold/g, '$1font-semibold');

  // Section headings -> 700-800 Bold
  // Usually h2 tags have font-bold or font-extrabold. If they have font-semibold, upgrade to font-bold.
  newContent = newContent.replace(/(<h2[^>]*?)font-semibold/g, '$1font-bold');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified ' + modifiedCount + ' files.');
