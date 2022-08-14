import React, { useState } from "react";
import { Chart, Line } from "react-chartjs-2";
import {
    Chart as ChartJS ,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
    Title,
    Tooltip,
    LineElement,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,   
)


function WeatherChart({items}) {

    const arr = []

    items.map((i) => {
        arr.push(i.temp)
    })

const [data , setData] = useState({
    labels: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "00",
        
      ],
       datasets:[{
        
        label: "Temprature",
        data:arr,
        backgroundColor:"#273c4c",
         borderColor: "#b5dffe" ,
         tension:0.4,
         fill:true,
         pointStyle:"rect",
         pointBorderColor: "gray",
        pointBackgroundColor: "gray",
        showLine: true,
       }]
})


  return <div>
     <hr className="my-2" />
    <Line data={data}></Line>
  </div>;
}

export default WeatherChart;
