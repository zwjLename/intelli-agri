import "./MeteorologyMenu.scss"
import { Menu } from "antd";
import { MAttrItem } from "./const.ts";

// 气象菜单
export const MeteorologyMenu = ({
  activeKey,
  onChange
}) => {
  return (
    <div className="meteorology-menu">
      <Menu mode="horizontal" defaultSelectedKeys={[activeKey]} onSelect={onChange}>
        {
          Object.keys(MAttrItem).map((item, _) => (
            <Menu.Item key={item}>{MAttrItem[item]}</Menu.Item>
          ))
        }
      </Menu>
    </div>
  );
};
