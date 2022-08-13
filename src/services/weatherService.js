import { data } from "autoprefixer";

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

  const {main , icon} = weather[0]

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
    main ,
    icon
  };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  return formattedCurrentWeather
};


export default getFormattedWeatherData