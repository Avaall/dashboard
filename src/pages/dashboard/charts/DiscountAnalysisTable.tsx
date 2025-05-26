import { Table, TableBody, TableCell, TableHead, TableRow, Box, Typography, Tooltip } from '@mui/material';

interface Row {
  type: string;
  savings: number;
}

const DiscountAnalysisTable = () => {
  const rows: Row[] = [
    { type: 'Reserved Instance', savings: 400 },
    { type: 'Savings Plan', savings: 350 },
  ];

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Tooltip
        title="Muestra los ahorros obtenidos mediante descuentos aplicados como Instancias Reservadas o Planes de Ahorro. Una tabla permite comparar los tipos de descuentos y cuantificar su impacto."
        placement="top"
        arrow
      >
        <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
          Análisis de Descuentos Aplicados
        </Typography>
      </Tooltip>
      <Box width="100%" maxWidth={600}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Discount Type</TableCell>
              <TableCell>Savings ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: Row, idx: number) => (
              <TableRow key={idx + '_rowDiscountAnalysisTable'}>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.savings}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default DiscountAnalysisTable;