import { Box, Typography, Tooltip } from '@mui/material';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { apiService } from '../../../services/api';
import { useApiData } from '../../../hooks/useApiData';
import LoadingErrorWrapper from '../../../components/LoadingErrorWrapper';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, ChartTooltip, Legend);

const ResourceEfficiencyChart = () => {
  const { data, loading, error } = useApiData(() => apiService.getResourceEfficiency());

  const chartData = {
    labels: data?.labels || [],
    datasets: [{
      label: 'Eficiencia (%)',
      data: data?.data || [],
      borderColor: '#4BC0C0',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.1
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
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      }
    }
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
        <LoadingErrorWrapper loading={loading} error={error}>
          <Line data={chartData} options={options} />
        </LoadingErrorWrapper>
      </Box>
    </Box>
  );
};

export default ResourceEfficiencyChart;