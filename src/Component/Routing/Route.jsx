import {  RequiredActiveSession, RequiredCompleteSession, RequiredConfigureSession } from "@/Context/FocusSessionProvider";
import Focus from "../../Pages/Focus";
import FocusSetup from "../../Pages/FocusSetup";
import Home from "../../Pages/Home";
import Statics from "../../Pages/Statics";
import Success from "../../Pages/Success";
import TypingChallenge from "../TypingChallenge";
import { Navigate, Route, Routes } from "react-router-dom";

const AppRoute = () => {
  return (
    <div>
      <Routes>
        <
          Route path="/" element={<Home />} />
        <Route path="/focusMode" element={<FocusSetup />} />



        <Route path="/success" element={
          <RequiredCompleteSession>
          <Success />
          </RequiredCompleteSession>
          } />


        <Route path="/focus" element={
          <RequiredConfigureSession>
          <Focus />
          </RequiredConfigureSession>
          } />

        <Route path="/type" element={
          <RequiredActiveSession>
          <TypingChallenge />
          </RequiredActiveSession>
          } />


        <Route path="/Statics" element={<Statics />} />
        <Route path="/settings" element={<Statics />} />
        {/* <Route path="/a" element={<FeatureSection />} /> */}

      <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </div>
  );
};

export default AppRoute;
