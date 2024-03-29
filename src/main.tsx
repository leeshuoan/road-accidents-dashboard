import "./main.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./Real-Time-Dashboard/Dashboard";
import RoadAccidentsInsights from "./Insights/RoadAccidentsInsights";
import PublicTransportInsights from "./Insights/PublicTransportInsights";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="accident-analysis" element={<RoadAccidentsInsights />} />
      <Route
        path="public-transport-analysis"
        element={<PublicTransportInsights />}
      />
    </Routes>
  </BrowserRouter>
);
