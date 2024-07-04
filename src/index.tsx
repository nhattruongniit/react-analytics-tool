import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

// styles
import "@refinedev/antd/dist/reset.css";
import "./styles/variables.css";
import "./styles/grid-layout.css";
import "./styles/rechart.css";
import "./styles/index.css";
import "./styles/blend-explorer.css";

// components
import ErrorBoundary from "./components/error-boundary/error-boundary";
import { LoadingFullScreen } from "./components/loading/loading-full-screen";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.Suspense fallback={<LoadingFullScreen />}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.Suspense>,
);
