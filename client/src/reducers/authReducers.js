import { VALIDATE_EMAIL_REQUEST, VALIDATE_EMAIL_SUCCESS, VALIDATE_EMAIL_FAIL, VALIDATE_EMAIL_RESET, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../constants/authConstants'

export const validateEmailReducer = (state = {  }, action) => {
    switch (action.type){
        case VALIDATE_EMAIL_REQUEST:
            return { 
                loading:true 
            }
        case VALIDATE_EMAIL_SUCCESS:
            return { 
                loading:false, 
                information : action.payload 
            }
        case VALIDATE_EMAIL_FAIL:
            return { 
                loading:false, 
                error : action.payload 
            }
        case VALIDATE_EMAIL_RESET:
            return {  }
        default:
          return state
    }
}

export const registerUserReducer = (state ={}, action) => {
    switch (action.type){
        case REGISTER_REQUEST:
            return { 
                loading:true 
            }
        case REGISTER_SUCCESS:
            return { 
                loading:false, 
                userInfo : action.payload 
            }
        case REGISTER_FAIL:
            return { 
                loading:false, 
                error : action.payload 
            }
        default:
          return state
    }
}

export const userLoginReducer = (state={},action) => {
    switch(action.type){
        case LOGIN_REQUEST:
            return {
                loading:true
            }
        case LOGIN_SUCCESS:
            return {
                loading:false,
                userInfo:action.payload
            }
        case LOGIN_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case LOGOUT:
            return { }
        default:
            return state
    }
}