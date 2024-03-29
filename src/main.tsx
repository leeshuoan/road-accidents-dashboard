import "./main.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./Real-Time-Dashboard/Dashboard";
import RoadAccidentsInsights from "./Insights/RoadAccidentsInsights";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="accidentanalysis" element={<RoadAccidentsInsights />} />
    </Routes>
  </BrowserRouter>
);
