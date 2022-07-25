import { useAuth } from "../components/Auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const { authed } = useAuth();
  console.log(authed);
  const goTo = useNavigate();
  
  useEffect(() => {
    if (authed == false) {
      console.log("goto");
      goTo("/login", { replace: true });
    }
  });

  return <div className=""></div>;
}

export default App;
