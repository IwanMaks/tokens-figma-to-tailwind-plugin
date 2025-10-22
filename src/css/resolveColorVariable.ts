import { formatVariableName } from "../shared/formatVariableName";
import { rgbaToString } from "../shared/rgbaToString";
import { isColorValue, isVariableAlias } from "../shared/variableTypeDetect";

// Рекурсивное раскрытие COLOR-переменных
export const resolveColorVariable = async (
  variableId: string,
  modeId: string,
  result: Record<string, string>
): Promise<string> => {
  const variable = await figma.variables.getVariableByIdAsync(variableId);
  if (!variable) return "";

  const variableName = formatVariableName(variable);
  const value = variable.valuesByMode[modeId];

  if (!value) return "";

  // Если ссылка на другую переменную
  if (isVariableAlias(value)) {
    const targetId = value.id;
    const target = await figma.variables.getVariableByIdAsync(targetId);
    if (!target) return "";

    const targetName = formatVariableName(target);
    result[variableName] = `var(--${targetName})`;

    // Рекурсивно идём глубже
    return resolveColorVariable(targetId, modeId, result);
  }

  // Если это прямое значение цвета
  if (isColorValue(value)) {
    const colorValue = rgbaToString(value);
    result[variableName] = colorValue;
    return colorValue;
  }

  return "";
};
