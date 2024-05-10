import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinOhlcv } from "../routes/api";
import ApexCharts from "react-apexcharts";
// import { theme } from "../styles/Theme";
import styled from "styled-components";

interface IChartContext {
  coinId: string;
}

interface IChartData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

function Chart() {
  const { coinId } = useOutletContext<IChartContext>();
  const { isLoading, data } = useQuery<IChartData[]>(["chart", coinId], () =>
    fetchCoinOhlcv(coinId)
  );

  return (
    <div>
      {isLoading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(3)}`,
              },
            },
            chart: {
              background: "transparent",
              height: 500,
              width: 500,
              toolbar: { show: false },
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              type:"datetime",
              labels: {
                show: false,
                datetimeFormatter: { month: "mmm 'yy" },
              },
              categories:
                data?.map(
                  (price) => new Date(price.time_close * 1000).toUTCString()
                ) ?? [],
            },
            yaxis: {
              show: false,
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#6876F6"], stops: [0, 100] },
            },
            colors: ["#C987C5"],
          }}
        />
      )}
    </div>
  );
}

export default Chart;
