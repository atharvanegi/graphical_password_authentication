import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { validateEmailReducer, registerUserReducer, userLoginReducer } from './reducers/authReducers' 
import { resetPasswordReducer, sendOtpReducer } from './reducers/recoveryReducers'
import { getImagesReducer } from './reducers/imageReducers'
import { makeContactReducer } from './reducers/contactReducers'

const reducer = combineReducers({ 
    validateEmail : validateEmailReducer,
    registerUser : registerUserReducer,
    loginUser : userLoginReducer,
    resetPassword : resetPasswordReducer,
    sendOtp : sendOtpReducer,
    getImages : getImagesReducer,
    makeContact : makeContactReducer  
})

const userInfoFromStorage = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null

const initialState = {
    loginUser : { userInfo : userInfoFromStorage },
    registerUser : { userInfo : userInfoFromStorage }
}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))) 
export default store