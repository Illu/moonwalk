declare module "*.svg" {
  import { FunctionComponent, SVGProps } from "react";
  const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

import { lightTheme } from "theme";

type ThemeInterface = typeof lightTheme;

declare module "styled-components" {
  interface DefaultTheme extends ThemeInterface {}
}
