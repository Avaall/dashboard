import { Box, CircularProgress, Alert, Button, Typography } from '@mui/material';
import { type ReactNode } from 'react';

interface LoadingErrorWrapperProps {
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  children: ReactNode;
  minHeight?: number;
  showRetry?: boolean;
}

const LoadingErrorWrapper = ({ 
  loading, 
  error, 
  onRetry, 
  children, 
  minHeight = 200,
  showRetry = false
}: LoadingErrorWrapperProps) => {
  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight={minHeight}
      >
        <Box textAlign="center">
          <CircularProgress size={40} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Cargando datos...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight={minHeight}
        p={2}
      >
        <Box textAlign="center" maxWidth={400}>
          <Alert 
            severity="error" 
            sx={{ mb: 2 }}
            action={
              showRetry && onRetry && (
                <Button 
                  color="inherit" 
                  size="small" 
                  onClick={onRetry}
                >
                  Reintentar
                </Button>
              )
            }
          >
            {error}
          </Alert>
          {showRetry && onRetry && (
            <Typography variant="body2" color="text.secondary">
              Puede intentar recargar los datos manualmente.
            </Typography>
          )}
        </Box>
      </Box>
    );
  }

  return <>{children}</>;
};

export default LoadingErrorWrapper; 