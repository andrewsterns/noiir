// scripts/compile-noiir.js
import fs from "fs";
import path from "path";
import { glob } from "glob";

function compileNoiirFile(inputPath) {
  const outputPath = inputPath.replace(/\.noiir$/, ".tsx");
  let code = fs.readFileSync(inputPath, "utf-8");

  // Core replacements (designer-friendly -> TypeScript/React)
  code = code
    // export group / variant -> export const
    .replace(/\bexport\s+group\b/g, "export const")
    .replace(/\bexport\s+variant\b/g, "export const")
    // interface Foo: { -> interface Foo {
    .replace(/\binterface\s+([A-Za-z0-9_]+)\s*:\s*\{/g, "interface $1 {")
    // function: -> const logic = () =>
    .replace(/\bfunction\s*:/g, "const logic = () =>")
    // <frame -> <Frame and closing tags
    .replace(/<frame\b/g, "<Frame")
    .replace(/<\/frame>/g, "</Frame>")
    // fix small TypeScript shorthand tokens if used
    .replace(/\bextendVariant\b/g, "ExtendVariant")
    .replace(/: extendVariant =/g, ": ExtendVariant =")
    // ensure variants={{X}} spacing
    .replace(/variants=\{\{([A-Za-z0-9_,$\s]+)\}\}/g, "variants={{ $1 }}");

  fs.writeFileSync(outputPath, code, "utf-8");
  console.log(`Compiled: ${path.relative(process.cwd(), inputPath)} → ${path.relative(process.cwd(), outputPath)}`);
}

const files = await glob("src/**/*.noiir");
if (files.length === 0) {
  console.log("No .noiir files found in src/");
  process.exit(0);
}
files.forEach(compileNoiirFile);
