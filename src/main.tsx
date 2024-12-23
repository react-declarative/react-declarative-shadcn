import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ModalManagerProvider, ModalProvider } from "react-declarative";
import { SlotFactory } from "./components/SlotFactory";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SlotFactory>
    <ModalProvider>
      <ModalManagerProvider>
        <App />
      </ModalManagerProvider>
    </ModalProvider>
  </SlotFactory>
);
