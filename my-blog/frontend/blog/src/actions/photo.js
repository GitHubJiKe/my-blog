import {
    ADD_PHOTO,
    GET_ALL_PHOTOS
} from '../base/constant'
import { message } from 'antd';
import { doGet, doPost, doDelete, uploadFile } from '../base/fetchApi'

export const addPhoto = (Photos) => {
    return function (dispatch) {
        uploadFile('/uploadPhotos', 'photo', Photos, (result) => {
            if (result) {
                message.success(result.text);
                dispatch({
                    type: ADD_PHOTO,
                    data: result
                });
            }
        })
    }
}

export const getAllPhotos = () => {
    return function (dispatch) {
        doGet('/getAllPhotos', (result) => {
            if (result) {
                result.photos.length > 0 ? message.success(result.text) : message.success('期待您的上传');
                dispatch({
                    type: GET_ALL_PHOTOS,
                    data: result
                });
            }
        })
    }
}