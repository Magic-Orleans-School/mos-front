import PageLayout from '../../components/layout/PageLayout';
import styles from './LegalPage.module.css';

export default function ConfidentialitePage() {
  return (
    <PageLayout>
      <div className={styles.legal}>
        <h1>Politique de confidentialité</h1>

        <p>
          L'association Magic Orléans School (M.O.S.) attache de l'importance à la
          protection de vos données personnelles. Cette page décrit les données
          collectées via ce site et l'usage qui en est fait, conformément au
          Règlement général sur la protection des données (RGPD).
        </p>

        <h2>Données collectées</h2>
        <p>
          Lors de l'inscription à un événement, les données suivantes sont
          collectées :
        </p>
        <ul>
          <li>Nom et prénom</li>
          <li>Adresse email</li>
        </ul>
        <p>Aucune autre donnée personnelle n'est collectée. Le site n'utilise pas de cookies de suivi ni d'outil de mesure d'audience.</p>

        <h2>Finalité</h2>
        <p>
          Ces données servent exclusivement à l'organisation des événements de
          l'association : gestion des inscriptions et contact des participants en
          cas de besoin (changement d'horaire, annulation, etc.). Elles ne sont ni
          vendues, ni transmises à des tiers.
        </p>

        <h2>Durée de conservation</h2>
        <p>
          Les inscriptions sont conservées 12 mois après l'événement, puis
          supprimées.
        </p>

        <h2>Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d'un droit d'accès, de rectification
          et de suppression de vos données. Pour l'exercer, contactez-nous via{' '}
          <a href="https://discord.gg/gp4srq9g6w" target="_blank" rel="noopener noreferrer">Discord</a>
          {' '}ou{' '}
          <a href="https://www.facebook.com/themaidofmagic" target="_blank" rel="noopener noreferrer">Facebook</a>.
        </p>

        <h2>Responsable du traitement</h2>
        <p>
          L'association Magic Orléans School, en tant qu'organisatrice des
          événements, est responsable du traitement des données collectées via ce
          site.
        </p>
      </div>
    </PageLayout>
  );
}
