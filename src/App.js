import "./App.css";
import TopButton from "./components/TopButton";
import Input from "./components/Input";
import TimeAndLocation from "./components/TimeAndLocation";
import TempratureAndDetails from "./components/TempratureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";


function App() {

  const fetchWeather = async () => {
    const data = await getFormattedWeatherData( {q:"London"});
    console.log(data)
  }

  fetchWeather()
  

  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
      <TopButton />
      <Input />
      <TimeAndLocation/>
      <TempratureAndDetails/>
      <Forecast title={"Hourly Forecast"}/>
      <Forecast title={"Daily Forecast"}/>
    </div>
  );
}

export default App;
