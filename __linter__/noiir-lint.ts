import * as ts from 'typescript';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Reporter } from './reporter';
import { Rule, RuleResult } from './rules/rule-types';
import { disallowedPropsRule } from './rules/disallowed-props';
import { framePropsOnlyRule } from './rules/frame-props-only';

export interface LinterConfig {
  rules: {
    [ruleName: string]: boolean | { severity: 'error' | 'warning' };
  };
  allowedProps?: string[];
  frameComponents?: string[];
}

export class NoiirLinter {
  private config: LinterConfig;
  private reporter: Reporter;
  private rules: Rule[] = [];

  constructor(configPath?: string) {
    this.config = this.loadConfig(configPath);
    this.reporter = new Reporter();
    this.initializeRules();
  }

  private loadConfig(configPath?: string): LinterConfig {
    const defaultConfigPath = join(__dirname, 'config.json');
    const configToLoad = configPath || defaultConfigPath;

    try {
      const configFile = readFileSync(configToLoad, 'utf-8');
      return JSON.parse(configFile);
    } catch (error) {
      console.warn(`Could not load config from ${configToLoad}, using minimal defaults`);
      return {
        rules: {
          'disallowed-props': true,
          'frame-props-only': true,
        },
        allowedProps: ['key', 'ref', 'children'],
        frameComponents: ['Frame'],
      };
    }
  }

  private initializeRules() {
    this.rules = [
      disallowedPropsRule,
      framePropsOnlyRule,
    ].filter(rule => {
      const ruleConfig = this.config.rules[rule.name];
      return ruleConfig === true || (typeof ruleConfig === 'object' && ruleConfig.severity);
    });
  }

  public lintFile(filePath: string): RuleResult[] {
    const sourceText = readFileSync(filePath, 'utf-8');
    const sourceFile = ts.createSourceFile(
      filePath,
      sourceText,
      ts.ScriptTarget.Latest,
      true
    );

    const results: RuleResult[] = [];

    // Run all rules on the AST
    for (const rule of this.rules) {
      const ruleResults = rule.check(sourceFile, this.config);
      results.push(...ruleResults);
    }

    return results;
  }

  public lintFiles(filePaths: string[]): RuleResult[] {
    const allResults: RuleResult[] = [];

    for (const filePath of filePaths) {
      try {
        const results = this.lintFile(filePath);
        allResults.push(...results);
      } catch (error) {
        console.error(`Error linting ${filePath}:`, error);
      }
    }

    return allResults;
  }

  public report(results: RuleResult[]): void {
    this.reporter.report(results);
  }

  public getConfig(): LinterConfig {
    return this.config;
  }
}

// CLI interface
export function runLinter(files: string[], configPath?: string) {
  const linter = new NoiirLinter(configPath);
  const results = linter.lintFiles(files);
  linter.report(results);

  const hasErrors = results.some(r => r.severity === 'error');
  process.exit(hasErrors ? 1 : 0);
}