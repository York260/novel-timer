import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputFile = join(__dirname, 'app_icon.jpeg');
const outputDir = join(__dirname, 'public');

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

console.log('Generating PWA icons from app_icon.jpeg...');

Promise.all(
  sizes.map(size => {
    const outputFile = join(outputDir, `icon-${size}x${size}.png`);
    return sharp(inputFile)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(outputFile)
      .then(() => console.log(`Generated ${size}x${size} icon`));
  })
).then(() => {
  console.log('All icons generated successfully!');
}).catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
