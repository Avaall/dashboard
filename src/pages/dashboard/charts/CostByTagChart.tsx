import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Box, Typography, Tooltip } from '@mui/material';

ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTooltip, Legend);

const CostByTagChart = () => {
  const data = {
    labels: ['Production', 'Development', 'Testing'],
    datasets: [{
      label: 'Cost by Environment ($)',
      data: [4800, 3200, 1100],
      backgroundColor: ['#4caf50', '#2196f3', '#ff9800']
    }]
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Tooltip
        title="Este gráfico muestra el costo total agrupado por valores de etiquetas, como 'Environment'. Es esencial para entender qué entornos o aplicaciones están generando mayor gasto."
        arrow
      >
        <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
          Costos por Valor de Etiqueta (Environment)
        </Typography>
      </Tooltip>
      <Box width="100%" maxWidth={600}>
        <Bar data={data} />
      </Box>
    </Box>
  );
};

export default CostByTagChart;