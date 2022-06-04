import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Los clientes mas rentables.',
    },
  },
};

const labels = ['Alejandra', 'Veronica', 'El gato parrilla'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Ingresos',
      data: [300000, 40500, 150000],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Ingreso Mensual',
      data: [2000, 10000, 100000],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Ganancia',
      data: [100000, 200000, 100000],
      backgroundColor: 'rgba(53, 90, 235, 0.5)',
    },

  ],
};

export function ClientsChart() {
  return <Bar options={options} data={data} />;
}

