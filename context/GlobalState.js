import React, {createContext, useReducer, useEffect} from 'react'
import AppReducer from './AppReducer';

// initial state
const initialState = {
    watchlist: [],
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
const addMovieToWatchlist = (property) => {
    dispatch({type: "ADD_MOVIE_TO_WATCHLIST", payload: property})
}


    return (
        <GlobalContext.Provider 
            value=
            {{watchlist: state.watchlist, 
            addMovieToWatchlist,}} >
            {props.children}
        </GlobalContext.Provider>
    )
}

