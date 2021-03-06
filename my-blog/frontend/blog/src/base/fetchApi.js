import 'whatwg-fetch'
import { message } from 'antd';
const NET_ERROR = 'NET_ERROR';

const GET_OPTION = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
};

const POST_OPTION = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
}

const DELETE_OPTION = {
    method: 'DELETE'
}
const UPLOAD_OPTION = {
    method: 'POST',
}

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function json(response) {
    return response.json();
}

function dealWithErroe(ex) {
    return message.error('服务器开小差了 > - <');
}

export function doGet(url, cb) {
    fetch(url, GET_OPTION)
        .then(status)
        .then(json)
        .then((response) => cb(response))
        .catch((ex) => dealWithErroe(ex));
};

export function doPost(url, data, cb) {
    POST_OPTION.body = JSON.stringify(data);
    fetch(url, POST_OPTION)
        .then(status)
        .then(json)
        .then((response) => cb(response))
        .catch((ex) => dealWithErroe(ex));
}

export function doDelete(url, cb) {
    fetch(url, DELETE_OPTION)
        .then(status)
        .then(json)
        .then((response) => cb(response))
        .catch((ex) => dealWithErroe(ex));
}

export function uploadFileWithData(url, file, postData, cb) {
    var data = new FormData();
    data.append('file', file);
    data.append('data', JSON.stringify(postData));
    POST_OPTION.body = data;
    fetch(url, POST_OPTION)
        .then(status)
        .then(json)
        .then((response) => cb(response))
        .catch((ex) => dealWithErroe(ex));
}

export function uploadFile(url, filedname, file, cb) {
    var data = new FormData();
    data.append(filedname, file);
    UPLOAD_OPTION.body = data;
    fetch(url, UPLOAD_OPTION)
        .then(status)
        .then(json)
        .then((response) => cb(response))
        .catch((ex) => dealWithErroe(ex));
}

