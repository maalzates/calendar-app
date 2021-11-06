import { types } from "../types/types";

const initialState = {
    checking: true,
    // uid: null,
    // name: null,
}



export const authReducer = ( state = initialState, action) => {

    switch (action.type) {

        case types.authStartLogin: 
        return {
            ...state,
            auth: 'Hello'
        }
    
        default:
            return state;
    }


}