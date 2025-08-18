"use client";
import React, { useState } from "react";
import { Button, Dropdown, Space, message, Table, Tag } from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import { ChevronDown, Eye, FilePenLine, Share2, Trash } from "lucide-react";
import { TableRowSelection } from "antd/es/table/interface";

interface PermissionSchema {
  name: string;
  status: string;
  slug: string;
}

export interface DataType {
  name: string;
  email: string;
  roles: string;
  permission: PermissionSchema[];
  createdAt: string;
  updatedAt: string;
}

const handleMenuClick: MenuProps["onClick"] = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};

const getMenuItems = (permissions: PermissionSchema[]) => {
  return [
    {
      label: "View",
      key: "1",
      icon: <Eye />,
      disabled: !permissions.some((p) => p.name == "view"),
    },
    {
      label: "Edit",
      key: "2",
      icon: <FilePenLine />,
      disabled: !permissions.some((p) => p.name == "edit"),
    },
    {
      label: "Share",
      key: "3",
      icon: <Share2 />,
      disabled: !permissions.some((p) => p.name == "share"),
    },
    {
      label: "Delete",
      key: "4",
      icon: <Trash />,
      danger: true,
      disabled: !permissions.some((p) => p.name == "delete"),
    },
  ];
};
const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "E-mail",
    dataIndex: "email",
  },
  {
    title: "Roles",
    dataIndex: "roles",
  },
  {
    title: "Permission",
    dataIndex: "permission",
    render(value, record) {
      return (
        <>
          {record.permission.map((permission) => {
            return <Tag key={permission.slug}>{permission.name}</Tag>;
          })}
        </>
      );
    },
  },
];

