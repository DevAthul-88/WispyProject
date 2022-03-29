import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';



export function PieChart({ticket}) {
  ChartJS.register(ArcElement, Tooltip, Legend);


 const options = {
  maintainAspectRatio : false,
  title: {
    display: true,
    text: "Tickets by priority",
  },
}

 const data = {

  labels: ['In progress', 'Completed', 'Waiting', 'Decline'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        
      ],
      borderWidth: 1,
    },
  ],
};
  return <Pie data={data} options={options}/>;
}