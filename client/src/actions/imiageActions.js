import axios from 'axios'
import { LIST_IMAGES_REQUEST, LIST_IMAGES_SUCCESS, LIST_IMAGES_FAIL } from '../constants/imageConstants'

const key = process.env.REACT_APP_ACCESS_KEY

export const getImagesAction = (endpoint) => async (dispatch) => {
    try {
        dispatch({
            type:LIST_IMAGES_REQUEST,
        })
        const {data} = await axios.get(`https://api.unsplash.com/photos/random/?client_id=${key}&count=${endpoint==='register' ? 20 : 16}`)
        dispatch({
            type:LIST_IMAGES_SUCCESS,
            payload:data
        })        
   } catch (error) {
        dispatch({
            type:LIST_IMAGES_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}