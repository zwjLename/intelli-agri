import React from "react";
import { connect } from "react-redux";
import { listCellsByIds, termSta } from "../api/api";
import { constructTip } from "../configs/utils";
import IconGreen from "../imgs/marker_green.png";
import { current_point } from "../store/actions/map";
// import styleJson from "../configs/mapJson";
// import { markData } from "../configs/mapData";
import { cell_ids, cellToTem } from "./const.ts";
import "./MapComponent.scss";

const { BMap, BMAP_SATELLITE_MAP,BMAP_NORMAL_MAP,BMAP_HYBRID_MAP } = window;
console.log(
  "%c [ BMAP_EARTH_MAP ]-13",
  "font-size:13px; background:pink; color:#bf2c9f;",
  BMAP_SATELLITE_MAP,
  // window,
  BMAP_HYBRID_MAP
);

const MapComponentUI = ({ current_point, mapData }) => {
  const bmap = React.useRef();
  React.useEffect(() => {
    bmap.current = new BMap.Map("map-container", {
      mapType: BMAP_HYBRID_MAP,
      enableRotate: false,
      enableTilt: false
    });
    //添加地图控件, 矢量图和卫星图。 矢量图为卫星地图+矢量标注
    // bmap.current.addControl(new BMap.MapTypeControl({
    //  mapTypes: [
    //   //  BMAP_NORMAL_MAP, //矢量图
    //      //BMAP_SATELLITE_MAP,//卫星图， 此选项不起作用
    //      BMAP_HYBRID_MAP //混合图， 卫星+矢量图中的街道和标注
    //    ]
    //  }));
    const point = new BMap.Point(118.8599, 31.86263);
 
    bmap.current.centerAndZoom(point, 11);
    bmap.current.enableScrollWheelZoom();

    var scaleCtrl = new BMap.ScaleControl();  // 添加比例尺控件
    bmap.current.addControl(scaleCtrl);
    var cityCtrl = new BMap.CityListControl();  // 添加城市列表控件
    console.log('%c [ cityCtrl ]-34', 'font-size:13px; background:pink; color:#bf2c9f;', cityCtrl)
    bmap.current.addControl(cityCtrl);
    listCellsByIds({ ids: cell_ids }).then(res => {
      // map.setMapStyleV2({ styleJson });
      res.forEach((ele, ind) => {
        const eachPoint = new BMap.Point(ele.longitude, ele.latitude);
        // 创建点标记
        // const markerRed = new BMap.Marker(eachPoint);
        const myIcon = new BMap.Icon(IconGreen, new BMap.Size(52, 26));
        // const markerGreen = new BMap.Marker(eachPoint, { icon: myIcon });
        const marker = new BMap.Marker(eachPoint, ind%2? { icon: myIcon } : {})
        bmap.current.addOverlay(marker);

        marker.addEventListener("click", () => {
          const termid = cellToTem[ele.id];
          const opts = {
            width: 250, // 信息窗口宽度
            height: 120, // 信息窗口高度
            title: "<h4>" + ele.name + "</h4>", // 信息窗口标题
          };
          termSta({ termid }).then(res => {
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
  }, []);

  React.useEffect(
    () => {
      console.log(
        "%c [ 查看store中的mapData ]-55",
        "font-size:13px; background:pink; color:#bf2c9f;",
        mapData
      );
    },
    [mapData]
  );

  return <div id="map-container" style={{ height: "100%" }} />;
};

export const MapComponent = connect(state => ({ mapData: state.mapData }), {
  current_point,
})(MapComponentUI);
