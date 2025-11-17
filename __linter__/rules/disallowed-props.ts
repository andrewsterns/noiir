import * as ts from 'typescript';
import { Rule, RuleResult, LinterConfig } from './rule-types';

const DISALLOWED_PROPS = [
  'style',
  'className',
  'border',
  'borderRadius',
  'borderWidth',
  'borderColor',
  'borderStyle',
  'background',
  'backgroundColor',
  'color',
  'fontSize',
  'fontWeight',
  'fontFamily',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'width',
  'height',
  'minWidth',
  'minHeight',
  'maxWidth',
  'maxHeight',
  'display',
  'flexDirection',
  'justifyContent',
  'alignItems',
  'position',
  'top',
  'bottom',
  'left',
  'right',
  'zIndex',
  'boxShadow',
  'textAlign',
  'lineHeight',
  'letterSpacing',
];

export const disallowedPropsRule: Rule = {
  name: 'disallowed-props',
  description: 'Disallows legacy CSS props that should be replaced with Frame props',

  check: (sourceFile: ts.SourceFile, config: LinterConfig): RuleResult[] => {
    const results: RuleResult[] = [];
    const allowedProps = config.allowedProps || [];

    function visit(node: ts.Node) {
      if (ts.isJsxAttribute(node)) {
        const propName = node.name.getText();

        if (DISALLOWED_PROPS.includes(propName) && !allowedProps.includes(propName)) {
          const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());

          const suggestions = getSuggestionsForProp(propName);

          results.push({
            file: sourceFile.fileName,
            line: line + 1,
            column: character + 1,
            message: `Disallowed prop '${propName}' found. Use Frame props instead.`,
            severity: 'error',
            rule: 'disallowed-props',
            node,
            suggestions,
          });
        }
      }

      ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return results;
  },
};

function getSuggestionsForProp(propName: string): string[] {
  const suggestions: Record<string, string[]> = {
    style: ['Use Frame props like fill, stroke, appearance, etc.'],
    className: ['Use variants or Frame props for styling'],
    border: ['Use stroke prop: stroke={{ type: "solid", color: "...", weight: 1 }}'],
    borderRadius: ['Use appearance prop: appearance={{ cornerRadius: 8 }}'],
    background: ['Use fill prop: fill={{ type: "solid", color: "..." }}'],
    backgroundColor: ['Use fill prop: fill={{ type: "solid", color: "..." }}'],
    color: ['Use typography prop: typography={{ color: "..." }}'],
    fontSize: ['Use typography prop: typography={{ fontSize: 16 }}'],
    fontWeight: ['Use typography prop: typography={{ fontWeight: 600 }}'],
    fontFamily: ['Use typography prop: typography={{ fontFamily: "..." }}'],
    margin: ['Use autoLayout prop: autoLayout={{ paddingHorizontal: 16 }}'],
    padding: ['Use autoLayout prop: autoLayout={{ padding: 16 }}'],
    width: ['Use autoLayout prop: autoLayout={{ width: "hug" }} or position sizing'],
    height: ['Use autoLayout prop: autoLayout={{ height: "fill" }} or position sizing'],
    display: ['Use autoLayout flow: autoLayout={{ flow: "horizontal" }}'],
    flexDirection: ['Use autoLayout flow: autoLayout={{ flow: "vertical" }}'],
    justifyContent: ['Use autoLayout distribution: autoLayout={{ distribution: "space-between" }}'],
    alignItems: ['Use autoLayout alignment: autoLayout={{ alignment: "center" }}'],
    position: ['Use position prop: position={{ type: "absolute", x: 10, y: 20 }}'],
    boxShadow: ['Use effects prop: effects={{ type: "drop-shadow", blur: 8 }}'],
    textAlign: ['Use typography prop: typography={{ textAlign: "center" }}'],
  };

  return suggestions[propName] || ['Replace with appropriate Frame prop'];
}