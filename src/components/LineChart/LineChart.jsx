import { Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJs, plugins } from "chart.js/auto";

const options = {
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        y: {
            ticks: {
                stepSize: 1,
            },
            grid: {
                display: true,
            },
        },
    },
}

function LineChart({chartData}) {
  return (
    <Line 
        data={chartData}
        options={options}
    />
  )
}

export default LineChart