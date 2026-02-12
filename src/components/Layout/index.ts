import { Layout as LayoutComponent } from "./Layout";
import { Main } from "./Main";

type LayoutType = typeof LayoutComponent & {
  Main: typeof Main;
};

const Layout = LayoutComponent as LayoutType;
Layout.Main = Main;

export { Layout };
