import type { MosEvent } from '../../api/events';
import styles from './EventCard.module.css';

interface Props {
  event: MosEvent;
}

function parseDateParts(iso: string) {
  const d = new Date(iso);
  return {
    weekday: d.toLocaleDateString('fr-FR', { weekday: 'short' }).slice(0, 3),
    day: d.getDate(),
    month: d.toLocaleDateString('fr-FR', { month: 'short' }).slice(0, 4),
  };
}

export default function EventCard({ event }: Props) {
  const { weekday, day, month } = parseDateParts(event.date);

  return (
    <article className={styles.card}>
      <div className={styles.body}>
        <div className={styles.top}>
          <div className={styles.dateBox}>
            <span className={styles.weekday}>{weekday}</span>
            <span className={styles.day}>{day}</span>
            <span className={styles.month}>{month}</span>
          </div>
          <h3 className={styles.title}>{event.titre}</h3>
        </div>
        <div className={styles.meta}>
          <span>📍 {event.lieu}</span>
          <span>🎴 {event.format}{event.extension ? ` · ${event.extension}` : ''}</span>
          {event.nbPlaces && <span>♟ {event.nbPlaces} places</span>}
        </div>
        <div className={styles.prices}>
          <div className={styles.price}>
            <span>Adhérent</span>
            <strong>{event.prixAdherent} €</strong>
          </div>
          <div className={styles.price}>
            <span>Non adhérent</span>
            <strong>{event.prixNonAdherent} €</strong>
          </div>
        </div>
        <button className={`btn ${styles.register}`}>S'inscrire</button>
      </div>
    </article>
  );
}
