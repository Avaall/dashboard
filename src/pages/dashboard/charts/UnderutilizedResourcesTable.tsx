import { Table, TableBody, TableCell, TableHead, TableRow, Box, Typography, Tooltip } from '@mui/material';

interface Row {
  resource: string;
  usage: string;
}

const UnderutilizedResourcesTable = () => {
  const rows: Row[] = [
    { resource: 'VM-001', usage: '15%' },
    { resource: 'DB-002', usage: '22%' },
    { resource: 'Storage-003', usage: '18%' },
  ];

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Tooltip
        title="Muestra los recursos con menor utilización en porcentaje. Este caso de uso permite detectar ineficiencias que pueden representar oportunidades de ahorro. Una tabla es adecuada si la cantidad es pequeña; para listas más largas, un gráfico de barras es preferible."
        placement="top"
        arrow
      >
        <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
          Recursos Infrautilizados
        </Typography>
      </Tooltip>
      <Box width="100%" maxWidth={600}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Resource</TableCell>
              <TableCell>Usage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: Row, idx: number) => (
              <TableRow key={idx + '_rowUnderutilizedResourcesTable'}>
                <TableCell>{row.resource}</TableCell>
                <TableCell>{row.usage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default UnderutilizedResourcesTable;