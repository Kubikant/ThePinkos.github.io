function Den({ den, calendarArray, isVikend, seventhInfo, seventhDatum }) {
  return (
    <div className={`den ${isVikend}`}>
      <div className={`datum ${seventhDatum}`}>{calendarArray[den].date}</div>
      <div className={`info ${seventhInfo}`}>{calendarArray[den].dayName}</div>
    </div>
  );
}

export default Den;
