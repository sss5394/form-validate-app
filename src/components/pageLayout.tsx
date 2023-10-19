import type { NextPage } from 'next';
import Footer from './footer';
import Header from './header';
import styles from '../styles/Home.module.css';

type Props = {
  children?: React.ReactNode;
};

const PageLayout: NextPage = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default PageLayout;