const dataSource = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    roles: "admin",
    permission: [
      { name: "edit", status: "active", slug: "/edit" },
      { name: "view", status: "active", slug: "/view" },
      { name: "delete", status: "active", slug: "/delete" },
      { name: "share", status: "active", slug: "/share" },
    ],
    createdAt: "2025-08-13T10:00:00.000Z",
    updatedAt: "2025-08-13T10:00:00.000Z",
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    roles: "manager",
    permission: [
      { name: "view", status: "active", slug: "/view" },
      { name: "edit", status: "active", slug: "/edit" },
      { name: "share", status: "active", slug: "/share" },
    ],
    createdAt: "2025-08-13T10:05:00.000Z",
    updatedAt: "2025-08-13T10:05:00.000Z",
  },
  {
    name: "Charlie Brown",
    email: "charlie@example.com",
    roles: "user",
    permission: [{ name: "view", status: "active", slug: "/view" }],
    createdAt: "2025-08-13T10:10:00.000Z",
    updatedAt: "2025-08-13T10:10:00.000Z",
  },
  {
    name: "Diana Prince",
    email: "diana@example.com",
    roles: "admin",
    permission: [
      { name: "edit", status: "active", slug: "/edit" },
      { name: "view", status: "active", slug: "/view" },
      { name: "delete", status: "active", slug: "/delete" },
      { name: "share", status: "active", slug: "/share" },
    ],
    createdAt: "2025-08-13T10:15:00.000Z",
    updatedAt: "2025-08-13T10:15:00.000Z",
  },
  {
    name: "Eve Adams",
    email: "eve@example.com",
    roles: "manager",
    permission: [
      { name: "view", status: "active", slug: "/view" },
      { name: "edit", status: "active", slug: "/edit" },
      { name: "share", status: "active", slug: "/share" },
    ],
    createdAt: "2025-08-13T10:20:00.000Z",
    updatedAt: "2025-08-13T10:20:00.000Z",
  },
  {
    name: "Frank Miller",
    email: "frank@example.com",
    roles: "user",
    permission: [{ name: "view", status: "active", slug: "/view" }],
    createdAt: "2025-08-13T10:25:00.000Z",
    updatedAt: "2025-08-13T10:25:00.000Z",
  },
  {
    name: "Grace Lee",
    email: "grace@example.com",
    roles: "admin",
    permission: [
      { name: "edit", status: "active", slug: "/edit" },
      { name: "view", status: "active", slug: "/view" },
      { name: "delete", status: "active", slug: "/delete" },
      { name: "share", status: "active", slug: "/share" },
    ],
    createdAt: "2025-08-13T10:30:00.000Z",
    updatedAt: "2025-08-13T10:30:00.000Z",
  },
  {
    name: "Henry Ford",
    email: "henry@example.com",
    roles: "manager",
    permission: [
      { name: "view", status: "active", slug: "/view" },
      { name: "edit", status: "active", slug: "/edit" },
      { name: "share", status: "active", slug: "/share" },
    ],
    createdAt: "2025-08-13T10:35:00.000Z",
    updatedAt: "2025-08-13T10:35:00.000Z",
  },
  {
    name: "Ivy Parker",
    email: "ivy@example.com",
    roles: "user",
    permission: [{ name: "view", status: "active", slug: "/view" }],
    createdAt: "2025-08-13T10:40:00.000Z",
    updatedAt: "2025-08-13T10:40:00.000Z",
  },
  {
    name: "Jack Black",
    email: "jack@example.com",
    roles: "admin",
    permission: [
      { name: "edit", status: "active", slug: "/edit" },
      { name: "view", status: "active", slug: "/view" },
      { name: "delete", status: "active", slug: "/delete" },
      { name: "share", status: "active", slug: "/share" },
    ],
    createdAt: "2025-08-13T10:45:00.000Z",
    updatedAt: "2025-08-13T10:45:00.000Z",
  },
  {
    name: "Karen White",
    email: "karen@example.com",
    roles: "manager",
    permission: [
      { name: "view", status: "active", slug: "/view" },
      { name: "edit", status: "active", slug: "/edit" },
      { name: "share", status: "active", slug: "/share" },
    ],
    createdAt: "2025-08-13T10:50:00.000Z",
    updatedAt: "2025-08-13T10:50:00.000Z",
  },
  {
    name: "Liam Nelson",
    email: "liam@example.com",
    roles: "user",
    permission: [{ name: "view", status: "active", slug: "/view" }],
    createdAt: "2025-08-13T10:55:00.000Z",
    updatedAt: "2025-08-13T10:55:00.000Z",
  },
  {
    name: "Mia Wong",
    email: "mia@example.com",
    roles: "admin",
    permission: [
      { name: "edit", status: "active", slug: "/edit" },
      { name: "view", status: "active", slug: "/view" },
      { name: "delete", status: "active", slug: "/delete" },
      { name: "share", status: "active", slug: "/share" },
    ],
    createdAt: "2025-08-13T11:00:00.000Z",
    updatedAt: "2025-08-13T11:00:00.000Z",
  },
  {
    name: "Noah Davis",
    email: "noah@example.com",
    roles: "manager",
    permission: [
      { name: "view", status: "active", slug: "/view" },
      { name: "edit", status: "active", slug: "/edit" },
      { name: "share", status: "active", slug: "/share" },
    ],
    createdAt: "2025-08-13T11:05:00.000Z",
    updatedAt: "2025-08-13T11:05:00.000Z",
  },
  {
    name: "Olivia Green",
    email: "olivia@example.com",
    roles: "user",
    permission: [{ name: "view", status: "active", slug: "/view" }],
    createdAt: "2025-08-13T11:10:00.000Z",
    updatedAt: "2025-08-13T11:10:00.000Z",
  },
  {
    name: "Paul Harris",
    email: "paul@example.com",
    roles: "admin",
    permission: [
      { name: "edit", status: "active", slug: "/edit" },
      { name: "view", status: "active", slug: "/view" },
      { name: "delete", status: "active", slug: "/delete" },
      { name: "share", status: "active", slug: "/share" },
    ],
    createdAt: "2025-08-13T11:15:00.000Z",
    updatedAt: "2025-08-13T11:15:00.000Z",
  },
  {
    name: "Quinn Taylor",
    email: "quinn@example.com",
    roles: "manager",
    permission: [
      { name: "view", status: "active", slug: "/view" },
      { name: "edit", status: "active", slug: "/edit" },
      { name: "share", status: "active", slug: "/share" },
    ],
    createdAt: "2025-08-13T11:20:00.000Z",
    updatedAt: "2025-08-13T11:20:00.000Z",
  },
  {
    name: "Rachel Scott",
    email: "rachel@example.com",
    roles: "user",
    permission: [{ name: "view", status: "active", slug: "/view" }],
    createdAt: "2025-08-13T11:25:00.000Z",
    updatedAt: "2025-08-13T11:25:00.000Z",
  },
  {
    name: "Samuel King",
    email: "samuel@example.com",
    roles: "admin",
    permission: [
      { name: "edit", status: "active", slug: "/edit" },
      { name: "view", status: "active", slug: "/view" },
      { name: "delete", status: "active", slug: "/delete" },
      { name: "share", status: "active", slug: "/share" },
    ],
    createdAt: "2025-08-13T11:30:00.000Z",
    updatedAt: "2025-08-13T11:30:00.000Z",
  },
  {
    name: "Tina Brooks",
    email: "tina@example.com",
    roles: "manager",
    permission: [
      { name: "view", status: "active", slug: "/view" },
      { name: "edit", status: "active", slug: "/edit" },
      { name: "share", status: "active", slug: "/share" },
    ],
    createdAt: "2025-08-13T11:35:00.000Z",
    updatedAt: "2025-08-13T11:35:00.000Z",
  },
];
const UserTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <Table
      size="small"
      rowSelection={rowSelection}
      rowKey={"email"}
      columns={[
        ...columns,
        {
          title: "Actions",
          key: "actions",
          render(value, record) {
            return (
              <Dropdown
                menu={{
                  items: getMenuItems(record.permission),
                  onClick: handleMenuClick,
                }}
              >
                <Button>
                  <Space>
                    Actions
                    <ChevronDown />
                  </Space>
                </Button>
              </Dropdown>
            );
          },
        },
      ]}
      dataSource={dataSource}
    />
  );
};

export default UserTable;
