import { Box, Typography, Tooltip } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { apiService } from '../../../services/api';
import { useApiData } from '../../../hooks/useApiData';
import LoadingErrorWrapper from '../../../components/LoadingErrorWrapper';

ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTooltip, Legend);

const CostByServiceChart = () => {
  const { data, loading, error } = useApiData(() => apiService.getCostByService());

  const chartData = {
    labels: data?.labels || [],
    datasets: [{
      label: 'Costo ($)',
      data: data?.data || [],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
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
        title="Este gráfico agrupa los costos totales por tipo de servicio (por ejemplo, cómputo, almacenamiento). Es útil para identificar en qué categoría se está concentrando el gasto. Una barra comparativa permite interpretar fácilmente el impacto de cada servicio."
        placement="top"
        arrow
      >
        <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
          Costos por Tipo de Servicio
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

export default CostByServiceChart;