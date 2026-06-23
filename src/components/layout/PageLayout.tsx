import type { ReactNode } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import styles from './PageLayout.module.css';

interface Props {
  children: ReactNode;
}

export default function PageLayout({ children }: Props) {
  return (
    <>
      <NavBar />
      <main className={styles.main}>
        <div className="container">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
