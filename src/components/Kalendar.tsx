const Kalendar = () => {
  const year = new Date().getFullYear(); // Current year is 2024
  const previousYear = year - 1; // Subtract 1 from the current year to get the previous year
  const isLeapYear =
    (previousYear % 4 === 0 && previousYear % 100 !== 0) ||
    previousYear % 400 === 0; // Check if the previous year is a leap year
  const previousYearDays = isLeapYear ? 366 : 365; // Get the total number of days in the previous year
  let count = previousYearDays - 7; // Subtract 7 days from the total number of days in the previous year

  const divs = [];

  for (let i = 0; i < 55; i++) {
    const innerDivs = [];

    for (let j = 0; j < 7; j++) {
      if (count > previousYearDays) {
        count = 1; // Reset count to 1 after reaching the total number of days in the previous year
      }

      innerDivs.push(
        <div key={count} className="inner-div">
          {count}
        </div>
      );
      count++;
    }

    divs.push(
      <div key={i} className="outer-div">
        {innerDivs}
      </div>
    );
  }

  return (
    <>
      <h1>{year}</h1>
      <div className="kalendar">{divs}</div>
    </>
  );
};

export default Kalendar;
