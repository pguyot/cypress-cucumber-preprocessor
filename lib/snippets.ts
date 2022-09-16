import { GeneratedExpression } from "@cucumber/cucumber-expressions";

const TEMPLATE = `
Given("[definition]", function ([arguments]) {
  return "pending";
});
`.trim();

export function generateSnippet(
  expression: GeneratedExpression,
  parameter: "dataTable" | "docString" | null
) {
  const definition = expression.source
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');

  const stepParameterNames = parameter ? [parameter] : [];

  const args = expression.parameterNames.concat(stepParameterNames).join(", ");

  return TEMPLATE.replace("[definition]", definition).replace(
    "[arguments]",
    args
  );
}
