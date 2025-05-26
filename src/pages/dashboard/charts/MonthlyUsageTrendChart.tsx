import { Box, Typography, Tooltip } from '@mui/material';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ChartTooltip, Legend);

const MonthlyUsageTrendChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Usage (GB)',
      data: [500, 600, 700, 650, 800],
      borderColor: 'rgba(54, 162, 235, 0.8)',
      fill: false
    }]
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Tooltip
        title="Este gráfico muestra cómo varía el uso de recursos mes a mes. Es útil para identificar estacionalidad o picos inesperados. Una línea temporal permite visualizar tendencias de crecimiento o decrecimiento del consumo."
        placement="top"
        arrow
      >
        <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
          Tendencia Mensual de Uso
        </Typography>
      </Tooltip>
      <Box width="100%" maxWidth={600}>
        <Line data={data} />
      </Box>
    </Box>
  );
};

export default MonthlyUsageTrendChart;