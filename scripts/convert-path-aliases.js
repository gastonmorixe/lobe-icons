#!/usr/bin/env node
/**
 * Convert TypeScript path aliases (@/) to relative imports
 * This allows the package to be consumed directly from source without building
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');
const ROOT_DIR = path.join(__dirname, '..');

/**
 * Calculate relative path from file to src directory
 * @param {string} filePath - Absolute path to the file
 * @returns {string} - Relative path prefix (e.g., '../../')
 */
function calculateRelativePrefix(filePath) {
  const relative = path.relative(path.dirname(filePath), SRC_DIR);
  return relative === '' ? './' : relative + '/';
}

/**
 * Convert @/ imports to relative imports in a file
 * @param {string} filePath - Path to the file to convert
 */
function convertFileImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  const relativePrefix = calculateRelativePrefix(filePath);

  // Match: from '@/...' or from "@/..."
  // Handles both single and double quotes
  const importRegex = /from\s+(['"])@\/([^'"]+)\1/g;

  content = content.replace(importRegex, (match, quote, importPath) => {
    const newPath = relativePrefix + importPath;
    return `from ${quote}${newPath}${quote}`;
  });

  // Also handle dynamic imports: import('@/...')
  const dynamicImportRegex = /import\s*\(\s*(['"])@\/([^'"]+)\1\s*\)/g;

  content = content.replace(dynamicImportRegex, (match, quote, importPath) => {
    const newPath = relativePrefix + importPath;
    return `import(${quote}${newPath}${quote})`;
  });

  // Only write if content changed
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }

  return false;
}

/**
 * Recursively find all TypeScript files
 * @param {string} dir - Directory to search
 * @param {string[]} files - Accumulator for found files
 * @returns {string[]} - Array of file paths
 */
function findTsFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Skip ignored directories
    if (entry.isDirectory()) {
      if (['node_modules', 'dist', 'es', 'lib', '.dumi', '.git'].includes(entry.name)) {
        continue;
      }
      findTsFiles(fullPath, files);
    } else if (entry.isFile()) {
      if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

function main() {
  console.log('🔍 Finding TypeScript files with @/ imports...\n');

  // Find all TS/TSX files
  const files = findTsFiles(ROOT_DIR);

  console.log(`Found ${files.length} TypeScript files\n`);

  let convertedCount = 0;
  let processedCount = 0;

  for (const file of files) {
    const wasConverted = convertFileImports(file);
    if (wasConverted) {
      convertedCount++;
      const relativePath = path.relative(path.join(__dirname, '..'), file);
      console.log(`✓ ${relativePath}`);
    }
    processedCount++;

    // Progress indicator every 100 files
    if (processedCount % 100 === 0) {
      console.log(`  ... processed ${processedCount}/${files.length} files`);
    }
  }

  console.log(`\n✅ Conversion complete!`);
  console.log(`   Files processed: ${processedCount}`);
  console.log(`   Files converted: ${convertedCount}`);
  console.log(`   Files unchanged: ${processedCount - convertedCount}`);
}

try {
  main();
} catch (err) {
  console.error('❌ Error:', err);
  process.exit(1);
}
