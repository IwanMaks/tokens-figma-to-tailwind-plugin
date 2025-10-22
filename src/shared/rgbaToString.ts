// RGBA → строка
export const rgbaToString = (color: RGB | RGBA): string => {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  if ("a" in color && color.a !== undefined && color.a < 1) {
    return `${r}, ${g}, ${b}, ${color.a.toFixed(2)}`;
  }
  return `${r}, ${g}, ${b}`;
};
