import { useEffect, useState } from 'react';
import type { Registration } from '../../../api/registrations';
import { registrationsApi } from '../../../api/registrations';
import styles from './RegistrationsList.module.css';

interface Props {
  eventId: number;
}

export default function RegistrationsList({ eventId }: Props) {
  const [registrations, setRegistrations] = useState<Registration[] | null>(null);

  useEffect(() => {
    registrationsApi.getByEvent(eventId).then(setRegistrations);
  }, [eventId]);

  if (registrations === null) {
    return <p className={styles.empty}>Chargement...</p>;
  }

  if (registrations.length === 0) {
    return <p className={styles.empty}>Aucune inscription pour cet événement.</p>;
  }

  return (
    <>
      <p className={styles.count}>{registrations.length} inscrit{registrations.length > 1 ? 's' : ''}</p>
      <div className={styles.list}>
        {registrations.map(r => (
          <div key={r.id} className={styles.item}>
            <strong>{r.prenom} {r.nom}</strong>
            <span>{r.email}</span>
          </div>
        ))}
      </div>
    </>
  );
}
