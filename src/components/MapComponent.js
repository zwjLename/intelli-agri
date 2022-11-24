import { message } from "antd";
import React from "react";
import { connect } from "react-redux";
import { getOnlineAndOffline, listCellsByIds, termSta } from "../api/api";
import { constructTip } from "../configs/utils";
import IconGreen from "../imgs/marker_green.png";
import { current_point } from "../store/actions/map";
// import styleJson from "../configs/mapJson";
// import { markData } from "../configs/mapData";
import { cell_ids, cellToTem, termToCell } from "./const.tsx";
import "./MapComponent.scss";

const { BMap, BMAP_HYBRID_MAP } = window;
console.log('%c [ BMap ]-14', 'font-size:13px; background:pink; color:#bf2c9f;', BMap)


const MapComponentUI = ({ current_point, mapData }) => {
  const bmap = React.useRef();
  const [line, setLine] = React.useState({
    online: [],
    offline: [],
  });
  const onAndOffFunc = React.useCallback(async () => {
    try {
      const res = await getOnlineAndOffline();
      const { onlst, offlst } = res;
      setLine({
        online: onlst.map((ele) => termToCell[ele]), // 将term比阿诚cellid
        offline: offlst.map((ele) => termToCell[ele]),
      });
    } catch (e) {
      message.error("出错啦");
    }
  }, []);
  React.useEffect(() => {
    //添加地图控件, 矢量图和卫星图。 矢量图为卫星地图+矢量标注
    // bmap.current.addControl(new BMap.MapTypeControl({
    //  mapTypes: [
    //   //  BMAP_NORMAL_MAP, //矢量图
    //      //BMAP_SATELLITE_MAP,//卫星图， 此选项不起作用
    //      BMAP_HYBRID_MAP //混合图， 卫星+矢量图中的街道和标注
    //    ]
    //  }));
    bmap.current = new BMap.Map("map-container", {
      mapType: BMAP_HYBRID_MAP,
      enableRotate: false,
      enableTilt: false,
    });
    
    const point = new BMap.Point(118.8599, 31.86263);

    bmap.current.centerAndZoom(point, 11);
    bmap.current.enableScrollWheelZoom();

    const scaleCtrl = new BMap.ScaleControl(); // 添加比例尺控件
    bmap.current.addControl(scaleCtrl);
    const cityCtrl = new BMap.CityListControl(); // 添加城市列表控件
    // console.log('%c [ cityCtrl ]-34', 'font-size:13px; background:pink; color:#bf2c9f;', cityCtrl)
    bmap.current.addControl(cityCtrl);
    onAndOffFunc();
  }, [onAndOffFunc]);
  React.useEffect(() => {
    if (!line.online.length && !line.offline.length) return;
    listCellsByIds({ ids: cell_ids }).then((res) => {
      // map.setMapStyleV2({ styleJson });
      res.forEach((ele, ind) => {
        const eachPoint = new BMap.Point(ele.longitude, ele.latitude);
        // 创建点标记
        // const markerRed = new BMap.Marker(eachPoint);
        const myIcon = new BMap.Icon(IconGreen, new BMap.Size(52, 26));
        // const markerGreen = new BMap.Marker(eachPoint, { icon: myIcon });
        const marker = new BMap.Marker(
          eachPoint,
          line.online.includes(ele.id+'') ? { icon: myIcon } : {}
        );
        bmap.current.addOverlay(marker);

        marker.addEventListener("click", () => {
          const termid = cellToTem[ele.id];
          const opts = {
            width: 250, // 信息窗口宽度
            height: 120, // 信息窗口高度
            title: "<h4>" + ele.name + "</h4>", // 信息窗口标题
          };
          termSta({ termid }).then((res) => {
            const { html } = constructTip(res); // 自定义窗口的内容以及样式
            bmap.current.openInfoWindow(
              new BMap.InfoWindow(html.join(""), opts),
              eachPoint
            );
            current_point({
              termid: res.termid,
              cellid: ele.id,
            });
          });
        });
      });
    });
  }, [current_point, line]);

  return <div id="map-container" style={{ height: "100%" }} />;
};

export const MapComponent = connect((state) => ({ mapData: state.mapData }), {
  current_point,
})(MapComponentUI);
