import { NextPageWithLayout } from 'next';
import Layout from '@/layout/layout';
import HomePage from '@/pages/home/home';

const Home: NextPageWithLayout = () => <HomePage />;

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
