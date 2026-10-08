import re
import os

base_dir = r"c:\Users\welcome\Desktop\vr4web\src\shared\components"
sections_dir = os.path.join(base_dir, "home-sections")

components = [
    "AboutUs.jsx",
    "OurServices.jsx",
    "WhyChooseUs.jsx",
    "IndustriesWeServe.jsx",
    "OurWorkProcess.jsx",
    "ProjectsCaseStudies.jsx",
    "FAQSection.jsx",
    "CallToAction.jsx"
]

all_imports = set()
all_code = []

# Gather all code and imports from the components
for comp in components:
    with open(os.path.join(sections_dir, comp), "r", encoding="utf-8") as f:
        content = f.read()
        
    lines = content.split("\n")
    code_lines = []
    
    for line in lines:
        if line.startswith("import "):
            all_imports.add(line)
        elif line.startswith("export default function"):
            # rename "export default function" to just "function" so it can be defined in the same file
            code_lines.append(line.replace("export default function", "function"))
        else:
            code_lines.append(line)
            
    all_code.append("\n".join(code_lines).strip())

# Read Home.jsx
with open(os.path.join(base_dir, "Home.jsx"), "r", encoding="utf-8") as f:
    home_content = f.read()

# Remove the custom local imports from Home.jsx
home_content = re.sub(r"import [A-Za-z]+ from '\./home-sections/[A-Za-z]+';\n?", "", home_content)

# Add existing Home.jsx imports to the set
for line in home_content.split("\n"):
    if line.startswith("import "):
        all_imports.add(line)

# Remove all imports from home_content
home_content = re.sub(r"import .*\n?", "", home_content).lstrip()

# Combine lucide-react imports
lucide_icons = set()
other_imports = set()

for imp in all_imports:
    if "lucide-react" in imp:
        match = re.search(r"import \{(.*?)\} from 'lucide-react'", imp)
        if match:
            icons = [i.strip() for i in match.group(1).split(",")]
            lucide_icons.update(icons)
    elif "framer-motion" in imp:
        match = re.search(r"import \{(.*?)\} from 'framer-motion'", imp)
        if match:
            if "motion" in imp and "AnimatePresence" in imp:
                pass # Handled manually later
            # Just ignore framer-motion here, we'll manually add it
    elif "react-router-dom" in imp:
        # ignore, manually add
        pass
    elif "react" in imp and "lucide" not in imp:
        # ignore, manually add
        pass

# Construct final file content
final_imports = f"""import {{ useState, useEffect }} from 'react';
import {{ motion, AnimatePresence }} from 'framer-motion';
import {{ Link }} from 'react-router-dom';
import {{ {', '.join(sorted(lucide_icons))} }} from 'lucide-react';
"""

final_content = final_imports + "\n\n" + "\n\n".join(all_code) + "\n\n" + home_content

with open(os.path.join(base_dir, "Home.jsx"), "w", encoding="utf-8") as f:
    f.write(final_content)

print("Merged all components into Home.jsx")
