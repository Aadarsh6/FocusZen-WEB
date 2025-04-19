import { BrowserRouter} from "react-router-dom";
import AppRoute from "./Component/Routing/Route";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AppRoute/>
      </BrowserRouter>
    </div>
  );
};

export default App;
