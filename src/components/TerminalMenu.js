import "./TerminalMenu.scss"
import { Menu } from "antd";
import { TAttrItem } from "./const.ts";

// 终端管理菜单
export const TerminalMenu = ({
  activeKey,
  
  onChange
}) => {
  console.log('%c [ activeKey ]-8', 'font-size:13px; background:pink; color:#bf2c9f;', activeKey)
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
