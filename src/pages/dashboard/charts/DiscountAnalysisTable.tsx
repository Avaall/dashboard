import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material';
import { apiService } from '../../../services/api';
import { useApiData } from '../../../hooks/useApiData';
import LoadingErrorWrapper from '../../../components/LoadingErrorWrapper';

const DiscountAnalysisTable = () => {
  const { data, loading, error } = useApiData(() => apiService.getDiscountAnalysis());

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Tooltip
        title="Esta tabla muestra el análisis de descuentos aplicados, como instancias reservadas, planes de ahorro, etc. Es útil para evaluar la efectividad de las estrategias de optimización de costos."
        placement="top"
        arrow
      >
        <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
          Análisis de Descuentos
        </Typography>
      </Tooltip>
      <Box width="100%" maxWidth={800}>
        <LoadingErrorWrapper loading={loading} error={error}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Tipo de Descuento</strong></TableCell>
                <TableCell><strong>Nombre</strong></TableCell>
                <TableCell align="right"><strong>Ahorro ($)</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.discountType}</TableCell>
                  <TableCell>{row.discountName}</TableCell>
                  <TableCell align="right">${row.savings.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </LoadingErrorWrapper>
      </Box>
    </Box>
  );
};

export default DiscountAnalysisTable;