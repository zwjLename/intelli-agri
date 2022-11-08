import React from "react";
import { Menu } from 'antd';
import { Attr, AttrItem } from "./const.tsx";

// 农时-菜单
export const FarmTimeMenu = ({
  activeKey,
  onChange
}) => {

  return (
    <div className="farmtime-menu">
      {
        <Menu mode="horizontal" defaultSelectedKeys={[activeKey]} onSelect={onChange}>
          <Menu.SubMenu key={Attr.warm} title={AttrItem[Attr.warm]}>
            <Menu.Item key="temperature">
              温度
            </Menu.Item>
            <Menu.Item key="accumulated-temperature" >
              积温
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key={Attr.wet}>
            {AttrItem[Attr.wet]}
          </Menu.Item>
          <Menu.SubMenu key={Attr.light} title={AttrItem[Attr.light]}>
            <Menu.Item key={Attr.light + "_1"}>
              日照时间
            </Menu.Item>
            <Menu.Item key={Attr.light + "_2"}>
              日照时数
            </Menu.Item>
            <Menu.Item key={Attr.light + "_3"} >
              峰值日照时间
            </Menu.Item>
            <Menu.Item key={Attr.light + "_4"}>
              日光积分DLI
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key={Attr.wind}>
            {AttrItem[Attr.wind]}
          </Menu.Item>
          <Menu.SubMenu key={Attr.rain} title={AttrItem[Attr.rain]}>
            <Menu.Item key={Attr.rain + "_1"}>
              降雨量(mm)
            </Menu.Item>
            <Menu.Item key={Attr.rain + "_2"}>
              降雨强度(mm/h)
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      }
    </div>
  );
};
