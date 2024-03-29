import TableauEmbed from "../components/TableauEmbed";

const RoadAccidentsInsights = () => {
  return (
    <>
      <div className="mt-5">
        <div className="flex justify-between">
          <div>
            <p className="mb-3 text-center text-xl font-bold">Road Accidents</p>
          </div>
          <TableauEmbed url="https://public.tableau.com/views/dynamic_17113649522640/Dashboard?:language=en-GB&publish=yes&:sid=&:display_count=n&:origin=viz_share_link" />
        </div>
        
        <TableauEmbed url="https://public.tableau.com/views/Visualisations_17110383019890/TrafficAccidentsDashboard?:language=en-GB&:sid=&:display_count=n&:origin=viz_share_link" />
        <TableauEmbed url="https://public.tableau.com/views/Visualisations_17110383019890/BusDashboard?:language=en-GB&:sid=&:display_count=n&:origin=viz_share_link" />
      </div>
    </>
  );
};

export default RoadAccidentsInsights;
