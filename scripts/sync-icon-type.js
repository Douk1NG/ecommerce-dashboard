const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, './../public/icons/');

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    const svgFiles = files
        .filter(file => file.endsWith('.svg'))
        .map(file => path.basename(file, '.svg'));

    const typeDefinition = `export type Icons = ${svgFiles.map(file => `'${file}'`).join(' | ')};`;

    fs.writeFileSync(path.join(__dirname, '../types/icon.ts'), typeDefinition);
    console.log('Type definition generated successfully.');
});