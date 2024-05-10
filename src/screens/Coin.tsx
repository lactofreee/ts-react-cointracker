import {
  Link,
  useParams,
  Outlet,
  useMatch,
  useOutletContext,
} from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinPrice } from "../routes/api";
import { Helmet } from "react-helmet-async";

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: {
    id: string;
    name: string;
    coin_counter: number;
    ico_counter: number;
  }[];
  team: {
    id: string;
    name: string;
    position: string;
  }[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: {
    explorer?: string[];
    facebook?: string[];
    reddit?: string[];
    source_code?: string[];
    website?: string[];
    youtube?: string[];
  };
  links_extended: {
    url: string;
    type: string;
    stats?: {
      subscribers?: number;
      contributors?: number;
      stars?: number;
      followers?: number;
    };
  }[];
  whitepaper: {
    link: string;
    thumbnail: string;
  };
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

interface RouteState {
  name: string;
}

interface IIsActive {
  readonly $isActive: boolean;
}

interface IIsFetched {
  $isfetched: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 5vh;
  display: flex;
  padding: 20px;
  margin: 20px;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 40px;
  color: ${(props) => props.theme.accentColor};
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const Section = styled.div`
  background-color: ${(props) => props.theme.baseCardColor};
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border-radius: 10px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  span:first-child {
    font-size: 10px;
  }
  span:nth-child(2) {
    font-size: 14px;
  }
`;

const PriceItem = styled(Item)<IIsFetched>`
  color: ${(props) =>
    props.$isfetched ? props.theme.accentColor : props.theme.textColor};
`;

const Description = styled.div`
  font-size: 15px;
  padding: 20px 10px;
`;

const Taps = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 5px 0px;
  gap: 10px;
`;

const Tab = styled.span<IIsActive>`
  background-color: ${(props) => props.theme.baseCardColor};
  padding: 7px 0px;
  border-radius: 10px;
  text-transform: uppercase;
  text-align: center;
  font-weight: 400;
  color: ${(props) =>
    props.$isActive ? props.theme.accentColor : props.theme.textColor};
`;

function Coin() {
  const { coinId } = useParams();

  const chartMatch = useMatch("/:coinid/chart");
  const priceMatch = useMatch("/:coinId/price");
  const { isLoading: isInfoLoading, data: infoData } = useQuery(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );
  const {
    isRefetching: ispricefetched,
    isLoading: ispriceLoading,
    data: priceData,
  } = useQuery(["price", coinId], () => fetchCoinPrice(coinId!), {
    refetchInterval: 300000,
  });

  // const [info, setInfo] = useState<IInfoData>();
  // const [price, setPrice] = useState<IPriceData>();
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   (async () => {
  //     const InfoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const PriceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setPrice(PriceData);
  //     setInfo(InfoData);
  //     setIsLoading(false);
  //   })();
  // }, []);
  const loading = isInfoLoading || ispriceLoading;

  return (
    <Container>
      <Helmet>
        <title>Coin Tracker | {coinId}</title>
      </Helmet>
      {loading ? (
        <LoaderWrapper>
          <Loader></Loader>
        </LoaderWrapper>
      ) : (
        <Wrapper>
          <Header>
            <Title>{infoData.symbol}</Title>
          </Header>
          <Section>
            <Item>
              <span>RANK: </span>
              <span>{infoData?.rank}</span>
            </Item>
            <Item>
              <span>SYMBOL: </span>
              <span>${infoData?.symbol}</span>
            </Item>
            <PriceItem $isfetched={ispricefetched}>
              <span>PRICE: </span>
              <span>{priceData?.quotes.USD.price.toFixed(3)}</span>
            </PriceItem>
          </Section>
          <Description>{infoData?.description.slice(0, 150)}...</Description>
          <Section>
            <Item>
              <span>TOTAL SUPPLY: </span>
              <span>{priceData?.total_supply}</span>
            </Item>
            <Item>
              <span>MAX SUPPLY: </span>
              <span>{priceData?.max_supply}</span>
            </Item>
          </Section>
          <Taps>
            <Tab $isActive={chartMatch !== null}>
              <Link to="chart">chart</Link>
            </Tab>
            <Tab $isActive={priceMatch !== null}>
              <Link to="price">price</Link>
            </Tab>
          </Taps>
          <Outlet context={{ coinId: coinId }} />
        </Wrapper>
      )}
    </Container>
  );
}

export default Coin;
