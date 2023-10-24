import type { NextPage } from 'next';
import Footer from '../components/footer';
import Header from '../components/header';
import styles from '../styles/Home.module.css';

type LayoutProps = Required<{
  readonly children?: React.ReactElement;
}>;

const Layout = ({ children }: LayoutProps) => {
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

export default Layout;
