const Navbar = () => {
  return (
    <>
      <nav className="pt-5 mb-5 bg-[#eaeae9] bg-opacity-90 sticky top-0 grid grid-cols-3 z-50">
        <div className="text-xl font-bold col-span-1">
          Road Accidents Singapore
        </div>
        <div className="flex items-center justify-center gap-3 font-bold text-sm">
          <a href="/" className="relative group hover:text-red-400">
            Real-Time Dashboard
            <span
              style={{ height: "1.5px" }}
              className="absolute w-full rounded-md bg-red-400 bottom-0 left-0 origin-right transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:origin-left group-hover:scale-x-100"
            ></span>
          </a>
          <a href="/insights" className="relative group hover:text-red-400">
            <span
              style={{ height: "1.5px" }}
              className="absolute w-full rounded-md bg-red-400 bottom-0 left-0 origin-right transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:origin-left group-hover:scale-x-100"
            ></span>
            Insights
          </a>
        </div>

        <div className="col-span-1"></div>
      </nav>
    </>
  );
};

export default Navbar;
