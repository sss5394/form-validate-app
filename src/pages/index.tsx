import type { NextPage } from 'next';
import Layout from '../layout/layout';
import Home from './home';

const App: NextPage = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default App;
