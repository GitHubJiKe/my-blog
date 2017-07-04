import {
    ADD_ARTICLE,
    REMOVE_ARTICLE,
    GET_ALL_ARTICLES,
    UPDATE_ARTICLE,
    UPLOAD_AVATAR
} from '../base/constant'


const initState = {
    data: [],
    statusCode: 0,
    text: '',
    avatar: '',
    photos:[]
};

export default function article(state = initState, action) {
    switch (action.type) {
        case ADD_ARTICLE:
        case REMOVE_ARTICLE:
        case GET_ALL_ARTICLES:
        case UPDATE_ARTICLE:
        case UPLOAD_AVATAR:
            return { ...state, ...action.data };
        case "NET_ERROR":
            return { ...state };
        default:
            return { ...state };
    }
}