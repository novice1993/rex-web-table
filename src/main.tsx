import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { MantineProvider } from "@mantine/core";
import { theme } from "./theme.ts";
import "@mantine/core/styles.css";

createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme}>
    <App />
  </MantineProvider>
);
