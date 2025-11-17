import { RuleResult } from './rules/rule-types';

export class Reporter {
  public report(results: RuleResult[]): void {
    if (results.length === 0) {
      console.log('✅ No Noiir linting issues found!');
      return;
    }

    const errors = results.filter(r => r.severity === 'error');
    const warnings = results.filter(r => r.severity === 'warning');

    console.log(`🚨 Noiir Linter Results:`);
    console.log(`   ${errors.length} errors, ${warnings.length} warnings\n`);

    // Group by file
    const byFile = results.reduce((acc, result) => {
      if (!acc[result.file]) acc[result.file] = [];
      acc[result.file].push(result);
      return acc;
    }, {} as Record<string, RuleResult[]>);

    for (const [file, fileResults] of Object.entries(byFile)) {
      console.log(`📁 ${file}:`);
      for (const result of fileResults) {
        const icon = result.severity === 'error' ? '❌' : '⚠️';
        const position = `${result.line}:${result.column}`;
        console.log(`  ${icon} ${position} - ${result.message} (${result.rule})`);

        if (result.suggestions && result.suggestions.length > 0) {
          console.log(`    💡 Suggestions:`);
          result.suggestions.forEach(suggestion => {
            console.log(`       • ${suggestion}`);
          });
        }
      }
      console.log('');
    }

    if (errors.length > 0) {
      console.log(`❌ ${errors.length} error(s) found. Please fix before committing.`);
    } else if (warnings.length > 0) {
      console.log(`⚠️ ${warnings.length} warning(s) found. Consider fixing for better code quality.`);
    }
  }

  public reportToIDE(results: RuleResult[]): string {
    // Format for IDE integration (e.g., VSCode problems panel)
    return results.map(result => {
      const severity = result.severity === 'error' ? 'error' : 'warning';
      return `${result.file}:${result.line}:${result.column}:${severity}:${result.message} (${result.rule})`;
    }).join('\n');
  }
}