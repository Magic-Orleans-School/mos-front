import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { MosEvent } from '../api/events';
import { eventsApi } from '../api/events';
import { placesLabel, isFull } from '../utils/event';
import PageLayout from '../components/layout/PageLayout';
import Modal from '../components/ui/Modal';
import RegistrationForm from '../components/ui/RegistrationForm';
import styles from './EventDetailPage.module.css';

function formatFullDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<MosEvent | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    eventsApi
      .getById(Number(id))
      .then(setEvent)
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) {
    return (
      <PageLayout>
        <p className={styles.state}>
          Événement introuvable. <Link to="/">Retour à l'accueil</Link>
        </p>
      </PageLayout>
    );
  }

  if (!event) {
    return (
      <PageLayout>
        <p className={styles.state}>Chargement...</p>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Link to="/#evenements" className={styles.back}>← Tous les événements</Link>
      <div className={styles.layout}>
        {event.imageUrl && (
          <img
            src={event.imageUrl}
            alt={`Affiche — ${event.titre}`}
            className={styles.poster}
          />
        )}
        <div className={`panel ${styles.card}`}>
          <h1 className={styles.title}>{event.titre}</h1>
          <p className={styles.subtitle}>
            {event.format}{event.extension ? ` · ${event.extension}` : ''}
          </p>
          <div className={styles.meta}>
            <span>📅 {formatFullDate(event.date)}</span>
            <span>📍 {event.lieu}</span>
            {placesLabel(event) && (
              <span className={isFull(event) ? styles.full : undefined}>
                ♟ {placesLabel(event)}
              </span>
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
          <button
            className={`btn ${styles.register}`}
            onClick={() => setModalOpen(true)}
            disabled={isFull(event)}
          >
            {isFull(event) ? 'Complet' : "S'inscrire"}
          </button>
        </div>
      </div>

      {modalOpen && (
        <Modal title={`S'inscrire — ${event.titre}`} onClose={() => setModalOpen(false)}>
          <RegistrationForm eventId={event.id} onClose={() => setModalOpen(false)} />
        </Modal>
      )}
    </PageLayout>
  );
}
