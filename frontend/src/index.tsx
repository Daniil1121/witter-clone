import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store/store";
const theme = createTheme({
  typography: {
    fontFamily: [
      "system-ui",

      "-apple-system",

      "BlinkMacSystemFont",

      "Segoe UI",

      "Roboto",

      "Ubuntu",

      "Helvetica Neue",

      "sans-serif",
    ].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "40px",
        },
      },
    },
  },
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
