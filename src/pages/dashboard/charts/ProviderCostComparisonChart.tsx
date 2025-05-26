import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, Typography, Tooltip } from '@mui/material';

ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTooltip, Legend);

const ProviderCostComparisonChart = () => {
  const data = {
    labels: ['AWS', 'Azure', 'GCP'],
    datasets: [{
      label: 'Cost ($)',
      data: [4000, 3200, 2800],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Tooltip
        title="Este gráfico permite comparar los costos entre distintos proveedores en un mismo período. Es útil para evaluar opciones de migración o entender dónde se concentra el gasto. La gráfica de barras es ideal para esta comparación directa."
        placement="top"
        arrow
      >
        <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
          Comparativo de Costos entre Proveedores
        </Typography>
      </Tooltip>
      <Box width="100%" maxWidth={600}>
        <Bar data={data} />
      </Box>
    </Box>
  );
};

export default ProviderCostComparisonChart;