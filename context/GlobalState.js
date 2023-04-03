import React, {createContext, useReducer, useEffect} from 'react'
import AppReducer from './AppReducer';

// initial state
const initialState = {
    booking: [],
};

//create context
export const GlobalContext = createContext(initialState);

//provider components
export const GlobalProvider = props => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    

    //actions
const addToBooking = (property) => {
    dispatch({type: "ADD_TO_BOOKING", payload: property})
}


    return (
        <GlobalContext.Provider 
            value=
            {{booking: state.booking, 
            addToBooking,}} >
            {props.children}
        </GlobalContext.Provider>
    )
}

