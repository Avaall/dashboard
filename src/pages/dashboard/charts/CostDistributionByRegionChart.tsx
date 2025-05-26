import { Box, Typography, Tooltip } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, ChartTooltip, Legend);

const CostDistributionByRegionChart = () => {
  const data = {
    labels: ['US-East', 'EU-West', 'Asia-South'],
    datasets: [{
      label: 'Cost',
      data: [5000, 3000, 2000],
      backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384']
    }]
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Tooltip
        title="Este gráfico muestra cómo se distribuyen los costos entre regiones geográficas. Es útil para entender el impacto regional del consumo en la nube. Un gráfico de pastel permite visualizar rápidamente las proporciones relativas."
        placement="top"
        arrow
      >
        <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
          Distribución de Costos por Región
        </Typography>
      </Tooltip>
      <Box width="100%" maxWidth={600}>
        <Pie data={data} />
      </Box>
    </Box>
  );
};

export default CostDistributionByRegionChart;