import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { MosEvent } from '../../api/events';
import { parseDateParts, formatHour, placesLabel, isFull } from '../../utils/event';
import Modal from './Modal';
import RegistrationForm from './RegistrationForm';
import styles from './EventCard.module.css';

interface Props {
  event: MosEvent;
}

export default function EventCard({ event }: Props) {
  const { weekday, day, month } = parseDateParts(event.date);
  const [modalOpen, setModalOpen] = useState(false);

  const full = isFull(event);
  const places = placesLabel(event);

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
          <h3 className={styles.title}>
            <Link to={`/evenements/${event.id}`} className={styles.titleLink}>{event.titre}</Link>
          </h3>
        </div>
        <div className={styles.meta}>
          <span>🕐 {formatHour(event.date)}</span>
          <span>📍 {event.lieu}</span>
          <span>🎴 {event.format}{event.extension ? ` · ${event.extension}` : ''}</span>
          {places && (
            <span className={full ? styles.full : undefined}>♟ {places}</span>
          )}
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
        <div className={styles.actions}>
          <Link to={`/evenements/${event.id}`} className="btn secondary">Détails</Link>
          <button
            className="btn"
            onClick={() => setModalOpen(true)}
            disabled={full}
          >
            {full ? 'Complet' : "S'inscrire"}
          </button>
        </div>
      </div>

      {modalOpen && (
        <Modal title={`S'inscrire — ${event.titre}`} onClose={() => setModalOpen(false)}>
          <RegistrationForm eventId={event.id} onClose={() => setModalOpen(false)} />
        </Modal>
      )}
    </article>
  );
}
