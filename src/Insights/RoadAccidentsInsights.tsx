import TableauEmbed from "../components/TableauEmbed";

const RoadAccidentsInsights = () => {
  return (
    <>
      <div className="pt-10 pb-16 bg-[#F2F2F2] shadow-md">
        <div className="flex justify-between w-11/12 mx-auto">
          <div>
            <p className="mb-3 text-center text-xl font-bold">Road Accidents</p>
          </div>
          <TableauEmbed url="https://public.tableau.com/views/dynamic_17113649522640/Dashboard?:language=en-GB&publish=yes&:sid=&:display_count=n&:origin=viz_share_link" />
        </div>
      </div>

      <TableauEmbed url="https://public.tableau.com/views/Visualisations_17110383019890/TrafficAccidentsDashboard?:language=en-GB&:sid=&:display_count=n&:origin=viz_share_link" />
    </>
  );
};

export default RoadAccidentsInsights;