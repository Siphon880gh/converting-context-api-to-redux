import {createStore} from "redux";
import {reducer} from "../utils/reducers";


// Create store with reducers and initial state
export function createStoreWithState(initialState) {
    // Enable Redux DevTools Chrome extension
    const enableReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
    return createStore(reducer, initialState, enableReduxDevTools);
}