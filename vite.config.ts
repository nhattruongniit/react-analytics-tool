import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import * as path from "path";
import VitePluginHtmlEnv from "vite-plugin-html-env";
import envCompatible from "vite-plugin-env-compatible";
import EnvironmentPlugin from "vite-plugin-environment";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  const htmlPlugin = () => {
    return {
      name: "html-transform",
      transformIndexHtml(html: string) {
        return html.replace("crossorigin", "defer");
      },
    };
  };

  return {
    build: {
      outDir: "build",
      sourcemap: true,
    },
    plugins: [
      VitePluginHtmlEnv({
        compiler: true,
        // compiler: false // old
      }),
      react(),
      envCompatible(),
      tsconfigPaths(),
      htmlPlugin(),
      EnvironmentPlugin("all"),
    ],
    server: {
      port: 5174,
    },
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      "process.platform": {},
      "process.versions": {},
    },
  };
});
