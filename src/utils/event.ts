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

/**
 * Vrai à partir de minuit le jour de l'événement : les inscriptions sont
 * closes le jour J et les jours suivants (ouvertes jusqu'à la veille incluse).
 */
export function isRegistrationClosed(event: MosEvent) {
  const eventDay = new Date(event.date);
  eventDay.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today >= eventDay;
}

/** État du bouton d'inscription : désactivé + libellé selon la raison. */
export function registrationState(event: MosEvent): { disabled: boolean; label: string } {
  if (isRegistrationClosed(event)) return { disabled: true, label: 'Inscriptions closes' };
  if (isFull(event)) return { disabled: true, label: 'Complet' };
  return { disabled: false, label: "S'inscrire" };
}

/** Libellé des places, ou null si l'événement n'a pas de limite. */
export function placesLabel(event: MosEvent) {
  const restantes = event.placesRestantes;
  if (restantes == null) return null;
  if (restantes === 0) return 'Complet';
  const s = restantes > 1 ? 's' : '';
  return `${restantes} place${s} restante${s}`;
}
