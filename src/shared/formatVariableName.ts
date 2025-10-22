import { toKebabCase } from "./toKebabCase";

// Получение валидного названия переменной
// TODO: Стоит подумать о приведении имени к разным формат, который захочет юзер
export const formatVariableName = (variable: Variable) => {
  return variable.codeSyntax?.WEB || toKebabCase(variable.name);
};
