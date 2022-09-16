import axios from 'axios';
const service = axios.create({
    baseURL: 'http://111.229.163.181:8009/opt/',
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
    console.log('%c [ data ]-9', 'font-size:13px; background:pink; color:#bf2c9f;', data)
    if (data.code != null && data.code === 0) {
        return data.data;
    }

    return Promise.reject(data);
}, errorHandler);

export { service as axios };
