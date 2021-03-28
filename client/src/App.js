/* React client */
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/* Executable-graphQL components */
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import Success from "./pages/Success";
import OrderHistory from "./pages/OrderHistory";

/* Temporary: Context API 
 * I am converting Context API to Redux. Leaving this in for now to prevent breaking changes.
 */
import { StoreProvider } from "./utils/GlobalState";

/* Global State via Redux */
// Weng: I choose not to create a store.js file because it's already too many abstractions and imports.
// Instead of a store.js, I abstracted away into component ReduxStoreProvider which is a composition of ReduxProvider (aka Provider from react-redux). 
// My unique approach to Redux will aid understanding without the complexity of more files.

// Make Redux component. All its descendant components will have access to useDispatch
import { Provider } from "react-redux";

// Make store that will be passed to the Redux component
import {createStoreWithState} from "./redux/store.js";

function ReduxStoreProvider() {
  const store = createStore(reducers);
  return <ReduxProvider store={store}></ReduxProvider>
}

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})

function App() {
  const store = createStoreWithState(initialState);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
            <Provider store={store}>
            {/* <StoreProvider> */}
              <Nav />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/success" component={Success} />
                <Route exact path="/orderHistory" component={OrderHistory} />
                <Route exact path="/products/:id" component={Detail} />
                <Route component={NoMatch} />
              </Switch>
            {/* </StoreProvider> */}
            </Provider>
        </div>
      </Router>
    </ApolloProvider>

  );
}

export default App;