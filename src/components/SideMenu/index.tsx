import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import { MenuInfo } from 'rc-menu/lib/interface';
import React, { PropsWithChildren, useState } from 'react';
import Footer from '../Footer';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem(
      'Item 1',
      'g1',
      null,
      [getItem('查找伙伴', '/partner/searchPartner'), getItem('Option 2', '2')],
      'group',
    ),
    getItem(
      'Item 2',
      'g2',
      null,
      [getItem('用户信息', '/partner/selfInfo'), getItem('Option 4', '4')],
      'group',
    ),
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('查找伙伴', '/partner/searchPartner'),
    getItem('查找伙伴', '/partner/searchPartner'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),

  { type: 'divider' },

  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('用户信息', '/partner/selfInfo'),
    getItem('用户信息', '/partner/selfInfo'),
  ]),

  getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
];

const SideMenu: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  function pageSelect({ key, keyPath, domEvent }: MenuInfo): void {
    console.log(key);
    history.push(key);
  }

  const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

  return (
    <Layout>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          width="256px"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
        >
          <div className="demo-logo-vertical" />
          <Menu
            onClick={pageSelect}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
            theme="light"
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '0 16px' }}>{children}</Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SideMenu;
