import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  server: {
    port: 3000,
  },
  dev: {
    assetPrefix: "http://localhost:3000",
  },
  tools: {
    rspack: (config, { appendPlugins }) => {

      config.output!.uniqueName = "federation_provider";
      appendPlugins([
        new ModuleFederationPlugin({
          name: "federation_provider",
          exposes: {
            "./button": "./src/button.tsx",
          },
          shared: ["react", "react-dom"],
        }),

      ]);
    },
  },
  plugins: [pluginReact()],
});
