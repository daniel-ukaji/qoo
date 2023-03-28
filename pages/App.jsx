import { Provider } from 'react-redux';
import store from '../store';
import MultiStepForm from '../components/MultiStepForm';

const App = () => (
  <Provider store={store}>
    <MultiStepForm />
  </Provider>
);

export default App;
