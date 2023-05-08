import React,{createContext, useEffect, useState} from 'react';

export const TabsContext = createContext()

const TabsContextProvider = (props) => {

    const [tabVal, settabVal] = useState('1')

    const valHandler = (val)=>{
        let value = val.toString()
        settabVal(value)
    }
    return ( 
        <TabsContext.Provider value={{tabVal,valHandler}}>
            {props.children}
        </TabsContext.Provider>
    );
}

export default TabsContextProvider;