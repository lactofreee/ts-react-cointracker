import styled, { DefaultTheme } from "styled-components";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../routes/api";
import { Helmet } from "react-helmet-async";
import { lightTheme, darkTheme } from "../styles/Theme";
import { useState } from "react";



const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 10vh;
  display: flex;
  padding: 20px;
  margin: 20px;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 40px;
  color: ${(props) => props.theme.accentColor};
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  display: flex;
  background-color: ${(props) => props.theme.baseCardColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  padding: 10px 20px;
  border-radius: 10px;
  a {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    transition: color 0.1s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Loader = styled.div`
  width: 65px;
  aspect-ratio: 1;
  --g: radial-gradient(
      farthest-side,
      #0000 calc(95% - 3px),
      #fff calc(100% - 3px) 98%,
      #0000 101%
    )
    no-repeat;
  background: var(--g), var(--g), var(--g);
  background-size: 30px 30px;
  animation: l10 1.5s infinite;
  @keyframes l10 {
    0% {
      background-position: 0 0, 0 100%, 100% 100%;
    }
    25% {
      background-position: 100% 0, 0 100%, 100% 100%;
    }
    50% {
      background-position: 100% 0, 0 0, 100% 100%;
    }
    75% {
      background-position: 100% 0, 0 0, 0 100%;
    }
    100% {
      background-position: 100% 100%, 0 0, 0 100%;
    }
  }
`;

const Img = styled.img`
  height: 35px;
  width: 35px;
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoins[]>("allCoins", fetchCoins);
  const curTheme = useOutletContext();
  const [mode, setMode] = useState(curTheme);
  console.log(mode);
  
  // const [coins, setCoins] = useState<CoinObj[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <Container>
      <Helmet>
        <title>Coin Tracker</title>
      </Helmet>
      
      {isLoading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <CoinsList>
          <Header>
            <Link to={"/"}>
              <Title>Coin Tracker</Title>
            </Link>
          </Header>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={`/${coin.id}`}
                state={{
                  name: coin.id,
                }}
              >
                <Img
                  src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                  alt={coin.name}
                />
                {coin.name}
              </Link>
            </Coin>
          ))}
          <Outlet />
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
