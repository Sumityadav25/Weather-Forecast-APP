import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

function ForecastChart({ forecast }) {
  const data = {
    labels: forecast.map(f => new Date(f.dt_txt).toLocaleDateString()),
    datasets: [{
      label: 'Temp °C',
      data: forecast.map(f => f.main.temp),
      borderColor: 'blue',
      backgroundColor: 'lightblue',
      fill: false,
      tension: 0.3
    }]
  };

  return (
    <div className="forecast-chart">
      <h3>📈 5-Day Forecast</h3>
      <Line data={data} />
    </div>
  );
}

export default ForecastChart;
