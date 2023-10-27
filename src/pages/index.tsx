import { NextPageWithLayout } from 'next';
import Layout from '@/layout/layout';
import HomePage from '@/pages/home/home';

const Home: NextPageWithLayout = () => <HomePage />;

Home.getLayout = (page) => <Layout title='Home'>{page}</Layout>;

export default Home;
