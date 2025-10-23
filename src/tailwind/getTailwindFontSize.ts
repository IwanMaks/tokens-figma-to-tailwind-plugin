import { formatVariableName } from "../shared/formatVariableName";
import { toKebabCase } from "../shared/toKebabCase";
import { FontSizeSettingsTailwind, FontSizeTailwind } from "../shared/types";

// Функция для форматирования типографии в формат тайлвинда
export const getTailwindFontSize = async () => {
  const textStyles = await figma.getLocalTextStylesAsync();

  const fontSize: FontSizeTailwind = {};

  for (const style of textStyles) {
    const name = toKebabCase(style.name);

    // Получаем переменные из boundVariables
    const vars = style.boundVariables;
    const getVarName = async (
      v?: VariableAlias
    ): Promise<string | undefined> => {
      if (!v?.id) return undefined;
      const variable = await figma.variables.getVariableByIdAsync(v.id);
      if (!variable) return undefined;
      const tokenName = formatVariableName(variable);
      return `var(--${tokenName})`;
    };

    const [fontSizeToken, lineHeightToken, fontWeightToken] = await Promise.all(
      [
        getVarName(vars?.fontSize),
        getVarName(vars?.lineHeight),
        getVarName(vars?.fontWeight),
      ]
    );

    // Значения по умолчанию, если нет переменной
    const fontWeight = fontWeightToken || 400;
    const lineHeight = lineHeightToken || "";

    const configEntry: FontSizeSettingsTailwind = [
      fontSizeToken || `${style.fontSize}px`,
      {
        fontWeight,
        lineHeight,
      },
    ];

    fontSize[name] = configEntry;
  }

  return fontSize;
};
