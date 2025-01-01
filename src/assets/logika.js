import SunCalc from 'suncalc'
import namedays from './meniny.json'
import nasesviatky from './naseSviatky.json'

const year = 2025
export const calendarArray = []

//Zisti rok, ak sa meni v jednom v tyzdni daj do formatu 24/2025
const getYearNumber = (date) => {
  let monday = new Date(date.setDate(date.getDate() - (date.getDay() || 7) + 1))
  let sunday = new Date(date.setDate(date.getDate() + (7 - date.getDay())))

  const firstYear = monday.getFullYear().toString()
  const lastYear = sunday.getFullYear().toString()

  return firstYear !== lastYear ? `${firstYear.substring(2, 4)}/${lastYear}` : firstYear
}

//Zisti ci je rok prestupny a vrati 366 alebo 365
const dayCount = () => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 366 : 365
}

//Zisti kolko dni je treba pridat na zaciatok a na koniec roka aby sa zacalo v pondelok a skoncilo v nedelu
const pocetDniDoZadu = [13, 7, 8, 9, 10, 11, 12][new Date(year, 0, 1).getDay()]
const pocetDniDoPredu = [7, 13, 12, 11, 10, 9, 8][new Date(year, 11, 31).getDay()]

//Zisti cislo dna v roku
const getDayNumber = (date) => {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000
  return Math.floor(diff / 86400000)
}

//Zisti cislo tyzdna v roku
const getWeekNumber = (date) => {
  date.setDate(date.getDate() + 4 - (date.getDay() || 7))
  const yearStart = new Date(date.getFullYear(), 0, 1)
  const weekNumber = Math.ceil(((+date - +yearStart) / 86400000 + 1) / 7)
  return weekNumber
}

//Zisti mesiac, ak sa meni v jednom tyzdni daj do formatu Feb/Marec
const getMonthName = (date) => {
  let monday = new Date(date.setDate(date.getDate() - (date.getDay() || 7) + 1))
  let sunday = new Date(date.setDate(date.getDate() + (7 - date.getDay())))

  const firstMonth = monday.toLocaleDateString('sk-SK', { month: 'long' }).replace(/^\w/, (c) => c.toUpperCase())
  const lastMonth = sunday.toLocaleDateString('sk-SK', { month: 'long' }).replace(/^\w/, (c) => c.toUpperCase())

  return firstMonth !== lastMonth ? `${firstMonth.substring(0, 3)}/${lastMonth}` : firstMonth
}

//Zisti vychod, stred, zapad slnka
const slnkoCalc = (date) => {
  var zemSirka = 49.2231
  var zemDlzka = 18.7394

  //Zapise datum dna
  const den = new Date(date)

  //Vypocita pomocou datumu, vychod, stred, zapad slnka
  const sunTimes = SunCalc.getTimes(den, zemSirka, zemDlzka)

  //Naformatuje, aby to bolo v nasom casovom pasme
  const formatTime = (date) =>
    date.toLocaleTimeString('sk-SK', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Europe/Bratislava'
    })

  const sunrise = formatTime(sunTimes.sunrise)
  const solarNoon = formatTime(sunTimes.solarNoon)
  const sunset = formatTime(sunTimes.sunset)

  return [sunrise, solarNoon, sunset]
}

//Vrati sviatky v ten den
const getNaseSviatky = (date) => {
  let sviatky = {}

  for (let i in nasesviatky) {
    for (let j in nasesviatky[i]) {
      if (j == date) {
        sviatky[i] = nasesviatky[i][j]
      }
    }
  }

  return (Object.keys(sviatky).length === 0) ? undefined : sviatky
}

// Vygeneruj Array s objektami pre kazdy den v roku s datumom, cislom dna v roku, nazvom dna, nazvom mesiaca a cislom tyzdna v roku
for (let day = 1 - pocetDniDoZadu; day <= dayCount() + pocetDniDoPredu; day++) {
  calendarArray.push({
    //Rok
    year: getYearNumber(new Date(year, 0, day)),

    //Cislo dna v roku
    dayNumber: getDayNumber(new Date(year, 0, day)),

    //Datum
    date: new Date(year, 0, day).toLocaleDateString('us-US', {
      day: 'numeric'
    }),

    //Den v tyzdni
    dayName: new Date(year, 0, day)
      .toLocaleDateString('sk-SK', { weekday: 'long' })
      .replace(/^\p{L}/u, (c) => c.toUpperCase()),

    //Mesiac
    month: getMonthName(new Date(year, 0, day)),

    //Vychod, stred, zapad slnka
    sun: slnkoCalc(new Date(year, 0, day)).join(' '),

    //Cislo tyzdna v roku
    week: getWeekNumber(new Date(year, 0, day)),

    //Meniny
    nameDay: namedays[new Date(year, 0, day).toLocaleDateString('en-UK', { month: '2-digit', day: '2-digit' })],
    
    //Nase sviatky (meniny, narodeniny, medz. dni atd.)
    naseSviatky: getNaseSviatky(new Date(year, 0, day).toLocaleDateString('en-UK', { month: '2-digit', day: '2-digit' }))
  })
}

console.log(calendarArray)
