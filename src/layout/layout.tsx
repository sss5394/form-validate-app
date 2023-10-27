import type { NextPage } from 'next';
import Footer from '../components/footer';
import Header from '../components/header';
import styles from '../styles/Layout.module.css';
import { title } from 'process';

type LayoutProps = Required<{
  readonly title?: string;
  readonly children?: React.ReactElement;
}>;

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>{title}</h1>
        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
