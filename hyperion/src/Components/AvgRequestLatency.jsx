import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const AvgRequestLatency = () => {

  const data = {
    labels,
    datasets: [
      {
        label: "EXPECTED SAVINGS PER MONTH",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgba(123, 31, 162)",
        backgroundColor: "rgba(123, 31, 162, 0.5)",
        borderWidth: 1,
      },
      {
        label: "SAVINGS GOAL",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgb(255, 125, 69)",
        backgroundColor: "rgb(255, 125, 69, 0.5)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box>
        <Typography className="data-label" sx={{ fontSize: '1.2rem', letterSpacing: '1.5px', textTransform: 'uppercase'}}>Average Request Latency</Typography>
    </Box>
  )
}
export default AvgRequestLatency;