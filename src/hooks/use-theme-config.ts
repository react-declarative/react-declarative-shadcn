"use client";

import { type ThemeConfig } from "@/assets/theme-config";

import { atom, useAtomValue, useSetAtom } from "jotai";

export const themeConfigAtom = atom<ThemeConfig>(null as unknown as ThemeConfig);

export const themeDarkAtom = atom<boolean>(false);

export const useThemeConfig = () => {
  return useAtomValue(themeConfigAtom);
};

export const useThemeDark = () => {
    return useAtomValue(themeDarkAtom);
};

export const useSetThemeConfig = () => {
  const setThemeConfig = useSetAtom(themeConfigAtom);
  const setThemeDark = useSetAtom(themeDarkAtom);

  const set = (
    value: ThemeConfig | ((v: ThemeConfig) => ThemeConfig),
  ) => {
    setThemeConfig(value);
    setThemeDark((dark) => !dark);
  };

  return set;
};

export const useActiveTheme = () => {
  const config = useThemeConfig();
  return config["light"];
};
