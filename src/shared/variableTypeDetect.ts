// Type guards для типов переменных фигмы
export const isVariableAlias = (value: any): value is VariableAlias => {
  return value && typeof value === "object" && value.type === "VARIABLE_ALIAS";
};

export const isColorValue = (value: any): value is RGB | RGBA => {
  return value && typeof value === "object";
};
