"use client";
import { Button, Layout, Menu, theme, Avatar } from "antd";
import React, { useState } from "react";
import {
  Blocks,
  LayoutDashboard,
  Menu as MenuIcon,
  NotebookPen,
  User,
  Users,
} from "lucide-react";
const { Header, Sider, Content } = Layout;

interface LayoutPageProps {
  children: React.ReactNode;
}

const LayoutPage: React.FC<LayoutPageProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical text-white">Logo section</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <LayoutDashboard />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <Users />,
              label: "Users",
            },
            {
              key: "3",
              icon: <Blocks />,
              label: "Category",
            },
            {
              key: "4",
              icon: <NotebookPen />,
              label: "Contents",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 10,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuIcon /> : <MenuIcon />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <nav className=" ml-auto px-6">
            <Avatar size={"default"} icon={<User />} />
          </nav>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
