import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <p>© 2026 Magic Orléans School (M.O.S.)<br />Association de joueurs Magic: The Gathering à Orléans.</p>
        </div>
        <nav className={styles.links}>
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/confidentialite">Politique de confidentialité</Link>
        </nav>
      </div>
    </footer>
  );
}
