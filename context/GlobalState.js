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


    // if (typeof window !== 'undefined') {
    //     // Perform localStorage action
    //     localStorage.setItem('watchlist', JSON.stringify(state.watchlist))
    //   }

    // useEffect(() => {
    //     localStorage.setItem('watchlist', JSON.stringify(state.watchlist))
    // }, [state]);
    

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

