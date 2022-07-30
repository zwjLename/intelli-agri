import React from "react";
import styleJson1 from "../configs/mapJson";

// 创建信息窗口
var opts = {
  width: 200,
  height: 100,
  title: "故宫博物院",
};

export class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.map = {};
  }

  componentDidMount() {
    const map = new window.BMap.Map("map-container");
    var point = new window.BMap.Point(116.404, 39.928);
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom(true);
    map.setMapStyleV2({ styleJson: styleJson1 });
    // 创建点标记
    var marker1 = new window.BMap.Marker(
      new window.BMap.Point(116.404, 39.925)
    );
    // var marker2 = new window.BMap.Marker(
    //   new window.BMap.Point(116.404, 39.915)
    // );
    // var marker3 = new window.BMap.Marker(
    //   new window.BMap.Point(116.395, 39.935)
    // );
    var marker4 = new window.BMap.Marker(
      new window.BMap.Point(116.415, 39.931)
    );
    // 在地图上添加点标记
    map.addOverlay(marker1);
    // map.addOverlay(marker2);
    // map.addOverlay(marker3);
    map.addOverlay(marker4);

    const infoWindow = new window.BMap.InfoWindow(
      "地址：北京市东城区王府井大街88号乐天银泰百货八层",
      opts
    );
    // 点标记添加点击事件
    marker1.addEventListener("click", function() {
      map.openInfoWindow(infoWindow, point); // 开启信息窗口
    });
    marker4.addEventListener("click", function() {
      map.openInfoWindow(infoWindow, point); // 开启信息窗口
    });
  }
  render() {
    console.log("------", window.BMap);
    return <div id="map-container" style={{ height: "100%" }} />;
  }
}
