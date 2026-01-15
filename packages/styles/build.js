/**
 * Build script for @caeli-wind/login-styles
 * Bundles and minifies CSS using PostCSS
 */

import fs from 'fs/promises';
import path from 'path';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import cssnano from 'cssnano';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

async function build() {
  console.log('Building @caeli-wind/login-styles...');

  // Ensure dist directory exists
  await fs.mkdir(distDir, { recursive: true });

  // Read the main CSS file
  const inputPath = path.join(srcDir, 'index.css');
  const css = await fs.readFile(inputPath, 'utf8');

  // Process with PostCSS
  const result = await postcss([
    postcssImport(),
  ]).process(css, {
    from: inputPath,
    to: path.join(distDir, 'index.css'),
  });

  // Write unminified version
  await fs.writeFile(path.join(distDir, 'index.css'), result.css);
  console.log('  -> dist/index.css');

  // Process with cssnano for minified version
  const minified = await postcss([
    postcssImport(),
    cssnano({ preset: 'default' }),
  ]).process(css, {
    from: inputPath,
    to: path.join(distDir, 'index.min.css'),
  });

  await fs.writeFile(path.join(distDir, 'index.min.css'), minified.css);
  console.log('  -> dist/index.min.css');

  // Copy variables.css separately for selective imports
  const variablesCss = await fs.readFile(path.join(srcDir, 'variables.css'), 'utf8');
  await fs.writeFile(path.join(distDir, 'variables.css'), variablesCss);
  console.log('  -> dist/variables.css');

  // Copy animations.css separately
  const animationsCss = await fs.readFile(path.join(srcDir, 'animations.css'), 'utf8');
  await fs.writeFile(path.join(distDir, 'animations.css'), animationsCss);
  console.log('  -> dist/animations.css');

  console.log('Build complete!');
}

build().catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});
