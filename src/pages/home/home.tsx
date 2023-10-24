import type { NextPage } from 'next';
import Link from 'next/link';

const HomePage: NextPage = () => {
  return (
    <>
      <h1 className='title'>Home</h1>
      <h2 className='title'>
        <Link href='/form-sample/form'>Go Form Page</Link>
      </h2>
    </>
  );
};

export default HomePage;
