import { axios } from "./request";

// 地图数据
export const listCellsByIds = async payload => {
    return await axios({
        url: '/api/celldef/listCellsByIds',
        method: 'GET',
        params:payload
    })
}

// 地图数据点的具体信息
export const termSta = async payload => {
    return await axios({
        url: '/api/opt/termSta',
        method: 'get',
        params: payload
    })
}

// 查询地图选中的生产单元的气象趋势
export const hisAggrQuery = async payload => {
    return await axios({
        // url: '/opt/hisAggrQuery',
        url: '/api/opt/termtypeHisQuery',
        method: 'GET',
        params: payload,
    });
}

// 查询地图选中的生产单元的详细终端状态数据
export const getTerminalData = async payload => {
    return await axios({
        url: '/api/opt/timeTermSta',
        method: 'GET',
        params: payload,
    });
}

// 查询当前终端的在线、离线数量及列表
export const getTerminalStatus = async payload => {
    return await axios({
        url: '/api/opt/termStaNumLst',
        method: 'GET',
        params: payload,
    });
}

// 查询一段时间内所有气象终端数据统计
export const getTerminalHis = async payload => {
    return await axios({
        url: '/api/opt/hisStaByTerm',
        method: 'GET',
        params: payload,
    });
}