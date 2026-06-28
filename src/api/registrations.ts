import { client } from './client';

export interface Registration {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  eventId: number;
  eventTitre: string;
  createdAt: string;
}

export interface RegistrationFormData {
  nom: string;
  prenom: string;
  email: string;
  eventId: number;
}

export const registrationsApi = {
  create: (data: RegistrationFormData) => client.post<Registration>('/api/registrations', data),
  getByEvent: (eventId: number) => client.get<Registration[]>(`/api/registrations?eventId=${eventId}`),
};
