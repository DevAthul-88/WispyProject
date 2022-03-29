import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export function BarChart({ projects }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
   
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Projects by priority",
      },
    },
  };
  const counts = {};
  const pri = projects.map(e => {return e.priority});
  pri.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; })
  const label = pri
  console.log(pri);
  const data = {
    label,
    datasets: [
     
      {
        label:"Projects found",
        data:counts,
        backgroundColor: "#ED64A6",
      },
      
    ],
  };
  return <Bar options={options} data={data} />;
}
