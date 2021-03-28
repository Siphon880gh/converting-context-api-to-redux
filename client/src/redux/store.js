import {createStore} from "redux";
import reducers from "./reducers";

// Create store with reducers and initial state
export function createStoreWithState(initialState) {
    // Enable Redux DevTools Chrome extension
    const enableReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
    return createStore(reducers, initialState, enableReduxDevTools);
}