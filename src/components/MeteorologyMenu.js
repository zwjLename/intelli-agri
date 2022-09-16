import "./MeteorologyMenu.scss"

import { Menu } from 'antd';

// 气象菜单
export const MeteorologyMenu = () => {

  return (
    <div className="meteorology-menu">
      <Menu mode="horizontal" defaultSelectedKeys={['data']}>
        <Menu.Item key="data">
          数据量
        </Menu.Item>
        <Menu.Item key="battery">
          电量
        </Menu.Item>
        <Menu.Item key="rate">
          省台率
        </Menu.Item>
      </Menu>
    </div>
  );
};
