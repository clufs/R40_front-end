import { Box, Button, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import './styles.css'

ChartJS.register(ArcElement, Tooltip, Legend);

interface MyPieProps {
  title: string
  values: {
    pending: number;
    inProgress: number;
    finished: number;
  }
}




export const MyPie = ({ title, values }: MyPieProps) => {

  const data = {
    labels: ["Pendiente", "En progreso", "Terminado"],
    datasets: [
      {
        label: "# of Votes",
        data: [values.pending, values.inProgress, values.finished],

        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,

      },

    ],

  };


  return (
    <div className="chart-container contenedor-carta">
      <Pie data={data} options={{ maintainAspectRatio: false }} />
      <Typography paddingTop={2} textAlign='center'>Pendientes: {values.pending} | En progreso: {values.inProgress} |  Terminados: {values.finished}</Typography>
    </div>
  );
};