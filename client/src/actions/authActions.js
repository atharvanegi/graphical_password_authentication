import axios from 'axios'
import { VALIDATE_EMAIL_REQUEST, VALIDATE_EMAIL_SUCCESS, VALIDATE_EMAIL_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../constants/authConstants'

const apiBaseURL = "https://graphical-password-security.onrender.com"

export const validateEmailAction = (email, request) => async (dispatch) => {
    try {
        dispatch({
            type:VALIDATE_EMAIL_REQUEST,
        })
        const { data } = await axios.get(`${apiBaseURL}/api/v1/auth/validate/${request}/${email}`)
        dispatch({
            type:VALIDATE_EMAIL_SUCCESS,
            payload:data
        })        
   } catch (error) {
        dispatch({
            type:VALIDATE_EMAIL_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const registerAction = (name, email, passwordArray, passwordCollectionId) => async(dispatch) => {
    try {
        dispatch({
            type:REGISTER_REQUEST,
        })
        const config = {
            headers:{
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post(`${apiBaseURL}/api/v1/auth/register`,{ name, email, passwordArray, passwordCollectionId }, config)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:data
        })       
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data
        })
        sessionStorage.setItem("userInfo",JSON.stringify(data)) 
   } catch (error) {
        dispatch({
            type:REGISTER_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const loginAction = (email,passwordArray) => async(dispatch) => {
    try {
        dispatch({
            type:LOGIN_REQUEST,
        })
        const config = {
            headers:{
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post(`${apiBaseURL}/api/v1/auth/LOGIN`,{ email, passwordArray }, config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data
        })
        sessionStorage.setItem("userInfo",JSON.stringify(data)) 
   } catch (error) {
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const userLogoutAction = () => async(dispatch) => {
    dispatch({
        type:LOGOUT
    })
    sessionStorage.removeItem("userInfo")
}