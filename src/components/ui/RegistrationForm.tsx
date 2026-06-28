import { useState } from 'react';
import type { FormEvent } from 'react';
import { registrationsApi } from '../../api/registrations';
import styles from './RegistrationForm.module.css';

interface Props {
  eventId: number;
  onClose: () => void;
}

export default function RegistrationForm({ eventId, onClose }: Props) {
  const [values, setValues] = useState({ nom: '', prenom: '', email: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await registrationsApi.create({ ...values, eventId });
      setDone(true);
    } catch {
      setError('Une erreur est survenue, veuillez réessayer.');
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div>
        <p className={styles.success}>Votre inscription a bien été enregistrée. Merci !</p>
        <div className={styles.actions}>
          <button className="btn" onClick={onClose}>Fermer</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="prenom">Prénom *</label>
        <input id="prenom" name="prenom" value={values.prenom} onChange={handleChange} required />
      </div>
      <div className={styles.field}>
        <label htmlFor="nom">Nom *</label>
        <input id="nom" name="nom" value={values.nom} onChange={handleChange} required />
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Email *</label>
        <input id="email" name="email" type="email" value={values.email} onChange={handleChange} required />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.actions}>
        <button type="button" className="btn secondary" onClick={onClose}>Annuler</button>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Envoi...' : 'S\'inscrire'}
        </button>
      </div>
    </form>
  );
}
