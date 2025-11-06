// scripts/compile-noiir.js
const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

function compileNoiirFile(inputPath) {
  const outputPath = inputPath.replace(/\.noiir$/, ".tsx");
  let code = fs.readFileSync(inputPath, "utf-8");

  // Handle the new .noiir syntax structure
  // Extract function block
  const functionMatch = code.match(/function:\s*\{([\s\S]*?)\}/);
  const functionLogic = functionMatch ? functionMatch[1].trim() : '';

  // Replace function: block with the extracted logic
  code = code.replace(/function:\s*\{[\s\S]*?\}/, functionLogic);

  // Replace render: with return
  code = code.replace(/\brender:\s*\(/, "return (");

  // Core replacements (designer-friendly -> TypeScript/React)
  code = code
    // export group / variant -> export const
    .replace(/\bexport\s+group\b/g, "export const")
    .replace(/\bexport\s+variant\b/g, "export const")
    // interface Foo: { -> interface Foo {
    .replace(/\binterface\s+([A-Za-z0-9_]+)\s*:\s*\{/g, "interface $1 {")
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

(async () => {
  const files = await glob("src/**/*.noiir");
  if (files.length === 0) {
    console.log("No .noiir files found in src/");
    process.exit(0);
  }
  files.forEach(compileNoiirFile);
})();
