import { sortObjectKeys } from "../shared/sortObjectKeys";
import { FileStructure } from "../shared/types";

// Генерация Tailwind конфигурации
export const generateTailwindConfigFile = (
  theme: Record<string, any>
): FileStructure => {
  const sortedTheme = sortObjectKeys(theme);
  const content = `import type { Config } from 'tailwindcss';

		const tokens: Partial<Config> = {
			theme: ${JSON.stringify(sortedTheme, null, 2)},
		};

		export default tokens;
		`;

  return { name: "tailwind.config.ts", content };
};
