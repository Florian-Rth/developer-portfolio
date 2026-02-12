import { AppBar as AppBarComponent } from "./AppBar";
import { DarkModeToggle } from "./DarkModeToggle";
import { Divider } from "./Divider";
import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";
import { MobileMenu } from "./MobileMenu";
import { MobileNavLinks } from "./MobileNavLinks";
import { NavLinks } from "./NavLinks";

type AppBarType = typeof AppBarComponent & {
  Logo: typeof Logo;
  NavLinks: typeof NavLinks;
  MobileNavLinks: typeof MobileNavLinks;
  DarkModeToggle: typeof DarkModeToggle;
  MenuButton: typeof MenuButton;
  MobileMenu: typeof MobileMenu;
  Divider: typeof Divider;
};

const AppBar = AppBarComponent as AppBarType;
AppBar.Logo = Logo;
AppBar.NavLinks = NavLinks;
AppBar.MobileNavLinks = MobileNavLinks;
AppBar.DarkModeToggle = DarkModeToggle;
AppBar.MenuButton = MenuButton;
AppBar.MobileMenu = MobileMenu;
AppBar.Divider = Divider;

export { AppBar };
