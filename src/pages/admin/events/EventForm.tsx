import { useState } from 'react';
import type { FormEvent } from 'react';
import type { MosEvent, EventFormData } from '../../../api/events';
import { uploadEventPoster } from '../../../api/storage';
import styles from './EventForm.module.css';

interface Props {
  initial?: MosEvent;
  onSubmit: (data: EventFormData) => Promise<void>;
  onCancel: () => void;
}

const EMPTY: EventFormData = {
  titre: '',
  date: '',
  lieu: '',
  format: '',
  extension: '',
  nbPlaces: '',
  prixAdherent: '',
  prixNonAdherent: '',
  imageUrl: '',
};

function toFormData(event: MosEvent): EventFormData {
  return {
    titre: event.titre,
    date: event.date.slice(0, 16),
    lieu: event.lieu,
    format: event.format,
    extension: event.extension ?? '',
    nbPlaces: event.nbPlaces?.toString() ?? '',
    prixAdherent: event.prixAdherent.toString(),
    prixNonAdherent: event.prixNonAdherent.toString(),
    imageUrl: event.imageUrl ?? '',
  };
}

export default function EventForm({ initial, onSubmit, onCancel }: Props) {
  const [values, setValues] = useState<EventFormData>(
    initial ? toFormData(initial) : EMPTY
  );
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPosterFile(e.target.files?.[0] ?? null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let imageUrl = values.imageUrl;
      if (posterFile) {
        imageUrl = await uploadEventPoster(posterFile);
      }
      await onSubmit({ ...values, imageUrl });
    } catch {
      setError('Une erreur est survenue, veuillez réessayer.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.grid}>
        <div className={`${styles.field} ${styles.full}`}>
          <label htmlFor="titre">Titre *</label>
          <input id="titre" name="titre" value={values.titre} onChange={handleChange} required />
        </div>
        <div className={styles.field}>
          <label htmlFor="date">Date *</label>
          <input id="date" name="date" type="datetime-local" value={values.date} onChange={handleChange} required />
        </div>
        <div className={styles.field}>
          <label htmlFor="lieu">Lieu *</label>
          <input id="lieu" name="lieu" value={values.lieu} onChange={handleChange} required />
        </div>
        <div className={styles.field}>
          <label htmlFor="format">Format *</label>
          <input id="format" name="format" value={values.format} onChange={handleChange} required />
        </div>
        <div className={styles.field}>
          <label htmlFor="extension">Extension</label>
          <input id="extension" name="extension" value={values.extension} onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="prixAdherent">Prix adhérent (€) *</label>
          <input id="prixAdherent" name="prixAdherent" type="number" min="0" step="0.5" value={values.prixAdherent} onChange={handleChange} required />
        </div>
        <div className={styles.field}>
          <label htmlFor="prixNonAdherent">Prix non adhérent (€) *</label>
          <input id="prixNonAdherent" name="prixNonAdherent" type="number" min="0" step="0.5" value={values.prixNonAdherent} onChange={handleChange} required />
        </div>
        <div className={styles.field}>
          <label htmlFor="nbPlaces">Nombre de places</label>
          <input id="nbPlaces" name="nbPlaces" type="number" min="1" value={values.nbPlaces} onChange={handleChange} />
        </div>
        <div className={`${styles.field} ${styles.full}`}>
          <label htmlFor="poster">
            Affiche {values.imageUrl && !posterFile ? '(une affiche est déjà en place, en choisir une nouvelle la remplacera)' : ''}
          </label>
          <input id="poster" name="poster" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} />
        </div>
      </div>
      {error && <p style={{ color: 'var(--red)', marginTop: '12px' }}>{error}</p>}
      <div className={styles.actions}>
        <button type="button" className="btn secondary" onClick={onCancel}>Annuler</button>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>
    </form>
  );
}
