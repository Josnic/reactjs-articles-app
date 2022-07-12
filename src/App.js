import 'antd/dist/antd.css';

import { Provider } from 'react-redux';

import RouteApp from './route';
import AuthStore from './store/authStore';

function App() {
  return (
    <Provider store={AuthStore}>
      <RouteApp />
    </Provider>
  );
}

export default App;
