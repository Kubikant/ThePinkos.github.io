import Fotka from "./components/strana/CastiStrany/Fotka";
import Tyzden from "./components/strana/CastiStrany/Tyzden";
import Poznamky from "./components/strana/CastiStrany/Poznamky";

function Calendar() {
  const year = 2024;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calendarArray: any[] = [];

  //Zisti ci je rok prestupny a vrati 366 alebo 365
  const dayCount = () => {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 366 : 365;
  };

  //Zisti kolko dni je treba pridat na zaciatok a na koniec roka aby sa zacalo v pondelok a skoncilo v nedelu
  const pocetDniDoZadu = [13, 7, 8, 9, 10, 11, 12][
    new Date(year, 0, 1).getDay()
  ];
  const pocetDniDoPredu = [7, 13, 12, 11, 10, 9, 8][
    new Date(year, 11, 31).getDay()
  ];

  //Zisti cislo dna v roku
  const getDayNumber = (date) =>
    Math.floor(
      (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
    );

  //Zisti cislo tyzdna v roku
  const getWeekNumber = (date) => {
    date.setDate(date.getDate() + 4 - (date.getDay() || 7));
    const yearStart = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((+date - +yearStart) / 86400000 + 1) / 7);
    return weekNumber;
  };

  // Generate an array with objects for each day in the year
  for (
    let day = 1 - pocetDniDoZadu;
    day <= dayCount() + pocetDniDoPredu;
    day++
  ) {
    calendarArray.push({
      //Rok
      year: new Date(year, 0, day).getFullYear(),

      //Cislo dna v roku
      dayNumber: getDayNumber(new Date(year, 0, day)),

      //Datum
      date: new Date(year, 0, day).toLocaleDateString("us-US", {
        day: "numeric",
      }),

      //Den v tyzdni
      dayName: new Date(year, 0, day)
        .toLocaleDateString("sk-SK", { weekday: "long" })
        .replace(/^\p{L}/u, (c) => c.toUpperCase()),

      //Mesiac
      month: new Date(year, 0, day)
        .toLocaleDateString("sk-SK", { month: "long" })
        .replace(/^\p{L}/u, (c) => c.toUpperCase()),

      //Cislo tyzdna v roku
      week: getWeekNumber(new Date(year, 0, day)),
    });
  }

  console.log(calendarArray);

  return (
    <div className="kalendar">
      {[...Array(3)].map((_, index) => (
        <div className="strana">
          <Fotka />
          <Tyzden strana={index} calendarArray={calendarArray} />
          <Poznamky />
        </div>
      ))}
    </div>
  );
}

export default Calendar;
