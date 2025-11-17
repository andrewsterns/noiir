import * as ts from 'typescript';
import { Rule, RuleResult, LinterConfig } from './rule-types';

export const framePropsOnlyRule: Rule = {
  name: 'frame-props-only',
  description: 'Ensures only Frame components use Frame props and variants',

  check: (sourceFile: ts.SourceFile, config: LinterConfig): RuleResult[] => {
    const results: RuleResult[] = [];
    const frameComponents = config.frameComponents || ['Frame'];

    function visit(node: ts.Node) {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const componentName = node.tagName.getText();

        // Check if this is a Frame component
        if (frameComponents.includes(componentName)) {
          // Check for variant prop usage
          const variantAttr = node.attributes.properties.find(
            attr => ts.isJsxAttribute(attr) && attr.name.getText() === 'variant'
          );

          if (variantAttr && ts.isJsxAttribute(variantAttr)) {
            // Validate variant value is from our system
            if (variantAttr.initializer && ts.isStringLiteral(variantAttr.initializer)) {
              const variantValue = variantAttr.initializer.text;
              if (!isValidVariant(variantValue)) {
                const { line, character } = sourceFile.getLineAndCharacterOfPosition(variantAttr.getStart());
                results.push({
                  file: sourceFile.fileName,
                  line: line + 1,
                  column: character + 1,
                  message: `Unknown variant '${variantValue}'. Use variants from the design system.`,
                  severity: 'warning',
                  rule: 'frame-props-only',
                  node: variantAttr,
                  suggestions: ['Check available variants in __variants__ folder'],
                });
              }
            }
          }
        }
      }

      ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return results;
  },
};

function isValidVariant(variantName: string): boolean {
  // This would ideally check against a registry of valid variants
  // For now, we'll do a basic check - variants should be camelCase or kebab-case
  const validPattern = /^[a-z][a-zA-Z0-9]*(-[a-z][a-zA-Z0-9]*)*$/;
  return validPattern.test(variantName);
}