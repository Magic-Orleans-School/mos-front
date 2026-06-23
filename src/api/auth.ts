import { client } from './client';

interface AuthResponse {
  token: string;
  role: string;
}

export function login(email: string, password: string): Promise<AuthResponse> {
  return client.post<AuthResponse>('/api/auth/login', { email, password });
}
