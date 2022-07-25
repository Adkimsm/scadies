import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import ReactDOM from "react-dom/client";
import App from "./views/App";
import Login from "./views/Login";
import Reg from "./views/Reg";
import Auth from "./components/Auth";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <GeistProvider>
      <CssBaseline />
      <Auth>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reg" element={<Reg />} />
          </Routes>
        </BrowserRouter>
      </Auth>
    </GeistProvider>
  </StrictMode>
);
