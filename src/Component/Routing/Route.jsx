import Focus from "../../Pages/Focus";
import FocusSetup from "../../Pages/FocusSetup";
import Home from "../../Pages/Home";
import Statics from "../../Pages/Statics";
// import FocusSetup from '../../Pages/FocusSetup'
import Success from "../../Pages/Success";
import TypingChallenge from "../TypingChallenge";
import { Route, Routes } from "react-router-dom";
// import ProblemSection from "../UI/ProblemSection";
// import { FeatureSection } from "../UI/FeatureSection";

const AppRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/focusMode" element={<FocusSetup />} />
        <Route path="/success" element={<Success />} />
        <Route path="/type" element={<TypingChallenge />} />
        <Route path="/Statics" element={<Statics />} />
        <Route path="/focus" element={<Focus />} />
        {/* <Route path="/a" element={<FeatureSection />} /> */}
      </Routes>
    </div>
  );
};

export default AppRoute;
