import { temids } from "../components/const.tsx";
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

// 查询一段时间内（按天）所有气象参数统计
export const getDailyParam = async payload => {
    return await axios({
        url: '/api/opt/dailyParamByTerm',
        method: 'GET',
        // params: payload,
        // todo
        params: {
            ...payload,
        }
    });
}

// 查询某气象站日出日落和时长
export const getSunTime = async payload => {
    return await axios({
        url: '/api/opt/termSunTime',
        method: 'GET',
        params: payload,
    });
}

// 查询某气象站的日总辐射、日均辐射、峰值日照时间、日光积分DLI
export const getIlluIntgl = async payload => {
    return await axios({
        url: '/api/opt/termIlluIntgl',
        method: 'GET',
        params: payload,
    });
}

// 查询在线离线的情况
export const getOnlineAndOffline = async () => {
    return await axios({
        url: '/api/opt/termStaNumLst',
        method: 'GET',
        params: {
            term_lst: temids
        }
    })
}