import { Box, Typography, Tooltip } from '@mui/material';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, ChartTooltip, Legend);

const CostProjectionChart = () => {
  const data = {
    labels: ['June', 'July', 'August', 'September'],
    datasets: [{
      label: 'Projected Cost ($)',
      data: [4500, 4700, 4900, 5100],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true
    }]
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Tooltip
        title="Este gráfico muestra cómo podrían evolucionar los costos en los próximos meses, permitiendo planificar presupuestos y anticipar necesidades de ahorro. Una línea de tiempo proyectada es ideal para detectar tendencias."
        placement="top"
        arrow
      >
        <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
          Proyección de Costos Futuros
        </Typography>
      </Tooltip>
      <Box width="100%" maxWidth={600}>
        <Line data={data} />
      </Box>
    </Box>
  );
};

export default CostProjectionChart;