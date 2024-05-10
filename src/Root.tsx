import { Outlet } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import ScrollToTop from "./components/ScrollToTop";
import { Theme, darkTheme, lightTheme } from "./styles/Theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = styled.header`
  display: flex;
  height: 20px;
  margin: 0 auto;
  padding: 10px 10px;
`;

const Container = styled.div`
  display: flex;
  gap: 5px;
`;

const HomeBtn = styled.div`
  font-size: 10px;
  background-color: ${(props) => props.theme.baseCardColor};
  padding: 4px 8px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
`;

const ModeBtn = styled.button`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  font-size: 9px;
  background-color: ${(props) => props.theme.baseCardColor};
  padding: 9px 9px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
`;

const queryClient = new QueryClient();
function Roots() {
  const [theme, setTheme] = useState(darkTheme);
  const switchMode = () => {
    setTheme((cur) => (cur === darkTheme ? lightTheme : darkTheme));
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <ScrollToTop />
          <Header>
            <Container>
              <ModeBtn onClick={switchMode}>Mode</ModeBtn>
              <Link to={"/"}>
                <HomeBtn>Home</HomeBtn>
              </Link>
            </Container>
          </Header>
          <Outlet context={theme} />
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}

export default Roots;
