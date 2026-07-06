import PageLayout from '../components/layout/PageLayout';
import styles from './AssociationPage.module.css';

const DISCORD_URL = 'https://discord.gg/gp4srq9g6w';

const VALUES = [
  { icon: '♡', title: 'Convivialité', text: 'Un accueil chaleureux et des rencontres pour tous les joueurs et joueuses.' },
  { icon: '♢', title: 'Partage', text: 'Échanger, apprendre et progresser ensemble.' },
  { icon: '⚔', title: 'Stratégie', text: 'Réfléchir, construire et relever de nouveaux défis.' },
  { icon: '♙', title: 'Esprit communautaire', text: 'Une communauté unie par la passion de Magic.' },
];

export default function AssociationPage() {
  return (
    <PageLayout>
      <section className={styles.intro}>
        <h1>L'association</h1>
        <p>
          Magic Orléans School (M.O.S.) est une association loi 1901 créée pour
          rassembler tous les amoureux de Magic: The Gathering sur Orléans et sa
          métropole.
        </p>
        <p>
          Notre mission : créer du lien, partager notre passion et proposer des
          événements accessibles à toutes et tous, du joueur débutant au
          compétiteur confirmé.
        </p>
      </section>

      <section className={styles.values}>
        {VALUES.map(v => (
          <div key={v.title} className={`panel ${styles.value}`}>
            <div className={styles.valueIcon}>{v.icon}</div>
            <h3>{v.title}</h3>
            <p>{v.text}</p>
          </div>
        ))}
      </section>

      <section className={`panel ${styles.join}`}>
        <h2>Nous rejoindre</h2>
        <p>
          Envie de jouer avec nous ? Rejoignez notre serveur Discord pour suivre
          les événements, trouver des adversaires et échanger avec la communauté.
        </p>
        <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="btn">
          Rejoindre le Discord ›
        </a>
      </section>
    </PageLayout>
  );
}
