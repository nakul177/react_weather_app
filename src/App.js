import "./App.css";
import TopButton from "./components/TopButton";
import Input from "./components/Input";
import TimeAndLocation from "./components/TimeAndLocation";
import TempratureAndDetails from "./components/TempratureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";


function App() {

  const [query , setQurey] = useState({q:"Pune"})
  const [units , setUnits] = useState("metric")
  const [weather , setWeather] = useState(null)


  useEffect(() => {
    const fetchWeather = async () => {
     getFormattedWeatherData({...query , units}).then((data) => {
    setWeather(data)
     });
    };
  
    fetchWeather()
  },[query , units])

  console.log(weather)


  const formatBg = () => {
    if(!weather) return "from-cyan-700 to-blue-700"
    const threshold = units==="metric" ? 20 : 60 ;
    if(weather.temp >= threshold) return "from-cyan-700 to-blue-700"
    return "from-yellow-700 to-orange-700"
  }

  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br ${formatBg()} h-fit shadow-xl shadow-gray-400`}>

      <TopButton />
      <Input setQurey={setQurey} units={units} setUnits={setUnits} />

  {weather&& (
    <>
      <TimeAndLocation  weather={weather}/>
      <TempratureAndDetails  weather={weather}/>
      <Forecast title={"Hourly Forecast"}  items={weather.hourly}/>
      <Forecast title={"Daily Forecast"}  items={weather.daily}/>
    </>
  )}

    
    </div>
  );
}

export default App;
