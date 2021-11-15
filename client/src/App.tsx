import generateStore from "./redux/store"
import Dashboard from "./dashboard"

import {Provider} from "react-redux"

function App() {
  const store = generateStore()
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;
