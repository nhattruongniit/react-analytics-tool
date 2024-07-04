import { Refine } from "@refinedev/core";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import routerBindings from "@refinedev/react-router-v6";
import { ErrorComponent, useNotificationProvider } from "@refinedev/antd";
import { ReactFlowProvider } from "reactflow";

// antd icons
import { FundOutlined } from "@ant-design/icons";

// components
import { UkuleleLayout } from "@src/layouts/ukulele-layout";

// configs
import { PAGE_URL } from "./config";

// contexts
import { AppContextProvider } from "@src/contexts/app-context";
import { ColorContextProvider } from "@src/contexts/color-context";
import { MultiStepQueryContextProvider } from "./contexts/multi-step-query-context";

// libs

// pages
import { Dashboard } from "@src/pages/dashboard";
import { MultiStepQuery } from "@src/pages/multi-step-query";
import BlendExplorer from "./pages/blend-query/blend-explorer";

function App() {
  return (
    <BrowserRouter>
      <Refine
        notificationProvider={useNotificationProvider}
        routerProvider={routerBindings}
        resources={[
          {
            name: "Exploration",
            meta: {
              icon: <FundOutlined />,
            },
          },
          {
            name: "Firebase explorer",
            list: PAGE_URL.ROOT,
            meta: {
              parent: "Exploration",
            },
          },
          {
            name: "Multi step query",
            list: PAGE_URL.MULTI_STEP_QUERY,
            meta: {
              parent: "Exploration",
              // tags: ["C2"],
            },
          },
          {
            name: "Blend explorer",
            list: PAGE_URL.BLEND_EXPLORER,
            meta: {
              parent: "Exploration",
              // tags: ["C2"],
            },
          },
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
          useNewQueryKeys: true,
        }}
      >
        <ColorContextProvider>
          <AppContextProvider>
            <Routes>
              <Route
                path={PAGE_URL.ROOT}
                element={
                  <UkuleleLayout>
                    <Outlet />
                  </UkuleleLayout>
                }
              >
                <Route path={PAGE_URL.ROOT} element={<Dashboard />} />
                <Route
                  path={PAGE_URL.MULTI_STEP_QUERY}
                  element={
                    <ReactFlowProvider>
                      <MultiStepQueryContextProvider>
                        <MultiStepQuery />
                      </MultiStepQueryContextProvider>
                    </ReactFlowProvider>
                  }
                />
                <Route path={PAGE_URL.BLEND_EXPLORER} element={<BlendExplorer />} />
                <Route path="*" element={<ErrorComponent />} />
              </Route>

              <Route element={<Outlet />}>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
          </AppContextProvider>
        </ColorContextProvider>
      </Refine>
    </BrowserRouter>
  );
}

export default App;
