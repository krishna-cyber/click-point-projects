"use client";
import { Button, Layout, Menu, theme, Avatar } from "antd";

import React, { useState, useMemo } from "react";
import {
  Blocks,
  LayoutDashboard,
  Menu as MenuIcon,
  MenuSquare,
  NotebookPen,
  User,
  Users,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
const { Header, Sider, Content } = Layout;

interface LayoutPageProps {
  children: React.ReactNode;
}

const LayoutPage: React.FC<LayoutPageProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const selectedKey = useMemo(() => {
    if (pathname === "/dashboard/users") {
      return "2";
    } else if (pathname === "/dashboard/category") {
      return "3";
    } else if (
      pathname === "/dashboard/content" ||
      pathname === "/dashboard/contents"
    ) {
      return "4";
    } else if (pathname === "/dashboard") {
      return "1";
    } else {
      return "1"; // Default to dashboard
    }
  }, [pathname]);

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          insetInlineStart: 0,
          top: 0,
          bottom: 0,
          scrollbarWidth: "thin",
          scrollbarGutter: "stable",
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical text-white">Logo section</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={[
            {
              key: "1",
              icon: <LayoutDashboard />,
              label: "Dashboard",
              onClick: () => {
                router.push("/dashboard");
              },
            },
            {
              key: "2",
              icon: <Users />,
              label: "Users",
              onClick: () => {
                router.push("/dashboard/users");
              },
            },
            {
              key: "3",
              icon: <Blocks />,
              label: "Category",
              onClick: () => {
                router.push("/dashboard/category");
              },
            },
            {
              key: "4",
              icon: <NotebookPen />,
              label: "Contents",
              onClick: () => {
                router.push("/dashboard/content");
              },
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
            icon={collapsed ? <MenuSquare /> : <MenuIcon />}
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
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
