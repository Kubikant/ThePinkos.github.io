import SunCalc from 'suncalc'

export function slnkoCalc(date) {
  // Bratislava's coordinates
  var zemSirka = 49.2231
  var zemDlzka = 18.7394

  // Get today's date
  const today = new Date(date)

  // Calculate sunrise, solar noon, and sunset
  const sunTimes = SunCalc.getTimes(today, zemSirka, zemDlzka)

  // Format the times in the Bratislava timezone (CET)
  const formatTime = (date) => date.toLocaleTimeString('sk-SK', { hour: 'numeric', minute: '2-digit', hour12: false, timeZone: 'Europe/Bratislava' })

  const sunrise = formatTime(sunTimes.sunrise)
  const solarNoon = formatTime(sunTimes.solarNoon)
  const sunset = formatTime(sunTimes.sunset)

  return [sunrise, solarNoon, sunset]
}
