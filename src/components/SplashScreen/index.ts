import { Container } from "./Container";
import { Logo } from "./Logo";
import { SplashScreen as SplashScreenComponent } from "./SplashScreen";
import { SplashScreenWrapper } from "./SplashScreenWrapper";

type SplashScreenType = typeof SplashScreenComponent & {
  Container: typeof Container;
  Logo: typeof Logo;
  Wrapper: typeof SplashScreenWrapper;
};

const SplashScreen = SplashScreenComponent as SplashScreenType;
SplashScreen.Container = Container;
SplashScreen.Logo = Logo;
SplashScreen.Wrapper = SplashScreenWrapper;

export { SplashScreen };
