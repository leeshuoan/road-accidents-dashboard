import { NavLink } from "react-router-dom";
import Singapore from "../assets/Singapore.png";

const Navbar = () => {
  return (
    <>
      <nav className="pt-4 pb-4 bg-white bg-opacity-90 sticky top-0 shadow-md z-50">
        <div className="mx-auto w-11/12 grid grid-cols-3">
          <div className="flex items-center text-xl font-bold col-span-1">
            <img
              src={Singapore}
              className="border-black"
              alt="Singapore Image"
              width={30}
            />
            <p className="pl-2">Road Accidents Singapore</p>
          </div>
          <div className="flex items-center justify-center gap-5 font-bold text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "relative group text-red-600"
                  : "relative group hover:text-red-400"
              }
            >
              Real-Time Dashboard
              <span
                style={{ height: "1.5px" }}
                className="absolute w-full rounded-md bg-red-400 bottom-0 left-0 origin-right transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:origin-left group-hover:scale-x-100"
              ></span>
            </NavLink>
            <NavLink
              to="/accidentanalysis"
              className={({ isActive }) =>
                isActive
                  ? "relative group text-red-600"
                  : "relative group hover:text-red-400"
              }
            >
              <span
                style={{ height: "1.5px" }}
                className="absolute w-full rounded-md bg-red-400 bottom-0 left-0 origin-right transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:origin-left group-hover:scale-x-100"
              ></span>
              Accident Analysis
            </NavLink>
            <NavLink
              to="/publictransportanalysis"
              className={({ isActive }) =>
                isActive
                  ? "relative group text-red-600"
                  : "relative group hover:text-red-400"
              }
            >
              <span
                style={{ height: "1.5px" }}
                className="absolute w-full rounded-md bg-red-400 bottom-0 left-0 origin-right transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:origin-left group-hover:scale-x-100"
              ></span>
              Public Transport Analysis
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
