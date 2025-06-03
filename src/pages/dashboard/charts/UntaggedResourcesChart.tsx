import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Box, Typography, Tooltip } from '@mui/material';
import { apiService } from '../../../services/api';
import { useApiData } from '../../../hooks/useApiData';
import LoadingErrorWrapper from '../../../components/LoadingErrorWrapper';

ChartJS.register(ArcElement, ChartTooltip, Legend);

const UntaggedResourcesChart = () => {
  const { data, loading, error } = useApiData(() => apiService.getUntaggedResources());

  const chartData = {
    labels: data?.labels || [],
    datasets: [{
      label: 'Recursos',
      data: data?.data || [],
      backgroundColor: ['#4BC0C0', '#FF6384'],
      borderColor: ['#4BC0C0', '#FF6384'],
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed.toLocaleString()} recursos (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Tooltip
        title="Este gráfico muestra la proporción de recursos que tienen etiquetas versus los que no las tienen. Es fundamental para la gobernanza de la nube, ya que las etiquetas permiten rastrear costos y responsabilidades."
        placement="top"
        arrow
      >
        <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
          Recursos Etiquetados vs No Etiquetados
        </Typography>
      </Tooltip>
      <Box width="100%" maxWidth={400}>
        <LoadingErrorWrapper loading={loading} error={error}>
          <Pie data={chartData} options={options} />
        </LoadingErrorWrapper>
      </Box>
    </Box>
  );
};

export default UntaggedResourcesChart;