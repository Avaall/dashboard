import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, Typography, Tooltip } from '@mui/material';

ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTooltip, Legend);

const ProjectCostChart = () => {
  const data = {
    labels: ['Project A', 'Project B', 'Project C'],
    datasets: [{
      label: 'Cost ($)',
      data: [2000, 3000, 2500],
      backgroundColor: '#9966FF'
    }]
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Tooltip
        title="Este gráfico muestra el costo total agrupado por proyecto. Es útil para evaluar cómo se distribuye el gasto entre distintas iniciativas o equipos. El uso de una gráfica de barras permite comparar rápidamente los niveles de gasto."
        placement="top"
        arrow
      >
        <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
          Costos por Proyecto
        </Typography>
      </Tooltip>
      <Box width="100%" maxWidth={600}>
        <Bar data={data} />
      </Box>
    </Box>
  );
};

export default ProjectCostChart;