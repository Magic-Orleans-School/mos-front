import PageLayout from '../../components/layout/PageLayout';
import styles from './LegalPage.module.css';

export default function MentionsLegalesPage() {
  return (
    <PageLayout>
      <div className={styles.legal}>
        <h1>Mentions légales</h1>

        <h2>Éditeur du site</h2>
        <p>
          Le présent site est édité par l'association <strong>Magic Orléans School (M.O.S.)</strong>,
          association loi 1901.
        </p>
        <ul>
          <li>Siège social : Maison des Associations, 46 ter rue Sainte-Catherine, 45000 Orléans</li>
          <li>
            Contact :{' '}
            <a href="https://discord.gg/gp4srq9g6w" target="_blank" rel="noopener noreferrer">Discord</a>
            {' '}ou{' '}
            <a href="https://www.facebook.com/themaidofmagic" target="_blank" rel="noopener noreferrer">Facebook</a>
          </li>
        </ul>

        <h2>Directeur de la publication</h2>
        <p>Tristan Le Saux, président de l'association.</p>

        <h2>Hébergement</h2>
        <p>Le site est hébergé par :</p>
        <ul>
          <li>
            <strong>Vercel Inc.</strong> — 440 N Barranca Ave #4133, Covina, CA 91723,
            États-Unis (interface du site)
          </li>
          <li>
            <strong>Hetzner Online GmbH</strong> — Industriestr. 25, 91710 Gunzenhausen,
            Allemagne (serveur applicatif)
          </li>
        </ul>

        <h2>Propriété intellectuelle</h2>
        <p>
          Magic: The Gathering, ses logos et illustrations sont des marques déposées de
          Wizards of the Coast LLC. Ce site est un site associatif non officiel, sans
          affiliation avec Wizards of the Coast.
        </p>
        <p>
          Le contenu de ce site (textes, visuels propres) est la propriété de
          l'association Magic Orléans School, sauf mention contraire.
        </p>
      </div>
    </PageLayout>
  );
}
