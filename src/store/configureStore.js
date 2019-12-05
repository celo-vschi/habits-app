import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import habitsReducer from '../reducers/habits';
import filtersReducer from '../reducers/filters';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            habits: habitsReducer,
            filters: filtersReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}

