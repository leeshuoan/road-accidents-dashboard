import "./main.css";
import ReactDOM from "react-dom/client";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="mx-auto w-11/12 mt-4">
    <Navbar />
    <Dashboard />
  </div>
);
