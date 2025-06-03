import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Box, Typography, Tooltip } from '@mui/material';
import { apiService } from '../../../services/api';
import { useApiData } from '../../../hooks/useApiData';
import LoadingErrorWrapper from '../../../components/LoadingErrorWrapper';

ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTooltip, Legend);

const CostByTagChart = () => {
  console.log('[CostByTagChart] Componente montado');
  
  const { data, loading, error } = useApiData(() => apiService.getCostByTag());

  console.log('[CostByTagChart] Estado:', { data, loading, error });

  const chartData = {
    labels: data?.labels || [],
    datasets: [{
      label: 'Costo por Etiqueta ($)',
      data: data?.data || [],
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
      borderColor: 'rgba(255, 159, 64, 1)',
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
        title="Este gráfico muestra los costos agrupados por etiquetas (tags). Es útil para entender cómo se distribuyen los gastos según las categorías definidas por la organización (ambiente, proyecto, departamento, etc.)."
        placement="top"
        arrow
      >
        <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
          Costos por Etiqueta
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

export default CostByTagChart;