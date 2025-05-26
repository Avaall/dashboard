import { Box, Paper, Grid, Typography } from "@mui/material";

import CostByServiceChart from "./charts/CostByServiceChart";
import MonthlyUsageTrendChart from "./charts/MonthlyUsageTrendChart";
import CostDistributionByRegionChart from "./charts/CostDistributionByRegionChart";
import CostDetailByResourceTable from "./charts/CostDetailByResourceTable.tsx";
import ProviderCostComparisonChart from "./charts/ProviderCostComparisonChart.tsx";
import ResourceEfficiencyChart from "./charts/ResourceEfficiencyChart";
import DiscountAnalysisTable from "./charts/DiscountAnalysisTable";
import CostProjectionChart from "./charts/CostProjectionChart";
import ProjectCostChart from "./charts/ProjectCostChart";
import UnderutilizedResourcesTable from "./charts/UnderutilizedResourcesTable";
import UntaggedResourcesChart from "./charts/UntaggedResourcesChart";
import CostByTagChart from "./charts/CostByTagChart";
import MissingTagTable from "./charts/MissingTagTable";

function Dashboard() {
  return (
    <Box p={4} bgcolor="#f9f9f9" minHeight="100vh">
      <Box mb={4} textAlign="center">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Reportes FinOps - Casos de Uso
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Visualización de métricas clave por categoría de servicio
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {/* Izquierda */}
        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6" fontWeight="bold">Etiquetado y Gobernanza</Typography>
            <Paper elevation={3} sx={{ p: 2 }}><CostByTagChart /></Paper>
            <Paper elevation={3} sx={{ p: 2 }}><UntaggedResourcesChart /></Paper>
            <Paper elevation={3} sx={{ p: 2 }}><MissingTagTable /></Paper>
          </Box>
        </Grid>

        {/* Centro */}
        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6" fontWeight="bold">Consumo y Distribución</Typography>
            <Paper elevation={3} sx={{ p: 2 }}><CostByServiceChart /></Paper>
            <Paper elevation={3} sx={{ p: 2 }}><MonthlyUsageTrendChart /></Paper>
            <Paper elevation={3} sx={{ p: 2 }}><CostDistributionByRegionChart /></Paper>
            <Paper elevation={3} sx={{ p: 2 }}><CostDetailByResourceTable /></Paper>
            <Paper elevation={3} sx={{ p: 2 }}><ProviderCostComparisonChart /></Paper>
          </Box>
        </Grid>

        {/* Derecha */}
        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6" fontWeight="bold">Optimización y Ahorro</Typography>
            <Paper elevation={3} sx={{ p: 2 }}><ResourceEfficiencyChart /></Paper>
            <Paper elevation={3} sx={{ p: 2 }}><DiscountAnalysisTable /></Paper>
            <Paper elevation={3} sx={{ p: 2 }}><CostProjectionChart /></Paper>
            <Paper elevation={3} sx={{ p: 2 }}><ProjectCostChart /></Paper>
            <Paper elevation={3} sx={{ p: 2 }}><UnderutilizedResourcesTable /></Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;