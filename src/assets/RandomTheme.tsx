import { createTheme, Fab, ThemeProvider } from "@mui/material";

import Casino from "@mui/icons-material/Casino";
import { randomThemeConfig } from "@/assets/random-theme-config";
import { useSetThemeConfig } from "@/hooks/use-theme-config";

const theme = createTheme();

export const RandomTheme = () => {
  const setThemeConfig = useSetThemeConfig();
  return (
    <ThemeProvider theme={theme}>
      <Fab
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={() =>
          setThemeConfig((prevTheme) => {
            let newTheme = randomThemeConfig();
            while (prevTheme === newTheme) {
              newTheme = randomThemeConfig();
            }
            return newTheme;
          })
        }
        color="primary"
        aria-label="add"
      >
        <Casino />
      </Fab>
    </ThemeProvider>
  );
};

export default RandomTheme;
