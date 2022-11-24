import axios from 'axios';
import { message } from "antd";

const service = axios.create({
    timeout: 60 * 1000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    }
});

const errorHandler = error => {
    const { response } = error;
    if (response && response.status) {
        response.data.msg && message.error(response.data.msg);
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
