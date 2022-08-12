const APT_KEY = "2dcf4419a57b602fd4fbb7afe2eb692e"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

const getWeatherData = (info , searchParams) => {
    const url = new URL(BASE_URL + "/" + info);
    url.search = new URLSearchParams({...searchParams , appid:APT_KEY})

return fetch(url).then((res) => res.json())

}

export default getWeatherData