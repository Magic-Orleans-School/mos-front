import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './NavBar.module.css';

export default function NavBar() {
  const { isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate('/');
  }

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <Link to="/">M.O.S.</Link>
        <div className={styles.menu}>
          <Link to="/">Événements</Link>
          {isAdmin && <Link to="/admin">Administration</Link>}
          {isAdmin && (
            <button onClick={handleSignOut}>Déconnexion</button>
          )}
        </div>
      </div>
    </nav>
  );
}
