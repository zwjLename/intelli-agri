import { axios } from "./request";

// 地图数据
export const listCellsByIds = async payload => {
    return await axios({
        url: '/celldef/listCellsByIds',
        method: 'GET',
        params:payload
    })
}

// 地图数据点的具体信息
export const termSta = async payload => {
    return await axios({
        url: '/opt/termSta',
        method: 'get',
        params: payload
    })
}
// 历史数据
export const hisAggrQuery = async payload => {
    return await axios({
        url: '/opt/hisAggrQuery',
        method: 'GET',
        params: payload,
    });
}