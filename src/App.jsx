import { BrowserRouter, Router } from "react-router-dom";
import AppRoute from "./Component/Routing/Route";
// import { SpeedInsights } from "@vercel/speed-insights/react"
import { FocusSessionProvider } from "./Context/FocusSessionProvider";

const App = () => {
  return (
    <div>
      
      {/* <SpeedInsights/> */}
      <BrowserRouter>
      <FocusSessionProvider>
        <AppRoute/>
        </FocusSessionProvider>
        </BrowserRouter>
      
    </div>
  );
};
export default App;
