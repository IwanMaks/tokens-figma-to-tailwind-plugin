import { FileStructure } from "../shared/types";

// Генерация Tailwind конфигурации
export const generateTailwindConfigFile = (
  theme: Record<string, any>
): FileStructure => {
  const content = `import type { Config } from 'tailwindcss';

		const config: Partial<Config["theme"]> = {
			theme: ${JSON.stringify(theme, null, 2)},
		};

		export default config;
		`;

  return { name: "tailwind.config.ts", content };
};
