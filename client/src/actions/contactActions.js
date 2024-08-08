import { MAKE_CONTACT_REQUEST, MAKE_CONTACT_SUCCESS, MAKE_CONTACT_FAIL  } from '../constants/contactConstants'
import axios from 'axios'

const apiBaseURL = "https://graphical-password-security.onrender.com"

export const makeContactAction = (name, email, message) => async(dispatch) => {
    try {
        dispatch({
            type: MAKE_CONTACT_REQUEST
        })
        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`${apiBaseURL}/api/v1/contact`,{ name, email, message },config)
        dispatch({
            type: MAKE_CONTACT_SUCCESS,
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type: MAKE_CONTACT_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}