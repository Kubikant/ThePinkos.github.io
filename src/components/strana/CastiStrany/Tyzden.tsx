import Den from "./Tyzden/Den";
import TyzdenInfo from "./Tyzden/TyzdenInfo";

function Tyzden({ strana, calendarArray }) {
  return (
    <div className="tyzden">
      <TyzdenInfo />
      {[...Array(7)].map((_, index) => (
        <Den
          isVikend={index === 5 || index === 6 ? "vikend" : ""}
          seventhInfo={index === 6 ? "seventh" : ""}
          seventhDatum={index === 6 ? "seventhDatum" : ""}
          key={index}
          calendarArray={calendarArray}
          den={index + strana * 7}
        />
      ))}
    </div>
  );
}

export default Tyzden;
