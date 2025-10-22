import { formatVariableName } from "../shared/formatVariableName";
import { ThemeTailwindType } from "../shared/types";
import { detectTailwindGroup } from "./detectTailwindGroup";
import { getTailwindFontSize } from "./getTailwindFontSize";

// Основной метод группировки структуры тайлвинда
export const groupVariablesForTailwind = async () => {
  const variables = await figma.variables.getLocalVariablesAsync();

  const result: ThemeTailwindType = {
    colors: {},
    spacing: {},
    borderRadius: {},
    fontSize: {},
    lineHeight: {},
    fontFamily: {},
    opacity: {},
    zIndex: {},
    borderWidth: {},
    boxShadow: {},
    letterSpacing: {},
    fontWeight: {},
  };

  for (const variable of variables) {
    const group = detectTailwindGroup(variable);

    // Пропускаем переменные, которые не попали ни в одну группу
    if (!group) continue;

    const formattedName = formatVariableName(variable);

    const varName = `--${formattedName}`;

    // Берём значение из первой моды, так как названия во всех модах одинаковое
    const modeId = Object.keys(variable.valuesByMode)[0];
    const value = variable.valuesByMode[modeId];

    if (!value) continue;

    // Цвета → rgba(var(--...))
    if (variable.resolvedType === "COLOR") {
      result[group][formattedName] = `rgba(var(${varName}))`;
    }
    // Остальные → var(--...)
    else {
      result[group][formattedName] = `var(${varName})`;
    }
  }

  // Удаляем пустые группы
  Object.keys(result).forEach((key) => {
    if (Object.keys(result[key]).length === 0) {
      delete result[key];
    }
  });

  const fontSize = await getTailwindFontSize();

  result.fontSize = fontSize;

  return { theme: result };
};
