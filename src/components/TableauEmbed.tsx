import { useRef, useEffect } from "react";
const { tableau } = window as any;

function TableauEmbed({ url }: { url: string }) {
  const ref = useRef(null);

  function initViz() {
    new tableau.Viz(ref.current, url);
  }

  useEffect(() => {
    initViz();
  }, [url]);

  return (
    <>
      <div
        ref={ref}
        className="shadow-xl pb-6"
        style={{ width: "1200px", height: "800px" }}
      ></div>
    </>
  );
}

export default TableauEmbed;
