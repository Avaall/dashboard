import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, Typography, Tooltip } from '@mui/material';
import { apiService } from '../../../services/api';
import { useApiData } from '../../../hooks/useApiData';
import LoadingErrorWrapper from '../../../components/LoadingErrorWrapper';

ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTooltip, Legend);

const ProjectCostChart = () => {
  const { data, loading, error } = useApiData(() => apiService.getProjectCost());

  const chartData = {
    labels: data?.labels || [],
    datasets: [{
      label: 'Costo por Proyecto ($)',
      data: data?.data || [],
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderColor: 'rgba(153, 102, 255, 1)',
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
        title="Este gráfico muestra los costos agrupados por proyecto o centro de costos. Es útil para entender qué proyectos consumen más recursos y facilitar la asignación presupuestaria. Las barras permiten comparar fácilmente entre proyectos."
        placement="top"
        arrow
      >
        <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
          Costos por Proyecto
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

export default ProjectCostChart;