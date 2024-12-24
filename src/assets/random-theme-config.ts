import themes from "@/assets/themes";
import { ThemeConfig } from "./theme-config";

export const randomThemeConfig = () => themes[Math.floor(Math.random() * themes.length)] as unknown as ThemeConfig;
