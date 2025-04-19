import Focus from "../../Pages/Focus";
import FocusSetup from "../../Pages/FocusSetup";
import Home from "../../Pages/Home";
// import FocusSetup from '../../Pages/FocusSetup'
import Success from "../../Pages/Success";
import TypingChallenge from "../TypingChallenge";
import { Route, Routes } from "react-router-dom";

const AppRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/focusMode" element={<FocusSetup />} />
        <Route path="/success" element={<Success />} />
        <Route path="/type" element={<TypingChallenge />} />
        <Route path="/focus" element={<Focus />} />
      </Routes>
    </div>
  );
};

export default AppRoute;
