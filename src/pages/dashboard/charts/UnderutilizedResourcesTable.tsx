import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material';
import { apiService } from '../../../services/api';
import { useApiData } from '../../../hooks/useApiData';
import LoadingErrorWrapper from '../../../components/LoadingErrorWrapper';

const UnderutilizedResourcesTable = () => {
  const { data, loading, error } = useApiData(() => apiService.getUnderutilizedResources());

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Tooltip
        title="Esta tabla identifica recursos que están siendo subutilizados (alto costo, bajo uso). Es crucial para identificar oportunidades de optimización y reducción de costos."
        placement="top"
        arrow
      >
        <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
          Recursos Subutilizados
        </Typography>
      </Tooltip>
      <Box width="100%" maxWidth={800}>
        <LoadingErrorWrapper loading={loading} error={error}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Recurso</strong></TableCell>
                <TableCell><strong>Tipo</strong></TableCell>
                <TableCell align="right"><strong>Costo ($)</strong></TableCell>
                <TableCell align="right"><strong>Uso (%)</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.resource}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell align="right">${row.cost.toLocaleString()}</TableCell>
                  <TableCell align="right">{row.usage?.toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </LoadingErrorWrapper>
      </Box>
    </Box>
  );
};

export default UnderutilizedResourcesTable;