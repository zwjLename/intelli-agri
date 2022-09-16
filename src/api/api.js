import { axios } from "./request";

export const hisAggrQuery = async payload => {
    return await axios({
        url: '/hisAggrQuery',
        method: 'GET',
        params: payload,
    });
}