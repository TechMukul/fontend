import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const App = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchHistoricalData() {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        setChartData(data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    }

    fetchHistoricalData();
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Currency Exchange Rates</h1>
      <div id="chartsContainer">
        {Object.keys(chartData).map((currency, index) => {
          const rates = chartData[currency];
          const data = {
            labels: Object.keys(chartData),
            datasets: [
              {
                label: `${currency} Exchange Rate`,
                data: Object.values(chartData),
                fill: false,
                borderColor: getRandomColor(),
                tension: 0.1,
              },
            ],
          };

          return (
            <div key={index} style={{ margin: '20px 0' }}>
              <Line data={data} options={{
                responsive: true,
                plugins: {
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                  },
                },
                scales: {
                  x: {
                    display: true,
                    title: {
                      display: true,
                      text: 'Currency',
                    },
                  },
                  y: {
                    display: true,
                    title: {
                      display: true,
                      text: 'Exchange Rate',
                    },
                  },
                },
              }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
