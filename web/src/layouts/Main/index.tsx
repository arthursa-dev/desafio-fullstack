import { ReactNode } from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

import { menuItems } from './config';

const { Content, Footer, Sider } = Layout;

type MainLayoutProps = {
  children?: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate();

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0
        }}
      >
        <Menu
          defaultSelectedKeys={['home']}
          theme="dark"
          mode="inline"
          items={menuItems(navigate)}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24 }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Desafio Fullstack
        </Footer>
      </Layout>
    </Layout>
  );
}
