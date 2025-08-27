import { BrowserRouter, Router } from "react-router-dom";
import AppRoute from "./Component/Routing/Route";
import { FocusSessionProvider } from "./Context/FocusSessionProvider";

const App = () => {
  return (
    <div>
      
      <BrowserRouter>
      <FocusSessionProvider>
        <AppRoute/>
        </FocusSessionProvider>
        </BrowserRouter>
      
    </div>
  );
};
export default App;
