import { client } from './client';

export interface MosEvent {
  id: number;
  titre: string;
  date: string;
  lieu: string;
  format: string;
  extension: string | null;
  nbPlaces: number | null;
  prixAdherent: number;
  prixNonAdherent: number;
  createdByEmail: string;
  createdAt: string;
}

export interface EventFormData {
  titre: string;
  date: string;
  lieu: string;
  format: string;
  extension: string;
  nbPlaces: string;
  prixAdherent: string;
  prixNonAdherent: string;
}

export const eventsApi = {
  getAll: () => client.get<MosEvent[]>('/api/events'),
  create: (data: EventFormData) => client.post<MosEvent>('/api/events', data),
  update: (id: number, data: EventFormData) => client.put<MosEvent>(`/api/events/${id}`, data),
  delete: (id: number) => client.delete(`/api/events/${id}`),
};
