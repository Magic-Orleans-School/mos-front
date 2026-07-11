import { useEffect, useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import styles from './BoutiquePage.module.css';

const WIDGET_URL =
  'https://www.helloasso.com/associations/magic-orleans-school-the-maid/boutiques/magic-orleans-school-les-produits-disponible-a-l-asso/widget';

export default function BoutiquePage() {
  const [height, setHeight] = useState(750);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (!e.origin.endsWith('helloasso.com')) return;
      const dataHeight = Number(e.data?.height);
      if (dataHeight > 0) {
        setHeight(h => Math.max(h, dataHeight));
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <PageLayout>
      <div className={styles.intro}>
        <h1>Boutique</h1>
        <p>
          Retrouvez les produits disponibles à l'association. Le paiement est
          géré de manière sécurisée par HelloAsso.
        </p>
      </div>
      <iframe
        title="Boutique HelloAsso — Magic Orléans School"
        src={WIDGET_URL}
        className={styles.widget}
        style={{ height: `${height}px` }}
        allowTransparency
        scrolling="auto"
      />
    </PageLayout>
  );
}
