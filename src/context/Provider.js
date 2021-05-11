import React, {useReducer, createContext} from 'react';
import authInitialState from './initialStates/authInitialState';
import auth from './reducers/auth';

export const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {
  const [authState, authDispatch] = useReducer(auth, authInitialState);

  return (
    <GlobalContext.Provider value={{authState, authDispatch}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
