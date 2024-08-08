import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_FAIL,FORGOT_PASSWORD_RESET, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS,RESET_PASSWORD_FAIL,RESET_PASSWORD_RESET } from '../constants/recoveryConstants'

export const sendOtpReducer = (state={},action) => {
    switch(action.type){
        case FORGOT_PASSWORD_REQUEST:
            return {
                loading:true
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                loading:false,
                success:true,
                otpDetails:action.payload
            }
        case FORGOT_PASSWORD_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case FORGOT_PASSWORD_RESET:
            return { 
                ...state,
                success:false
            }
        default:
            return state
    }
}

export const resetPasswordReducer = (state={},action) => {
    switch(action.type){
        case RESET_PASSWORD_REQUEST:
            return {
                loading:true
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                loading:false,
                success:true
            }
        case RESET_PASSWORD_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case RESET_PASSWORD_RESET:
            return { }
        default:
            return state
    }
}