import { Box, Pagination as MuiPagination, Typography } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, total, limit, onPageChange }: PaginationProps) => {
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Box 
      display="flex" 
      justifyContent="space-between" 
      alignItems="center" 
      mt={2}
      flexWrap="wrap"
      gap={2}
    >
      <Typography variant="body2" color="text.secondary">
        Mostrando {startItem}-{endItem} de {total} elementos
      </Typography>
      
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default Pagination; 