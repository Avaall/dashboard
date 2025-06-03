import { useState, useEffect, useCallback, useRef } from 'react';
import { ApiException, PaginatedResponse } from '../services/api';

// Estado genérico para datos paginados
interface PaginatedState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
}

// Hook personalizado para manejar datos paginados
export function usePaginatedData<T>(
  apiCall: (page: number, limit: number) => Promise<PaginatedResponse<T>>,
  limit: number = 10
) {
  const [state, setState] = useState<PaginatedState<T>>({
    data: [],
    loading: true,
    error: null,
    pagination: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  
  // Refs para evitar recrear fetchData
  const apiCallRef = useRef(apiCall);
  const limitRef = useRef(limit);
  const isLoading = useRef(false);

  // Actualizar refs cuando cambien los props
  apiCallRef.current = apiCall;
  limitRef.current = limit;

  const fetchData = useCallback(async (page: number) => {
    // Debug: Log para ver qué está pasando
    const apiCallString = apiCallRef.current.toString();
    const endpointMatch = apiCallString.match(/get(\w+)/);
    const endpointName = endpointMatch ? endpointMatch[1] : 'Unknown';
    
    console.log(`[usePaginatedData] ${endpointName} - Página ${page}. isLoading: ${isLoading.current}`);
    
    // Si ya está cargando, no hacer otra petición
    if (isLoading.current) {
      console.log(`[usePaginatedData] ${endpointName} - Petición bloqueada (ya en progreso)`);
      return;
    }

    isLoading.current = true;
    
    console.log(`[usePaginatedData] ${endpointName} - Iniciando petición página ${page}`);
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiCallRef.current(page, limitRef.current);
      console.log(`[usePaginatedData] ${endpointName} - Petición exitosa página ${page}`, response);
      setState({
        data: response.data,
        loading: false,
        error: null,
        pagination: response.pagination,
      });
    } catch (error) {
      console.log(`[usePaginatedData] ${endpointName} - Error en petición página ${page}:`, error);
      let errorMessage = 'Error al cargar los datos. Verifique que el servidor esté disponible.';
      
      if (error instanceof ApiException || error instanceof Error) {
        errorMessage = error.message;
      }
      
      setState({
        data: [],
        loading: false,
        error: errorMessage,
        pagination: null,
      });
      
      console.error('Error en usePaginatedData:', error);
    } finally {
      isLoading.current = false;
      console.log(`[usePaginatedData] ${endpointName} - Petición finalizada página ${page}`);
    }
  }, []); // Sin dependencias porque usa refs

  useEffect(() => {
    fetchData(currentPage);
  }, [fetchData, currentPage]);

  // Función para cambiar de página
  const goToPage = useCallback((page: number) => {
    if (page !== currentPage && page >= 1) {
      setCurrentPage(page);
    }
  }, [currentPage]);

  // Función manual de reintento
  const retry = useCallback(() => {
    fetchData(currentPage);
  }, [fetchData, currentPage]);

  return {
    ...state,
    currentPage,
    goToPage,
    retry,
  };
}

export default usePaginatedData; 