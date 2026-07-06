import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { MosEvent } from '../api/events';
import { eventsApi } from '../api/events';
import PageLayout from '../components/layout/PageLayout';
import EventCard from '../components/ui/EventCard';
import Hero from '../components/ui/Hero';
import styles from './PublicPage.module.css';

export default function PublicPage() {
  const [events, setEvents] = useState<MosEvent[]>([]);
  const { hash } = useLocation();

  useEffect(() => {
    eventsApi.getAll().then(setEvents);
  }, []);

  useEffect(() => {
    if (hash === '#evenements') {
      document.getElementById('evenements')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <PageLayout>
      <Hero />
      <section id="evenements" className={styles.section}>
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
