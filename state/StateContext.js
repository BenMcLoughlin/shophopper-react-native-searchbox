import React, { useReducer } from 'react';
import * as actions from './actions';
import { merge } from '../utils/objects/merge';
import { initialState } from './initialState';

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return merge(state, action.payload);
        default:
            return state;
    }
};

export const bindActionsToContext = (_reducer, _actions, defaultValue) => {
    const StateContext = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(_reducer, defaultValue);

        const set = (payload) =>
            dispatch({
                type: 'SET',
                payload
            });

        const boundActions = {};
        for (let key in _actions) {
            boundActions[key] = actions[key](state, set);
        }

        return <StateContext.Provider value={{ state, ...boundActions }}>{children}</StateContext.Provider>;
    };

    return { StateContext, Provider };
};

export const { Provider, StateContext } = bindActionsToContext(reducer, { ...actions }, initialState);
