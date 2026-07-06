import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div>
        <p className={styles.eyebrow}>Association Magic: The Gathering à Orléans</p>
        <h1 className={styles.title}>Magic<br />Orléans School</h1>
        <p className={styles.subtitle}>Rassembler les Planeswalkers d'Orléans</p>
        <p className={styles.lead}>
          Magic Orléans School est une association qui rassemble les joueurs de
          Magic: The Gathering sur la métropole d'Orléans autour d'événements
          conviviaux, tournois, parties casual et rencontres communautaires.
        </p>
        <Link to="/association" className="btn">Découvrir l'association ›</Link>
      </div>
      <div className={styles.visual} aria-hidden="true">
        <div className={styles.flag}></div>
        <div className={styles.spear}></div>
      </div>
    </header>
  );
}
