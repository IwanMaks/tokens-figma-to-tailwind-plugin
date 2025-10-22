// Для переведения строки к kebab case
export const toKebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2") // добавляем дефис между словами в camelCase
    .replace(/[^a-zA-Z0-9]+/g, "-") // заменяем любые разделители на дефис
    .replace(/^-+|-+$/g, "") // убираем дефисы в начале и конце
    .toLowerCase(); // всё в нижний регистр
};
