import type React from "react";
import { AppBar } from "../AppBar";
import { Footer } from "../Footer";
import { Main } from "./Main";

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export const Layout: React.FC<LayoutProps> = ({ children, className = "" }) => {
  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground ${className}`}>
      <AppBar />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};
