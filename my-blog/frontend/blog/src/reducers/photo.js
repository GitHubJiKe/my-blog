import { GET_ALL_PHOTOS, ADD_PHOTO } from '../base/constant'


const initState = {
    photos: []
};

export default function photo(state = initState, action) {
    switch (action.type) {
        case GET_ALL_PHOTOS:
            return { ...state, ...action.data };
        case ADD_PHOTO:
            state.photos = state.photos.concat(action.data.photos);
            return { ...state };
        case "NET_ERROR":
            return { ...state };
        default:
            return { ...state };
    }
}