import { createBrowserRouter } from "react-router-dom";
import Coins from "./screens/Coins";
import Coin from "./screens/Coin";
import Root from "./Root";
import Chart from "./components/Chart";
import Price from "./components/Price";
import NotFound from "./screens/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Coins />
      },
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          {
            path: "chart",
            element: <Chart />
          },
          { 
            path: "price",
            element:<Price />
          }
        ]
      }
    ],
    errorElement:<NotFound />
  }
]
)

export default router;
