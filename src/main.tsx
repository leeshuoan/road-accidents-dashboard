import "./main.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./Real-Time-Dashboard/Dashboard";
import Insights from "./Insights/Insights";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <div className="mx-auto w-11/12">
      <Navbar />
      <Routes>
        <Route path="/" element={ <Dashboard/> } />
        <Route path="insights" element={ <Insights/> } />
      </Routes>
    </div>
  </BrowserRouter>
);
