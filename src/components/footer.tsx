import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../styles/Layout.module.css';
import Link from 'next/link';

const Footer: NextPage = () => {
  return (
    <>
      <footer className={styles.footer}>
        <Link
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by
          <span>
            <Image
              src='/vercel.svg'
              alt='Vercel Logo'
              width={100}
              height={25}
              className={styles.logo}
            />
          </span>
        </Link>
      </footer>
    </>
  );
};

export default Footer;
