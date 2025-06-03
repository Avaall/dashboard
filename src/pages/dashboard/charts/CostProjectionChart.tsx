import { Box, Typography, Tooltip } from '@mui/material';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { apiService } from '../../../services/api';
import { useApiData } from '../../../hooks/useApiData';
import LoadingErrorWrapper from '../../../components/LoadingErrorWrapper';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, ChartTooltip, Legend);

const CostProjectionChart = () => {
  const { data, loading, error } = useApiData(() => apiService.getCostProjection());

  const chartData = {
    labels: data?.labels || [],
    datasets: [{
      label: 'Proyección de Costos ($)',
      data: data?.data || [],
      borderColor: '#FF6384',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
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
        title="Este gráfico proyecta los costos futuros basándose en tendencias históricas. Es útil para planificación presupuestaria y identificación temprana de incrementos inesperados. Una línea de tendencia facilita la visualización de la evolución esperada."
        placement="top"
        arrow
      >
        <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
          Proyección de Costos
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

export default CostProjectionChart;