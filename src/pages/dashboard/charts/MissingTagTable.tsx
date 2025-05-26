import { Table, TableBody, TableCell, TableHead, TableRow, Box, Typography, Tooltip } from '@mui/material';

interface Row {
  resource: string;
  missingTags: string[];
}

const MissingTagTable = () => {
  const rows: Row[] = [
    { resource: 'i-0a123456', missingTags: ['Owner', 'CostCenter'] },
    { resource: 'bucket-logs', missingTags: ['Environment'] },
    { resource: 'db-prod', missingTags: ['Application', 'Owner'] }
  ];

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Tooltip
        title="Esta tabla muestra recursos que no tienen todas las etiquetas obligatorias. Identificarlas permite mejorar la trazabilidad, asignación de costos y cumplimiento."
        arrow
      >
        <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
          Recursos sin Etiquetas Obligatorias
        </Typography>
      </Tooltip>
      <Box width="100%" maxWidth={600}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Recurso</TableCell>
              <TableCell>Etiquetas Faltantes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: Row, idx: number) => (
              <TableRow key={idx + '_rowMissingTagTable'}>
                <TableCell>{row.resource}</TableCell>
                <TableCell>{row.missingTags.join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default MissingTagTable;