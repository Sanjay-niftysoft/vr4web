const fs = require('fs');
const path = require('path');

const files = [
  'c:/Users/welcome/Desktop/vr4web/src/shared/components/Home.jsx',
  'c:/Users/welcome/Desktop/vr4web/src/components/Client.jsx',
  'c:/Users/welcome/Desktop/vr4web/src/components/SectorsPage.jsx',
  'c:/Users/welcome/Desktop/vr4web/src/components/StereoVRView.jsx'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(/text-slate-600/g, 'text-black font-medium');
    content = content.replace(/text-slate-500/g, 'text-black font-medium');
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated ${file}`);
  }
}
