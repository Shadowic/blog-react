import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.tsx";
import { ThemeProvider } from "./shared/lib/theme";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  // </StrictMode>
);
