import type { MosEvent } from '../api/events';

export function parseDateParts(iso: string) {
  const d = new Date(iso);
  return {
    weekday: d.toLocaleDateString('fr-FR', { weekday: 'short' }).slice(0, 3),
    day: d.getDate(),
    month: d.toLocaleDateString('fr-FR', { month: 'short' }).slice(0, 4),
  };
}

export function formatHour(iso: string) {
  return new Date(iso).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function isFull(event: MosEvent) {
  return event.placesRestantes === 0;
}

/** Libellé des places, ou null si l'événement n'a pas de limite. */
export function placesLabel(event: MosEvent) {
  if (event.placesRestantes === null) return null;
  if (event.placesRestantes === 0) return 'Complet';
  return `${event.placesRestantes} place${event.placesRestantes > 1 ? 's' : ''} restante${event.placesRestantes > 1 ? 's' : ''}`;
}
