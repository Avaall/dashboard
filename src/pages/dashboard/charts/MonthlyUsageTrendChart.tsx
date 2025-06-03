import { Box, Typography, Tooltip } from '@mui/material';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { apiService } from '../../../services/api';
import { useApiData } from '../../../hooks/useApiData';
import LoadingErrorWrapper from '../../../components/LoadingErrorWrapper';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ChartTooltip, Legend);

const MonthlyUsageTrendChart = () => {
  const { data, loading, error } = useApiData(() => apiService.getMonthlyUsageTrend());

  const chartData = {
    labels: data?.labels || [],
    datasets: [{
      label: 'Uso (GB)',
      data: data?.data || [],
      borderColor: 'rgba(54, 162, 235, 0.8)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      fill: false,
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
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} GB`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return value.toLocaleString() + ' GB';
          }
        }
      }
    }
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
        <LoadingErrorWrapper loading={loading} error={error}>
          <Line data={chartData} options={options} />
        </LoadingErrorWrapper>
      </Box>
    </Box>
  );
};

export default MonthlyUsageTrendChart;