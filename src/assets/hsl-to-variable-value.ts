import { type Hsl } from "@/assets/theme-config";

export const hslToVariableValue = (hsl: Hsl) => {
  return `${hsl.h} ${hsl.s}% ${hsl.l}%`;
};

export const hslToCssValue = (hsl: Hsl) => {
  return `hsl(${hslToVariableValue(hsl)})`;
};
