import * as ts from 'typescript';

export interface RuleResult {
  file: string;
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning';
  rule: string;
  node?: ts.Node;
  suggestions?: string[];
}

export interface Rule {
  name: string;
  description: string;
  check: (sourceFile: ts.SourceFile, config: any) => RuleResult[];
}

export interface LinterConfig {
  rules: {
    [ruleName: string]: boolean | { severity: 'error' | 'warning' };
  };
  allowedProps?: string[];
  frameComponents?: string[];
}