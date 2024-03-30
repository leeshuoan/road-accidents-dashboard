import TableauEmbed from "../components/TableauEmbed";

const PublicTransportInsights = () => {
  return (
    <>
      <div className="pt-10 pb-16 bg-[#F2F2F2]">
        <div className="flex justify-between gap-5 w-11/12 mx-auto">
          <TableauEmbed url="https://public.tableau.com/views/BusDashboard_17117888450920/TrafficAccidentsDashboard?:language=en-GB&:sid=&:display_count=n&:origin=viz_share_link" width="4000px" height="700px" />
          <div>
            <p className="mb-2 text-2xl font-bold">Singapore's Bus Network</p>
            <p className="mb-14 text-lg text-gray-600">
              Singapore's Bus Network forms a significant part of public
              transport in Singapore. Analysing this network could inform
              policies and initiatives geared towards optimising public
              transportation systems and potentially mitigate the impact of
              increased vehicular traffic on road safety
            </p>

            <p className="mb-2 text-lg font-semibold">
              The most passenger tap-ins are concentrated in Woodlands, Jurong West, Tampines
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicTransportInsights;
