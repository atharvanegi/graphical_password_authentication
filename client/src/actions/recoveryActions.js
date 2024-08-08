import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_FAIL,FORGOT_PASSWORD_RESET, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS,RESET_PASSWORD_FAIL,RESET_PASSWORD_RESET } from '../constants/recoveryConstants'
import axios from 'axios'

const apiBaseURL = "https://graphical-password-security.onrender.com"

export const forgotPasswordAction = (email) => async(dispatch) => {
    try {
        dispatch({
            type:FORGOT_PASSWORD_REQUEST
        })
        const config = {
            headers:{
                'Content-type':'application/json',
            }
        }
        const { data } = await axios.post(`${apiBaseURL}/api/v1/recovery/sendOTP`,{ email },config)
        dispatch({
            type:FORGOT_PASSWORD_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const resetPasswordAction = (email, passwordArray, passwordCollectionId) => async(dispatch) => {
    try {
        dispatch({
            type:RESET_PASSWORD_REQUEST
        })
        const config = {
            headers:{
                'Content-type':'application/json',
            }
        }
        const { data } = await axios.put(`${apiBaseURL}/api/v1/recovery/reset`,{ email, passwordArray, passwordCollectionId },config)
        dispatch({
            type:RESET_PASSWORD_SUCCESS,
            payload:data
        })
        setTimeout(() => {
            dispatch({
                type:RESET_PASSWORD_RESET
            })
            dispatch({
                type:FORGOT_PASSWORD_RESET
            })
        },2000)
    } catch (error) {
        dispatch({
            type:RESET_PASSWORD_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}