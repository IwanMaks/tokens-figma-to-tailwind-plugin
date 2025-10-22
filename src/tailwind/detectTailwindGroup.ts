import { formatVariableName } from "../shared/formatVariableName";

// Определяем тип tailwind-категории по имени и типу токена
// TODO: Подумать, как это возможно сделать умнее, чем через мэтч названия
export const detectTailwindGroup = (variable: Variable): string => {
  const formattedName = formatVariableName(variable);

  if (variable.resolvedType === "COLOR") return "colors";
  if (
    formattedName.includes("spacing") ||
    formattedName.includes("gap") ||
    formattedName.includes("padding") ||
    formattedName.includes("margin") ||
    formattedName.includes("size") ||
    formattedName.includes("width") ||
    formattedName.includes("height") ||
    formattedName.includes("min") ||
    formattedName.includes("max") ||
    variable.scopes.includes("WIDTH_HEIGHT")
  )
    return "spacing";
  if (
    formattedName.includes("radius") ||
    formattedName.includes("corner") ||
    variable.scopes.includes("CORNER_RADIUS")
  )
    return "borderRadius";
  if (formattedName.includes("font-size")) return "fontSize";
  if (formattedName.includes("line-height")) return "lineHeight";
  if (formattedName.includes("font-family") || formattedName.includes("font"))
    return "fontFamily";
  if (formattedName.includes("opacity")) return "opacity";
  if (formattedName.includes("z-index")) return "zIndex";
  if (
    formattedName.includes("border-width") ||
    formattedName.includes("stroke") ||
    formattedName.includes("border")
  )
    return "borderWidth";
  if (formattedName.includes("shadow")) return "boxShadow";
  if (formattedName.includes("letter-spacing")) return "letterSpacing";
  if (
    variable.scopes.includes("FONT_STYLE") ||
    formattedName.includes("weight")
  )
    return "fontWeight";

  // Если ничего не подошло, то пропускаем токен
  return "";
};
