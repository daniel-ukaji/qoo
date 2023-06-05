import { Provider } from 'react-redux';
import store from '../store';
import MultiStepForm from '../components/MultiStepForm';
import Head from 'next/head';

const App = () => (
  <>
  <Head>
          <title>QooSpayce</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
          <link rel="icon" href="/qoo_logo.png" />
        </Head>
  <Provider store={store}>
    <MultiStepForm />
  </Provider>
  </>
);

export default App;
