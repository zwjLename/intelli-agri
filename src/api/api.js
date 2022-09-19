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

// 查询地图选中的生产单元的气象趋势
export const hisAggrQuery = async payload => {
    return await axios({
        url: '/opt/hisAggrQuery',
        method: 'GET',
        params: payload,
    });
}

// 查询地图选中的生产单元的详细终端状态数据
export const getTerminalData = async payload => {
    return await axios({
        url: '/opt/timeTermSta',
        method: 'GET',
        params: payload,
    });
}
