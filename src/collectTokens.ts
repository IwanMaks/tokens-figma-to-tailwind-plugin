import { generateCSSFiles } from "./css/generateCSSFiles";
import { getVariablesStructured } from "./css/getVariablesStructured";
import { generateTailwindConfigFile } from "./tailwind/generateTailwindConfigFile";
import { groupVariablesForTailwind } from "./tailwind/groupVariablesForTailwind";

// Сбор токенов и перевод их в файлы
export const collectTokens = async () => {
  const structured = await getVariablesStructured();
  const cssFiles = generateCSSFiles(structured);

  const tailwindConfig = await groupVariablesForTailwind();
  const tailwindFile = generateTailwindConfigFile(tailwindConfig.theme);

  const allFiles = [...cssFiles, tailwindFile];

  // Передаём в UI для скачивания
  figma.ui.postMessage({ type: "export-files", files: allFiles });
  return allFiles;
};
