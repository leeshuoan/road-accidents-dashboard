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
        className="shadow-xl"
        style={{ width: "1366px", height: "768px" }} // Set width and height inline styles
      ></div>
    </>
  );
}

export default TableauEmbed;
