import { useState } from 'react';
import type { MosEvent } from '../../api/events';
import Modal from './Modal';
import RegistrationForm from './RegistrationForm';
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
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <article className={styles.card}>
      {event.imageUrl && (
        <img src={event.imageUrl} alt={`Affiche — ${event.titre}`} className={styles.poster} loading="lazy" />
      )}
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
        <button className={`btn ${styles.register}`} onClick={() => setModalOpen(true)}>S'inscrire</button>
      </div>

      {modalOpen && (
        <Modal title={`S'inscrire — ${event.titre}`} onClose={() => setModalOpen(false)}>
          <RegistrationForm eventId={event.id} onClose={() => setModalOpen(false)} />
        </Modal>
      )}
    </article>
  );
}
