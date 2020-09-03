import React, { createContext, useReducer, useContext } from 'react' // import required dependencies

export const StateContext = createContext(); // preparing the data layer

// hier order component
// children is the App component
// we pass reducer (is something that listen for changings with data layer) and initialState (is how the datalayer looks like when the app is loaded)
export const StateProvider = ({ reducer, initialState, children }) => (
	<StateContext.Provider value={useReducer(reducer, initialState)} >
		{children}
	</StateContext.Provider>
);

// hook whitch allows us to pull information from the data layer
export const useStateValue = () => useContext(StateContext)

// this is snippent of code you can use for context API
