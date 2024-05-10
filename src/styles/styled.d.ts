import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    accentColor: string;
    sectionColor: string;
    borderColor: string;
    baseCardColor: string;
  }
}
