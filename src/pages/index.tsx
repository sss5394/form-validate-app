import type { NextPage } from 'next';
import Link from 'next/link';
import PageLayout from '../components/pageLayout';
import Home from './home';

const App: NextPage = () => {
  return (
    <PageLayout>
      <Home/>
    </PageLayout>
  );
};

export default App;
