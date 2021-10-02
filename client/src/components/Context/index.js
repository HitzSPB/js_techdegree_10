// https://kentcdodds.com/blog/how-to-use-react-context-effectively
import React, {createContext} from 'react';

const UserContext = createContext();

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;