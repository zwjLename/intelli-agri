import axios from 'axios';
const service = axios.create({
    baseURL: 'http://111.229.163.181:8009',
    timeout: 60 * 1000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    }
});

const errorHandler = error => {
    const { response } = error;
    if (response && response.status) {

        return Promise.reject();
    }
    if (!response) {

        return Promise.reject();
    }
    return Promise.reject(error);
};

service.interceptors.response.use(response => {
    const { data } = response;
    if (data.msg === 'SUCCESS' && data.code === 0) {
        return data.data;
    }

    return Promise.reject(data);
}, errorHandler);

export { service as axios };
