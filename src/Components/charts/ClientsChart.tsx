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


const options = {
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



export function ClientsChart({ clientsArray, clientsDetailArray }: {
  clientsArray: string[], clientsDetailArray: {
    clientName: string;
    total: number;
    totalProfit: number;
  }[]
}) {

  const labels = clientsArray;

  const Total = clientsDetailArray.map( c => c.total );
  const TotalProfits = clientsDetailArray.map ( c => c.totalProfit);

  const data = {
    labels,
    datasets: [
      {
        label: 'Ingresos',
        data: Total,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Ganancias',
        data: TotalProfits,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };



  return <Bar options={options} data={data} />;
}

