const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directory = 'public/images/hero';
const files = ['1.jpg', '2.jpg', '4.jpg', '5.jpg'];

async function convert() {
    for (const file of files) {
        const inputPath = path.join(directory, file);
        const outputPath = inputPath.replace('.jpg', '.webp');
        
        if (fs.existsSync(inputPath)) {
            console.log(`Converting ${file} to WebP...`);
            await sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath);
            console.log(`Done: ${outputPath}`);
            
            // Get sizes for comparison
            const inputStats = fs.statSync(inputPath);
            const outputStats = fs.statSync(outputPath);
            console.log(`Original: ${(inputStats.size / 1024).toFixed(2)} KB | WebP: ${(outputStats.size / 1024).toFixed(2)} KB`);
        } else {
            console.log(`File not found: ${inputPath}`);
        }
    }
}

convert().catch(console.error);
