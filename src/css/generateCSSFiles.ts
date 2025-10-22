import { CollectionResult, FileStructure } from "../shared/types";

// Функция для создания контента css файлов
export const generateCSSFiles = (
  collections: CollectionResult
): FileStructure[] => {
  const files: FileStructure[] = [];

  for (const [collectionName, modes] of Object.entries(collections)) {
    let cssContent = "";

    for (const [modeName, variables] of Object.entries(modes)) {
      // TODO: Подумать, чтобы пользователь сам выбирал корневой мод
      const selector =
        modeName === "light" || modeName === "desktop"
          ? ":root"
          : `.${modeName}`;
      cssContent += `${selector} {\n`;

      for (const [key, value] of Object.entries(variables)) {
        cssContent += `  --${key}: ${value};\n`;
      }

      cssContent += `}\n\n`;
    }

    files.push({
      name: `${collectionName}.css`,
      content: cssContent.trim(),
    });
  }

  return files;
};
