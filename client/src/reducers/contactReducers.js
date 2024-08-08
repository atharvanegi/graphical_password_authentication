import { MAKE_CONTACT_REQUEST, MAKE_CONTACT_SUCCESS, MAKE_CONTACT_FAIL  } from '../constants/contactConstants'

export const makeContactReducer = (state={},action) => {
    switch(action.type){
        case MAKE_CONTACT_REQUEST:
            return{
                loading:true
            }
        case MAKE_CONTACT_SUCCESS:
            return{
                loading:false,
                message:action.payload
            }
        case MAKE_CONTACT_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}