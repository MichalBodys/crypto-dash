import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

const API_URL = import.meta.env.VITE_API_COIN_URL;

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale, Filler);

export default function CoinChart({ coinId }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!coinId) return; 

    const fetchPrices = async () => {
      try {
        const res = await fetch(`${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`);
        if (!res.ok) throw new Error('Failed to fetch chart data');
        const data = await res.json();
        if (!data?.prices) throw new Error('No prices returned');

        const prices = data.prices.map(([timestamp, price]) => ({
          x: timestamp,
          y: price,
        }));

        setChartData({
          datasets: [
            {
              label: 'Price (USD)',
              data: prices,
              fill: true, // ✅ works now because Filler is registered
              borderColor: '#007bff',
              backgroundColor: 'rgba(0,123,255,0.1)',
              pointRadius: 0,
              tension: 0.3,
            },
          ],
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [coinId]);

  if (loading) return <p>Loading Chart...</p>;

  return (
    <div style={{ marginTop: '30px' }}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false },
          },
          scales: {
            x: {
              type: 'time',
              time: { unit: 'day' },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 7,
              },
            },
            y: {
              ticks: {
                callback: (value) => `$${value.toLocaleString()}`,
              },
            },
          },
        }}
      />
    </div>
  );
}
