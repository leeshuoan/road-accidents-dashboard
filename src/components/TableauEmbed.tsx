import { useRef, useEffect } from "react";
const { tableau } = window as any;

function TableauEmbed({ url, width, height }: { url: string, width: string, height: string }) {
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
        style={{ width: width, height: height }}
      ></div>
    </>
  );
}

export default TableauEmbed;
