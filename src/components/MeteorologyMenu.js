import { Menu } from "antd";
import { connect } from "react-redux";
import { changeMenu } from "../store/actions/menu";
import { AttrItem } from "./const.tsx";

// 气象菜单
const MeteorologyMenuUI = ({
  activeKey,
  changeMenu
}) => {
  return (
    <>
      <Menu mode="horizontal"
        defaultSelectedKeys={[activeKey + ""]}
        onSelect={menu => changeMenu(menu.key)}>
        {
          Object.keys(AttrItem).map((item, _) => (
            <Menu.Item key={item}>{AttrItem[item]}</Menu.Item>
          ))
        }
      </Menu>
    </>
  );
};
export const MeteorologyMenu = connect(
  state => ({activeKey: state.menu}),
  {changeMenu}
)(MeteorologyMenuUI);
