import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ModalManagerProvider, ModalProvider } from "react-declarative";
import { SlotFactory } from "./components/SlotFactory";
import { ThemeStyleSheet } from "./assets/ThemeProvider";
import RandomTheme from "./assets/RandomTheme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SlotFactory>
    <ModalProvider>
      <ModalManagerProvider>
        <ThemeStyleSheet />
        <App />
        <RandomTheme />
      </ModalManagerProvider>
    </ModalProvider>
  </SlotFactory>
);
