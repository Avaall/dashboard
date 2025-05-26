import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Box, Typography, Tooltip } from '@mui/material';

ChartJS.register(ArcElement, ChartTooltip, Legend);

const UntaggedResourcesChart = () => {
  const data = {
    labels: ['Tagged', 'Untagged'],
    datasets: [{
      label: 'Tag Coverage',
      data: [82, 18],
      backgroundColor: ['#2196f3', '#f44336']
    }]
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Tooltip
        title="Visualiza el porcentaje de recursos etiquetados frente a los que no lo están. Un buen porcentaje de cobertura de tags es esencial para una gobernanza y costeo adecuados."
        arrow
      >
        <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
          Cobertura de Etiquetas (Tag Coverage)
        </Typography>
      </Tooltip>
      <Box width="100%" maxWidth={600}>
        <Pie data={data} />
      </Box>
    </Box>
  );
};

export default UntaggedResourcesChart;