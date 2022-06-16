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


interface DataProps {
  data: {
    labels: string[];
    datasets: dataSetProps[]
  }
}

interface dataSetProps {
  label: string;
  data: number[];
  backgroundColor: string;
}

export function ProductChartPercentage({data}:DataProps) {
  return <Bar options={options} data={data} />;
}

