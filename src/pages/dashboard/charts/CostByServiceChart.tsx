import { Box, Typography, Tooltip } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';

ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTooltip, Legend);

const CostByServiceChart = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [costs, setCosts] = useState<number[]>([]);

  const handleFileUpload = async () => {
    const exampleData = {
      'Compute': 3500,
      'Storage': 2100,
      'Database': 1700,
      'Networking': 950
    };

    setLabels(Object.keys(exampleData));
    setCosts(Object.values(exampleData));
  };

  const data = {
    labels,
    datasets: [{
      label: 'Cost ($)',
      data: costs,
      backgroundColor: 'rgba(75, 192, 192, 0.6)'
    }]
  };

  useEffect(() => {
    handleFileUpload();
  }, []);
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
        <Bar data={data} />
      </Box>
    </Box>
  );
};

export default CostByServiceChart;