import { 
  RequireActiveSession, 
  RequireCompleteSession, 
  RequireConfiguredSession 
} from "@/Context/FocusSessionProvider";
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
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/focusMode" element={<FocusSetup />} />
        <Route path="/Statics" element={<Statics />} />
        <Route path="/settings" element={<Statics />} />

        {/* Protected routes */}
        <Route 
          path="/success" 
          element={
            <RequireCompleteSession>
              <Success />
            </RequireCompleteSession>
          } 
        />

        <Route 
          path="/focus" 
          element={
            <RequireConfiguredSession>
              <Focus />
            </RequireConfiguredSession>
          } 
        />

        <Route 
          path="/type" 
          element={
            <RequireActiveSession>
              <TypingChallenge />
            </RequireActiveSession>
          } 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default AppRoute;