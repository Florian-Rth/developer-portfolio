import { AppBar as AppBarComponent } from "./AppBar";
import { DarkModeToggle } from "./DarkModeToggle";
import { Desktop } from "./Desktop";
import { Divider } from "./Divider";
import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";
import { Mobile } from "./Mobile";
import { MobileMenu } from "./MobileMenu";
import { Nav } from "./Nav";
import { NavLink } from "./NavLink";

type AppBarType = typeof AppBarComponent & {
  Desktop: typeof Desktop;
  Mobile: typeof Mobile;
  Logo: typeof Logo;
  Nav: typeof Nav;
  NavLink: typeof NavLink;
  DarkModeToggle: typeof DarkModeToggle;
  MenuButton: typeof MenuButton;
  MobileMenu: typeof MobileMenu;
  Divider: typeof Divider;
};

const AppBar = AppBarComponent as AppBarType;
AppBar.Desktop = Desktop;
AppBar.Mobile = Mobile;
AppBar.Logo = Logo;
AppBar.Nav = Nav;
AppBar.NavLink = NavLink;
AppBar.DarkModeToggle = DarkModeToggle;
AppBar.MenuButton = MenuButton;
AppBar.MobileMenu = MobileMenu;
AppBar.Divider = Divider;

export { AppBar };
