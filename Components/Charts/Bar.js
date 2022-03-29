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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    xAxes: [{ barPercentage: 0.5 }]
},
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

const labels = ["None" , "Low" , "Medium" , "High" ];

export const data = {
  labels,
  datasets: [
    {
      label: "None",
      data: labels.map(() => Math.floor(Math.random() * 10)),
      backgroundColor: "#A0AEC0",
    },
    {
      label: "Low",
      data: labels.map(() => Math.floor(Math.random() * 10)),
      backgroundColor: "#48BB78",
    },
    {
      label: "Medium",
      data: labels.map(() => Math.floor(Math.random() * 10)),
      backgroundColor: "#F6E05E",
    },
    {
      label: "High",
      data: labels.map(() => Math.floor(Math.random() * 10)),
      backgroundColor: "#E53E3E",
    },
  ],
};

export function BarChart({project}) {
  return <Bar options={options} data={data} />;
}
