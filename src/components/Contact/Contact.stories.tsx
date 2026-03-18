import { ThemeProvider } from "@components/ThemeProvider";
import type { Meta } from "@storybook/react";
import type React from "react";
import { ContactSection } from "../../sections/ContactSection";

const meta = {
  title: "Features/Contact",
  component: ContactSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story: React.FC) => (
      <ThemeProvider defaultTheme="light">
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ContactSection>;

export { meta as default };

export const Default = {};
