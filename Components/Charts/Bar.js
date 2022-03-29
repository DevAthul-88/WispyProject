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
    scales: {
      xAxes: [{ barPercentage: 0.5 }],
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

  const labels = projects.map(e => {return e.priority});

  const data = {
    labels,
    datasets: [
     
      {
        data: projects.map(e => {return e.priority}),
        backgroundColor: "#48BB78",
      },
      
    ],
  };
  return <Bar options={options} data={data} />;
}
