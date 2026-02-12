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
      <AppBar>
        <AppBar.Desktop>
          <AppBar.Nav>
            <AppBar.DarkModeToggle />
            <AppBar.NavLink href="#home">Home</AppBar.NavLink>
            <AppBar.NavLink href="#about">Über mich</AppBar.NavLink>
          </AppBar.Nav>
          <AppBar.Logo />
          <AppBar.Nav>
            <AppBar.NavLink href="#projects">Projekte</AppBar.NavLink>
            <AppBar.NavLink href="#contact">Kontakt</AppBar.NavLink>
          </AppBar.Nav>
        </AppBar.Desktop>

        <AppBar.Mobile>
          <div className="w-10" />
          <AppBar.Logo className="text-xl" />
          <AppBar.MenuButton />
        </AppBar.Mobile>

        <AppBar.Divider />

        <AppBar.MobileMenu>
          <AppBar.NavLink href="#home" className="text-2xl">Home</AppBar.NavLink>
          <AppBar.NavLink href="#about" className="text-2xl">Über mich</AppBar.NavLink>
          <AppBar.NavLink href="#projects" className="text-2xl">Projekte</AppBar.NavLink>
          <AppBar.NavLink href="#contact" className="text-2xl">Kontakt</AppBar.NavLink>
          <AppBar.DarkModeToggle />
        </AppBar.MobileMenu>
      </AppBar>

      <Main>{children}</Main>

      <Footer>
        <Footer.Copyright />
        <Footer.SocialLinks />
      </Footer>
    </div>
  );
};
