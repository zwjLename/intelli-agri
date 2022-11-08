import "./TerminalMenu.scss"
import { Menu } from "antd";
import { TAttrItem } from "./const.tsx";

// 终端管理菜单
export const TerminalMenu = ({
  activeKey,
  onChange
}) => {
  return (
    <div className="meteorology-menu">
      <Menu mode="horizontal" selectedKeys={[activeKey]} onSelect={onChange}>
        {
          Object.keys(TAttrItem).map((item, _) => (
            <Menu.Item key={item}>{TAttrItem[item]}</Menu.Item>
          ))
        }
      </Menu>
    </div>
  );
};
