import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  bgColor: "#14181D",
  textColor: "#FEFEFE",
  accentColor: "#9c88ff",
  sectionColor: "#181b20",
  borderColor: "#425266",
  baseCardColor: "#403c3c",
  mode: true,
};

export const lightTheme: DefaultTheme = {
  bgColor: "#e9e9e9",
  textColor: "#14181D",
  accentColor: "#9c88ff",
  sectionColor: "#181b20",
  borderColor: "#C3CED7",
  baseCardColor: "white",
  mode: false,
};

export type Theme = typeof lightTheme;

//background white:#FFFFFF black:#010101
//text black:#010101 white:#FFFFFF
//border white: #C3CED7 black:#425266
