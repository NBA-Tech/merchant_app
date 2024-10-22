import React, { createContext, useContext } from 'react';
import { globalStyle } from './globalStyle';


export const StyleContext = createContext();


function GlobalStyleProvider({children}) {
    return (
        <StyleContext.Provider value={globalStyle}>

            {children}
        </StyleContext.Provider>

    );
}

export default GlobalStyleProvider;