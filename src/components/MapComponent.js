import React from "react";
// import styleJson from "../configs/mapJson";
import { markData } from "../configs/mapData";

// 创建信息窗口
var opts = {
  width: 100,
  height: 10,
  // title: "故宫博物院",
};

export class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.map = {};
  }

  componentDidMount() {
    const map = new window.BMap.Map("map-container");
    const point = new window.BMap.Point(118.8599, 31.86263);
    map.centerAndZoom(point, 11);
    map.enableScrollWheelZoom(true);
    // map.setMapStyleV2({ styleJson });
    markData.forEach((ele) => {
      const eachPoint = new window.BMap.Point(ele.lo, ele.la)
      // 创建点标记
      const marker = new window.BMap.Marker(eachPoint);
      map.addOverlay(marker);
      // const label = new window.BMap.Label(ele.name, {       // 创建文本标注
      //   position: eachPoint,                          // 设置标注的地理位置
      //   // offset: new window.BMap.Size(10, 20)           // 设置标注的偏移量
      // })
      // map.addOverlay(label);
      // label.setStyle({                              // 设置label的样式
      //   // color: '#0088cc',
      //   fontSize: '12px',
      //   border: 'transparent',
      //   background: 'transparent'
      // })
      marker.addEventListener("click", function () {
        map.openInfoWindow(new window.BMap.InfoWindow(ele.name, opts), eachPoint)
      })

    })

    // var marker1 = new window.BMap.Marker(
    //   new window.BMap.Point(116.404, 39.925)
    // );
    // var marker2 = new window.BMap.Marker(
    //   new window.BMap.Point(116.404, 39.915)
    // );
    // var marker3 = new window.BMap.Marker(
    //   new window.BMap.Point(116.395, 39.935)
    // );
    // var marker4 = new window.BMap.Marker(
    //   new window.BMap.Point(116.415, 39.931)
    // );
    // 在地图上添加点标记
    // map.addOverlay(marker1);
    // map.addOverlay(marker2);
    // map.addOverlay(marker3);
    // map.addOverlay(marker4);

    // const infoWindow = new window.BMap.InfoWindow(
    //   "地址：北京市东城区王府井大街88号乐天银泰百货八层",
    //   opts
    // );
    // 点标记添加点击事件
    // marker1.addEventListener("click", function () {
    //   map.openInfoWindow(infoWindow, point); // 开启信息窗口
    // });
    // marker4.addEventListener("click", function () {
    //   map.openInfoWindow(infoWindow, point); // 开启信息窗口
    // });
  }
  render() {
    console.log("------", window.BMap);
    return <div id="map-container" style={{ height: "100%" }} />;
  }
}
