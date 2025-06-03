import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, Typography, Tooltip } from '@mui/material';
import { apiService } from '../../../services/api';
import { useApiData } from '../../../hooks/useApiData';
import LoadingErrorWrapper from '../../../components/LoadingErrorWrapper';

ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTooltip, Legend);

const ProviderCostComparisonChart = () => {
  const { data, loading, error } = useApiData(() => apiService.getProviderCostComparison());

  const chartData = {
    labels: data?.labels || [],
    datasets: [{
      label: 'Costo ($)',
      data: data?.data || [],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
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
        <LoadingErrorWrapper loading={loading} error={error}>
          <Bar data={chartData} options={options} />
        </LoadingErrorWrapper>
      </Box>
    </Box>
  );
};

export default ProviderCostComparisonChart;