import {
    ADD_ARTICLE,
    REMOVE_ARTICLE,
    GET_ALL_ARTICLES,
    UPDATE_ARTICLE
} from '../base/constant'
import { message } from 'antd';
import { doGet, doPost, doDelete } from '../base/fetchApi'

export const addArticle = (Article) => {
    return function (dispatch) {
        doPost('/addOne', Article, (result) => {
            if (result) {
                message.success(result.text);
                dispatch({
                    type: ADD_ARTICLE,
                    data: result
                });

            }
        })
    }
}

export const removeArticle = (id) => {
    return function (dispatch) {
        doDelete(`/deleteOne/${id}`, (result) => {
            if (result) {
                result.data.length > 0 ? message.success(result.text) : message.success('您暂时一无所有');
                dispatch({
                    type: REMOVE_ARTICLE,
                    data: result
                });
            }
        });
    }
}

export const getAllArticles = () => {
    return function (dispatch) {
        doGet('/getAll', (result) => {
            if (result) {
                result.data.length > 0 ? message.success(result.text) : message.success('期待您的写入');
                dispatch({
                    type: GET_ALL_ARTICLES,
                    data: result
                });
            }
        })
    }
}

export const updateArticle = (id, update) => {
    return function (dispatch) {
        doPost(`/updateOne/${id}`, update, (result) => {
            if (result) {
                message.success(result.text);
                dispatch({
                    type: UPDATE_ARTICLE,
                    data: result
                });
            }
        }, dispatch);
    }
}