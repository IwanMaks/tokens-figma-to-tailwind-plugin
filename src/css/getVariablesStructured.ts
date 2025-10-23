import { variableTypeMapper } from "../shared/constants";
import { formatVariableName } from "../shared/formatVariableName";
import { toKebabCase } from "../shared/toKebabCase";
import { CollectionResult } from "../shared/types";
import { resolveColorVariable } from "./resolveColorVariable";

// Функция для создания структуры css переменных
export const getVariablesStructured = async (): Promise<CollectionResult> => {
  const result: CollectionResult = {};
  const collections = await figma.variables.getLocalVariableCollectionsAsync();

  for (const collection of collections) {
    const collectionKey = toKebabCase(collection.name);
    result[collectionKey] = {};

    // Инициализируем все modes
    for (const mode of collection.modes) {
      result[collectionKey][mode.name.toLowerCase()] = {};
    }

    // Обрабатываем переменные
    for (const variableId of collection.variableIds) {
      const variable = await figma.variables.getVariableByIdAsync(variableId);
      if (!variable) continue;

      const variableCodeName = formatVariableName(variable);

      for (const mode of collection.modes) {
        const value = variable.valuesByMode[mode.modeId];
        if (!value) continue;

        // COLOR-переменные обрабатываем рекурсивно
        if (variable.resolvedType === "COLOR") {
          await resolveColorVariable(
            variable.id,
            mode.modeId,
            result[collectionKey][mode.name.toLowerCase()] as Record<
              string,
              string
            >
          );
          continue;
        }

        const valueUnit =
          variable.scopes.includes("FONT_WEIGHT") ||
          variableCodeName.includes("weight")
            ? ""
            : variableTypeMapper[variable.resolvedType];

        // Остальные типы — напрямую
        result[collectionKey][mode.name.toLowerCase()][variableCodeName] =
          value.toString() + valueUnit;
      }
    }
  }

  return result;
};
