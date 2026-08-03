import { useEffect, useState } from 'react';
import type { MosEvent, EventFormData } from '../../../api/events';
import { eventsApi } from '../../../api/events';
import PageLayout from '../../../components/layout/PageLayout';
import Modal from '../../../components/ui/Modal';
import EventForm from './EventForm';
import RegistrationsList from './RegistrationsList';
import styles from './EventsPage.module.css';

export default function EventsPage() {
  const [events, setEvents] = useState<MosEvent[]>([]);
  const [selected, setSelected] = useState<MosEvent | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewingRegistrations, setViewingRegistrations] = useState<MosEvent | null>(null);

  useEffect(() => {
    Promise.all([eventsApi.getAll(), eventsApi.getArchived()]).then(([active, archived]) =>
      setEvents([...active, ...archived])
    );
  }, []);

  function openCreate() {
    setSelected(null);
    setModalOpen(true);
  }

  function openEdit(event: MosEvent) {
    setSelected(event);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelected(null);
  }

  async function handleSubmit(data: EventFormData) {
    if (selected) {
      const updated = await eventsApi.update(selected.id, data);
      setEvents(evs => evs.map(e => (e.id === updated.id ? updated : e)));
    } else {
      const created = await eventsApi.create(data);
      setEvents(evs => [...evs, created]);
    }
    closeModal();
  }

  async function handleToggleArchive(event: MosEvent) {
    if (event.archived) {
      await eventsApi.unarchive(event.id);
    } else {
      await eventsApi.archive(event.id);
    }
    setEvents(evs => evs.map(e => (e.id === event.id ? { ...e, archived: !e.archived } : e)));
  }

  async function handleDelete(id: number) {
    if (!confirm('Supprimer définitivement cet événement et ses inscriptions ?')) return;
    await eventsApi.delete(id);
    setEvents(evs => evs.filter(e => e.id !== id));
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  }

  const activeEvents = events.filter(e => !e.archived);
  const archivedEvents = events.filter(e => e.archived);

  function renderItem(event: MosEvent) {
    return (
      <li key={event.id} className={`${styles.item} ${event.archived ? styles.archived : ''}`}>
        <div className={styles.info}>
          <strong>
            {event.titre}
            {event.archived && <span className={styles.badge}>Archivé</span>}
          </strong>
          <span>{formatDate(event.date)} · {event.lieu} · {event.format}</span>
        </div>
        <div className={styles.actions}>
          <button className="btn small secondary" onClick={() => setViewingRegistrations(event)}>Inscrits</button>
          <button className="btn small secondary" onClick={() => openEdit(event)}>Modifier</button>
          <button className="btn small secondary" onClick={() => handleToggleArchive(event)}>
            {event.archived ? 'Publier' : 'Archiver'}
          </button>
          <button className="btn small" onClick={() => handleDelete(event.id)}>Supprimer</button>
        </div>
      </li>
    );
  }

  return (
    <PageLayout>
      <div className={styles.header}>
        <h1>Événements</h1>
        <button className="btn" onClick={openCreate}>+ Créer un événement</button>
      </div>

      {activeEvents.length === 0 ? (
        <p className={styles.empty}>Aucun événement publié pour le moment.</p>
      ) : (
        <ul className={styles.list}>{activeEvents.map(renderItem)}</ul>
      )}

      {archivedEvents.length > 0 && (
        <>
          <h2 className={styles.archivedTitle}>Événements archivés</h2>
          <ul className={styles.list}>{archivedEvents.map(renderItem)}</ul>
        </>
      )}

      {modalOpen && (
        <Modal
          title={selected ? "Modifier l'événement" : 'Nouvel événement'}
          onClose={closeModal}
        >
          <EventForm
            initial={selected ?? undefined}
            onSubmit={handleSubmit}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {viewingRegistrations && (
        <Modal
          title={`Inscrits — ${viewingRegistrations.titre}`}
          onClose={() => setViewingRegistrations(null)}
        >
          <RegistrationsList eventId={viewingRegistrations.id} />
        </Modal>
      )}
    </PageLayout>
  );
}
