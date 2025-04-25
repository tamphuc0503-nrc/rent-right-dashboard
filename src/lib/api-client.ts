
import { toast } from "sonner";

export interface ApiResponse<T = any> {
  success: boolean;
  error?: string;
  errorCode?: string;
  data: T;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    name: string;
    email: string;
    id: string;
    role: string;
  };
}

const BASE_URL = 'https://v0-building-restful-api.vercel.app';

export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const result: ApiResponse<T> = await response.json();

    if (!result.success) {
      toast.error(result.error || 'An error occurred');
      return null;
    }

    return result.data;
  } catch (error) {
    toast.error('Network error occurred');
    return null;
  }
}
