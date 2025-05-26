import { Box, Typography, Tooltip } from '@mui/material';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, ChartTooltip, Legend);

const ResourceEfficiencyChart = () => {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Efficiency (%)',
      data: [65, 70, 75, 80],
      borderColor: '#4BC0C0',
      backgroundColor: '#4BC0C0',
      fill: false,
    }]
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Tooltip
        title="Este gráfico permite visualizar la eficiencia de uso de los recursos a lo largo del tiempo. Es útil para identificar patrones de subutilización o sobreuso. Una gráfica de líneas es adecuada para observar tendencias de eficiencia."
        placement="top"
        arrow
      >
        <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
          Eficiencia de Uso de Recursos
        </Typography>
      </Tooltip>
      <Box width="100%" maxWidth={600}>
        <Line data={data} />
      </Box>
    </Box>
  );
};

export default ResourceEfficiencyChart;