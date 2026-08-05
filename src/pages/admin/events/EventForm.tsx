import { useState } from 'react';
import type { FormEvent } from 'react';
import MDEditor from '@uiw/react-md-editor';
import type { MosEvent, EventFormData } from '../../../api/events';
import { uploadEventPoster } from '../../../api/storage';
import styles from './EventForm.module.css';

const DESCRIPTION_MAX = 5000;
const POSTER_MAX_BYTES = 10 * 1024 * 1024; // 10 Mo, aligné sur la limite du bucket

type Status = 'idle' | 'uploading' | 'saving';

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
  description: '',
  nbPlaces: '',
  prixAdherent: '',
  prixNonAdherent: '',
  imageUrl: '',
  archived: false,
};

function toFormData(event: MosEvent): EventFormData {
  return {
    titre: event.titre,
    date: event.date.slice(0, 16),
    lieu: event.lieu,
    format: event.format,
    extension: event.extension ?? '',
    description: event.description ?? '',
    nbPlaces: event.nbPlaces?.toString() ?? '',
    prixAdherent: event.prixAdherent.toString(),
    prixNonAdherent: event.prixNonAdherent.toString(),
    imageUrl: event.imageUrl ?? '',
    archived: event.archived,
  };
}

export default function EventForm({ initial, onSubmit, onCancel }: Props) {
  const [values, setValues] = useState<EventFormData>(
    initial ? toFormData(initial) : EMPTY
  );
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > POSTER_MAX_BYTES) {
      setError('L\'affiche dépasse 10 Mo. Choisissez une image plus légère.');
      setPosterFile(null);
      e.target.value = '';
      return;
    }
    setError(null);
    setPosterFile(file);
  }

  function handleDescriptionChange(value?: string) {
    const next = value ?? '';
    if (next.length <= DESCRIPTION_MAX) {
      setValues(v => ({ ...v, description: next }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      let imageUrl = values.imageUrl;
      if (posterFile) {
        setStatus('uploading');
        imageUrl = await uploadEventPoster(posterFile);
      }
      setStatus('saving');
      await onSubmit({ ...values, imageUrl });
    } catch {
      setError('Une erreur est survenue, veuillez réessayer.');
      setStatus('idle');
    }
  }

  const busy = status !== 'idle';
  const submitLabel =
    status === 'uploading' ? 'Envoi de l\'affiche…' :
    status === 'saving' ? 'Enregistrement…' :
    'Enregistrer';

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
        <div className={`${styles.field} ${styles.full}`} data-color-mode="light">
          <label htmlFor="description">Description</label>
          <MDEditor
            id="description"
            value={values.description}
            onChange={handleDescriptionChange}
            preview="edit"
            height={260}
            textareaProps={{ placeholder: 'Décrivez l\'événement (Markdown pris en charge)...' }}
          />
          <small className={styles.counter}>
            {values.description.length} / {DESCRIPTION_MAX} caractères
          </small>
        </div>
      </div>
      {error && <p style={{ color: 'var(--red)', marginTop: '12px' }}>{error}</p>}
      <div className={styles.actions}>
        <button type="button" className="btn secondary" onClick={onCancel} disabled={busy}>Annuler</button>
        <button type="submit" className="btn" disabled={busy}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
