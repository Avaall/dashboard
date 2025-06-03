import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material';
import { apiService } from '../../../services/api';
import { usePaginatedData } from '../../../hooks/usePaginatedData';
import LoadingErrorWrapper from '../../../components/LoadingErrorWrapper';
import Pagination from '../../../components/Pagination';

const CostDetailByResourceTable = () => {
  const { data, loading, error, pagination, currentPage, goToPage } = usePaginatedData(
    (page, limit) => apiService.getCostDetailByResource(page, limit),
    10
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Tooltip
        title="Esta tabla muestra el detalle de costos por recurso individual. Es útil para identificar los recursos más costosos y tomar decisiones de optimización específicas."
        placement="top"
        arrow
      >
        <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
          Detalle de Costos por Recurso
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
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.resource}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell align="right">${row.cost.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </LoadingErrorWrapper>
        
        {pagination && !loading && !error && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            total={pagination.total}
            limit={pagination.limit}
            onPageChange={goToPage}
          />
        )}
      </Box>
    </Box>
  );
};

export default CostDetailByResourceTable;