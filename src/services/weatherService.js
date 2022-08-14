import { DateTime } from "luxon";

const APT_KEY = "2dcf4419a57b602fd4fbb7afe2eb692e";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (info, searchParams) => {
  const url = new URL(BASE_URL + "/" + info);
  url.search = new URLSearchParams({ ...searchParams, appid: APT_KEY });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lon, lat },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
    weather,
    name,
    dt,
    timezone,
    sys: { country, sunrise, sunset },
  } = data;

  const { main, icon } = weather[0];

  return {
    lon,
    lat,
    temp,
    temp_max,
    temp_min,
    humidity,
    feels_like,
    speed,
    name,
    dt,
    timezone,
    country,
    sunrise,
    sunset,
    main,
    icon,
  };
};

const formatForecastWeather = (data) => {
  let {timezone , daily , hourly} = data;

  daily = daily.slice(1,6).map(d => {
      return {
          title: formatToLocalTime(d.dt , timezone , "ccc"),
          temp:d.temp.day,
          icon:d.weather[0].icon,
      }
  })
  hourly= hourly.map(d => {
      return {
          title: formatToLocalTime(d.dt , timezone , "hh:mm a"),
          temp:d.temp,
          icon:d.weather[0].icon,
      }
  })


  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
