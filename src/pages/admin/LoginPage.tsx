import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import PageLayout from '../../components/layout/PageLayout';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { signIn, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  if (isAdmin) {
    navigate('/admin', { replace: true });
    return null;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      const { token, role } = await login(email, password);
      signIn(token, role);
      navigate('/admin', { replace: true });
    } catch {
      setError('Identifiants incorrects.');
    }
  }

  return (
    <PageLayout>
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <h1>Connexion</h1>
          <p className={styles.subtitle}>Espace réservé au bureau M.O.S.</p>
          <form onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="email">Identifiant</label>
              <input id="email" name="email" type="text" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="password">Mot de passe</label>
              <input id="password" name="password" type="password" required />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={`btn ${styles.submit}`}>Se connecter</button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
