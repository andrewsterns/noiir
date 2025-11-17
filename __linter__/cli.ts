#!/usr/bin/env node

import { runLinter } from './noiir-lint';
import { glob } from 'glob';
import { join } from 'path';

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: noiir-lint [files...] [options]');
    console.log('');
    console.log('Options:');
    console.log('  --config <path>    Path to config file');
    console.log('  --ext <ext>        File extensions to lint (default: .tsx,.ts)');
    console.log('');
    console.log('Examples:');
    console.log('  noiir-lint src/**/*.tsx');
    console.log('  noiir-lint . --ext .noiir');
    console.log('  noiir-lint src/ --config ./noiir-lint.config.json');
    process.exit(1);
  }

  let configPath: string | undefined;
  let extensions = ['.tsx', '.ts'];
  const files: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--config' && i + 1 < args.length) {
      configPath = args[i + 1];
      i++;
    } else if (arg === '--ext' && i + 1 < args.length) {
      extensions = args[i + 1].split(',');
      i++;
    } else {
      files.push(arg);
    }
  }

  // Expand glob patterns
  const expandedFiles: string[] = [];
  for (const pattern of files) {
    const matches = await glob(pattern, { cwd: process.cwd() });
    expandedFiles.push(...matches.map(file => join(process.cwd(), file)));
  }

  // Filter by extensions if files were globbed
  const filteredFiles = expandedFiles.filter(file =>
    extensions.some(ext => file.endsWith(ext))
  );

  if (filteredFiles.length === 0) {
    console.log('No files found to lint.');
    process.exit(0);
  }

  console.log(`🔍 Linting ${filteredFiles.length} files...`);
  runLinter(filteredFiles, configPath);
}

main().catch(error => {
  console.error('Error running linter:', error);
  process.exit(1);
});