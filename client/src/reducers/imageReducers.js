import { LIST_IMAGES_REQUEST, LIST_IMAGES_SUCCESS, LIST_IMAGES_FAIL, LIST_IMAGES_RESET } from '../constants/imageConstants'

export const getImagesReducer = (state = { images:[] }, action) => {
    switch (action.type){
        case LIST_IMAGES_REQUEST:
            return { 
                loading:true 
            }
        case LIST_IMAGES_SUCCESS:
            return { 
                loading:false, 
                images : action.payload 
            }
        case LIST_IMAGES_FAIL:
            return { 
                loading:false, 
                error : action.payload 
            }
        case LIST_IMAGES_RESET:
            return {  }
        default:
          return state
    }
}