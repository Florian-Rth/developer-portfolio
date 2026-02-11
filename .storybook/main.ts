import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  // Critical: Merge Vite config for Tailwind CSS v4 and path aliases
  viteFinal: async (config) => {
    const tailwindcssModule = await import("@tailwindcss/vite");

    return mergeConfig(config, {
      plugins: [tailwindcssModule.default()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../src"),
          "@components": path.resolve(__dirname, "../src/components"),
          "@lib": path.resolve(__dirname, "../src/lib"),
          "@utils": path.resolve(__dirname, "../src/utils"),
          "@hooks": path.resolve(__dirname, "../src/hooks"),
          "@features": path.resolve(__dirname, "../src/features"),
          "@layouts": path.resolve(__dirname, "../src/layouts"),
          "@types": path.resolve(__dirname, "../src/types"),
          "@constants": path.resolve(__dirname, "../src/constants"),
          "@styles": path.resolve(__dirname, "../src/styles"),
        },
      },
    });
  },
};

export default config;
