import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material';

interface Row {
  resource: string;
  cost: number;
}

const CostDetailByResourceTable = () => {
  const rows: Row[] = [
    { resource: 'EC2 Instance', cost: 1200 },
    { resource: 'S3 Bucket', cost: 800 },
    { resource: 'RDS Instance', cost: 1000 },
  ];

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Tooltip
        title="Este reporte muestra los costos distribuidos por tipo de recurso, como instancias de cómputo, almacenamiento o bases de datos. Una tabla es adecuada cuando se requiere inspección detallada de cada línea de gasto."
        placement="top"
        arrow
      >
        <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
          Detalle de Costos por Recurso
        </Typography>
      </Tooltip>
      <Box width="100%" maxWidth={600}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Resource</TableCell>
              <TableCell>Cost ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: Row, idx: number) => (
              <TableRow key={idx + '_rowCostDetailByResourceTable'}>
                <TableCell>{row.resource}</TableCell>
                <TableCell>{row.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default CostDetailByResourceTable;