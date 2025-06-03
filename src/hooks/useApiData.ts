import { useState, useEffect, useCallback, useRef } from 'react';
import { ApiException } from '../services/api';

// Estado genérico para datos de API
interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Hook personalizado para manejar datos de API
export function useApiData<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  // Ref para controlar si ya se hizo la petición
  const hasAttempted = useRef(false);
  const isLoading = useRef(false);

  const fetchData = useCallback(async () => {
    // Debug: Log para ver qué está pasando
    const apiCallString = apiCall.toString();
    const endpointMatch = apiCallString.match(/get(\w+)/);
    const endpointName = endpointMatch ? endpointMatch[1] : 'Unknown';
    
    console.log(`[useApiData] ${endpointName} - Intentando fetch. hasAttempted: ${hasAttempted.current}, isLoading: ${isLoading.current}`);
    
    // Si ya se intentó hacer la petición, no volver a hacerla
    if (hasAttempted.current || isLoading.current) {
      console.log(`[useApiData] ${endpointName} - Petición bloqueada (ya intentada o en progreso)`);
      return;
    }

    hasAttempted.current = true;
    isLoading.current = true;
    
    console.log(`[useApiData] ${endpointName} - Iniciando petición`);
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await apiCall();
      console.log(`[useApiData] ${endpointName} - Petición exitosa`, data);
      setState({
        data,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.log(`[useApiData] ${endpointName} - Error en petición:`, error);
      let errorMessage = 'Error al cargar los datos. Verifique que el servidor esté disponible.';
      
      if (error instanceof ApiException || error instanceof Error) {
        errorMessage = error.message;
      }
      
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
      
      console.error('Error en useApiData:', error);
    } finally {
      isLoading.current = false;
      console.log(`[useApiData] ${endpointName} - Petición finalizada`);
    }
  }, [apiCall, ...dependencies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Función manual de reintento (resetea el flag para permitir una nueva petición)
  const retry = useCallback(() => {
    hasAttempted.current = false;
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    retry,
  };
}

export default useApiData; 