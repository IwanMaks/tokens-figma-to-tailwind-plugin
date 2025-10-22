// Типизация сообщений из UI
export type UIMessage = { type: "export-tokens"; payload?: string };

// Типы для итоговой структуры css переменных
export type CollectionResult = {
  [collectionName: string]: {
    [modeName: string]: Record<string, string | number | boolean | object>;
  };
};

export type FileStructure = { name: string; content: string };

export type FontSizeSettingsTailwind = [
  string,
  {
    fontWeight: number | string;
    lineHeight?: string;
  }
];

export type FontSizeTailwind = Record<string, FontSizeSettingsTailwind>;

export type ThemeTailwindType = Record<
  string,
  Record<string, string | FontSizeSettingsTailwind>
>;
