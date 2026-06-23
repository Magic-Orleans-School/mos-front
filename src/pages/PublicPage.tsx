import { useEffect, useState } from 'react';
import type { MosEvent } from '../api/events';
import { eventsApi } from '../api/events';
import PageLayout from '../components/layout/PageLayout';
import EventCard from '../components/ui/EventCard';
import styles from './PublicPage.module.css';

export default function PublicPage() {
  const [events, setEvents] = useState<MosEvent[]>([]);

  useEffect(() => {
    eventsApi.getAll().then(setEvents);
  }, []);

  return (
    <PageLayout>
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className="section-title">Prochains événements</h2>
        </div>
        {events.length === 0 ? (
          <p className={styles.empty}>Aucun événement à venir pour le moment.</p>
        ) : (
          <div className={styles.grid}>
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </PageLayout>
  );
}
