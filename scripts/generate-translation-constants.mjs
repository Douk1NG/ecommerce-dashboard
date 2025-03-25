import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

function generateValues(json, section, prefix = '') {
  let output = '';
  
  for (const [key, value] of Object.entries(json)) {
    const fullKey = prefix ? `${section}.${prefix}.${key}` : `${section}.${key}`;
    
    if (typeof value === 'object') {
      output += `  ${key}: {\n`;
      output += generateValues(value, section, prefix ? `${prefix}.${key}` : key);
      output += `  },\n`;
    } else {
      output += `    ${key}: '${fullKey}',\n`;
    }
  }
  
  return output;
}

function generateSectionFile(section, data, outputDir) {
  const content = `// This file is auto-generated. Do not edit manually.
const ${section} = {
${generateValues(data, section)}
} as const;

export default ${section};
`;

  const filePath = join(outputDir, `${section.toLowerCase()}.ts`);
  writeFileSync(filePath, content);
}

// Read locale files
const enJson = JSON.parse(readFileSync(join(__dirname, '../i18n/messages/en.json'), 'utf-8'));

// Create output directory
const outputDir = join(__dirname, '../constants/translations');
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Generate section files
for (const [section, data] of Object.entries(enJson)) {
  generateSectionFile(section, data, outputDir);
}

console.log('Translation constants generated successfully!');