import React from "react";
import { listCellsByIds, termSta } from "../api/api";
// import styleJson from "../configs/mapJson";
// import { markData } from "../configs/mapData";
import { cell_ids,cellToTem } from "./const.ts";
import { constructTip } from "../configs/utils"
import { connect } from "react-redux";
import { current_point } from "../store/actions/map";
import  "./MapComponent.scss";

 const MapComponentUI = ({current_point, mapData}) => {
  React.useEffect(() => {
    const map = new window.BMap.Map("map-container");
    const point = new window.BMap.Point(118.8599, 31.86263);
    map.centerAndZoom(point, 11);
    map.enableScrollWheelZoom(true);
  listCellsByIds({ids: cell_ids}).then(res => {
    
    // map.setMapStyleV2({ styleJson });
    res.forEach((ele) => {
      const eachPoint = new window.BMap.Point(ele.longitude, ele.latitude)
      // 创建点标记
      const marker = new window.BMap.Marker(eachPoint);
      map.addOverlay(marker);
     
      marker.addEventListener("click", () => {
        // todo
        const termid = cellToTem[ele.id];
        const opts = {
          width: 250, // 信息窗口宽度
          height: 120, // 信息窗口高度
          title: '<h4>' + ele.name + '</h4>', // 信息窗口标题
        }
        termSta({termid}).then(res => {
          const { html} = constructTip(res); // 自定义窗口的内容以及样式
          map.openInfoWindow(new window.BMap.InfoWindow(html.join(""), opts), eachPoint)
          current_point({
            termid: res.termid,
            cellid: ele.id
          })
        })
      })
    })
  })

  }, [])

  React.useEffect(() => {
    console.log('%c [ 查看store中的mapData ]-55', 'font-size:13px; background:pink; color:#bf2c9f;', mapData)
  }, [mapData])
  
  return <div id="map-container" style={{ height: "100%" }} />;
}

export const MapComponent = connect(state => ({mapData: state.mapData}), {current_point})(MapComponentUI)