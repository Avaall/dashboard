// Configuración base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

// Interfaz para respuestas de error
interface ApiError {
  message: string;
  status: number;
}

// Clase personalizada para errores de API
export class ApiException extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiException';
  }
}

// Función helper para manejar respuestas HTTP
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData: ApiError = {
      message: `Error ${response.status}: ${response.statusText}`,
      status: response.status
    };
    
    try {
      const errorBody = await response.json();
      errorData.message = errorBody.message || errorData.message;
    } catch {
      // Si no se puede parsear el JSON, usar el mensaje por defecto
    }
    
    throw new ApiException(errorData.message, errorData.status);
  }
  
  return response.json();
}

// Función helper para realizar peticiones GET
async function apiGet<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }
    
    // Error de red o conexión
    throw new ApiException(
      'Error de conexión. Verifique su conexión a internet y que el servidor esté disponible.',
      0
    );
  }
}

// Interfaces para los tipos de datos
export interface ChartData {
  labels: string[];
  data: number[];
}

export interface TableRow {
  resource: string;
  type: string;
  cost: number;
  usage?: number;
}

export interface DiscountRow {
  discountType: string;
  discountName: string;
  savings: number;
}

export interface MissingTagRow {
  resource: string;
  type: string;
  cost: number;
}

// Interfaces para paginación
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

// Servicio principal de API
export const apiService = {
  // Gráficos de costos y distribución
  async getCostByService(): Promise<ChartData> {
    return apiGet<ChartData>('/dashboard/cost-by-service');
  },

  async getMonthlyUsageTrend(): Promise<ChartData> {
    return apiGet<ChartData>('/dashboard/monthly-usage-trend');
  },

  async getCostDistributionByRegion(): Promise<ChartData> {
    return apiGet<ChartData>('/dashboard/cost-distribution-by-region');
  },

  async getProviderCostComparison(): Promise<ChartData> {
    return apiGet<ChartData>('/dashboard/provider-cost-comparison');
  },

  async getResourceEfficiency(): Promise<ChartData> {
    return apiGet<ChartData>('/dashboard/resource-efficiency');
  },

  async getCostProjection(): Promise<ChartData> {
    return apiGet<ChartData>('/dashboard/cost-projection');
  },

  async getProjectCost(): Promise<ChartData> {
    return apiGet<ChartData>('/dashboard/project-cost');
  },

  async getUntaggedResources(): Promise<ChartData> {
    return apiGet<ChartData>('/dashboard/untagged-resources');
  },

  async getCostByTag(): Promise<ChartData> {
    return apiGet<ChartData>('/dashboard/cost-by-tag');
  },

  // Tablas de datos detallados con paginación
  async getCostDetailByResource(page: number = 1, limit: number = 10): Promise<PaginatedResponse<TableRow>> {
    return apiGet<PaginatedResponse<TableRow>>(`/dashboard/cost-detail-by-resource?page=${page}&limit=${limit}`);
  },

  async getDiscountAnalysis(): Promise<DiscountRow[]> {
    return apiGet<DiscountRow[]>('/dashboard/discount-analysis');
  },

  async getUnderutilizedResources(): Promise<TableRow[]> {
    return apiGet<TableRow[]>('/dashboard/underutilized-resources');
  },

  async getMissingTags(page: number = 1, limit: number = 10): Promise<PaginatedResponse<MissingTagRow>> {
    return apiGet<PaginatedResponse<MissingTagRow>>(`/dashboard/missing-tags?page=${page}&limit=${limit}`);
  },
};

export default apiService; 