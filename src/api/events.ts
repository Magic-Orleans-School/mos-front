import { client } from './client';

export interface MosEvent {
  id: number;
  titre: string;
  date: string;
  lieu: string;
  format: string;
  extension: string | null;
  description: string | null;
  nbPlaces: number | null;
  placesRestantes?: number | null;
  prixAdherent: number;
  prixNonAdherent: number;
  imageUrl: string | null;
  archived: boolean;
  createdByEmail: string;
  createdAt: string;
}

export interface EventFormData {
  titre: string;
  date: string;
  lieu: string;
  format: string;
  extension: string;
  description: string;
  nbPlaces: string;
  prixAdherent: string;
  prixNonAdherent: string;
  imageUrl: string;
  archived: boolean;
}

export const eventsApi = {
  getAll: () => client.get<MosEvent[]>('/api/events'),
  getArchived: () => client.get<MosEvent[]>('/api/events?archived=true'),
  getById: (id: number) => client.get<MosEvent>(`/api/events/${id}`),
  create: (data: EventFormData) => client.post<MosEvent>('/api/events', data),
  update: (id: number, data: EventFormData) => client.put<MosEvent>(`/api/events/${id}`, data),
  archive: (id: number) => client.patch<MosEvent>(`/api/events/${id}/archive`),
  unarchive: (id: number) => client.patch<MosEvent>(`/api/events/${id}/unarchive`),
  delete: (id: number) => client.delete(`/api/events/${id}`),
};
