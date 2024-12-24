
import { useMemo } from "react";

import { themeToStyles } from "@/assets/theme-to-styles";
import { useThemeConfig, useThemeDark } from "@/hooks/use-theme-config";

// This weird approach is necessary to also style the portaled components
export const ThemeStyleSheet = () => {
  const config = useThemeConfig();
  const dark = useThemeDark();

  const style = useMemo(() => {

    if (!config) {
        return "";
    }

    const styles = {
      light: themeToStyles(config.light),
      dark: themeToStyles(config.dark),
    };

    const lightStyles = Object.entries(styles.light)
      .map(([key, value]) => `${key}: ${value};`)
      .join("\n");

    const darkStyles = Object.entries(styles.dark)
      .map(([key, value]) => `${key}: ${value};`)
      .join("\n");

    if (dark) {
        return `
        body {
          ${darkStyles}
        }`;
    }

    return `
    body {
      ${lightStyles}
    }`;
  }, [config]);

  return <style dangerouslySetInnerHTML={{ __html: style }} />;
};
