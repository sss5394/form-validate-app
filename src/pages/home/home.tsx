import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';

const HomePage: NextPage = () => {
  return (
    <>
      <Link
        href='/form-sample/form-original-validation'
        className={styles.anchor}
      >
        &gt; フォームサンプル（自前バリデーション）
      </Link>
    </>
  );
};

export default HomePage;
