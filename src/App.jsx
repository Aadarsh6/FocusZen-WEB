import { BrowserRouter} from "react-router-dom";
import AppRoute from "./Component/Routing/Route";
import { SpeedInsights } from "@vercel/speed-insights/react"

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <SpeedInsights/>
        <AppRoute/>
      </BrowserRouter>
    </div>
  );
};

export default App;
