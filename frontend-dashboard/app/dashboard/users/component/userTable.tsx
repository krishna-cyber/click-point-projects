"use client";
import React, { useState } from "react";
import { Button, Dropdown, Space, Table, Tag } from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import { ChevronDown, Eye, FilePenLine, Plus, Trash } from "lucide-react";
import { TableRowSelection } from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import { getPermissionsOfUser, getUsers } from "../../../../lib/http/api";
import { UserDataType } from "../../../../types/types";
import { useRouter } from "next/navigation";
import {
  UserContext,
  UserContextType,
} from "../../../../lib/context/userContext";

const columns: TableColumnsType<UserDataType> = [
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
    dataIndex: "role",
    render(value, record) {
      return (
        <>
          {record?.roles?.map((role) => (
            <Tag
              key={role._id}
              color={
                role.name === "admin"
                  ? "green"
                  : role.name === "editor"
                  ? "blue"
                  : "red"
              }
            >
              {role.name}
            </Tag>
          ))}
        </>
      );
    },
  },
  {
    title: "Permission",
    dataIndex: "permission",

    render(value, record) {
      return (
        <>
          {record?.roles?.map((role) =>
            role.permissions.map((permission) => (
              <Tag
                key={permission._id}
              >{`${permission.name}/${permission.action}`}</Tag>
            ))
          )}
        </>
      );
    },
  },
];

const UserTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { user } = React.useContext(UserContext) as UserContextType;

  const router = useRouter();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const { data: userPermissions } = useQuery({
    queryKey: ["permissions", "user", user?._id],
    queryFn: () =>
      user?._id ? getPermissionsOfUser(user?._id, "user") : Promise.resolve([]),
    enabled: !!user?._id,
  });

  const items: MenuProps["items"] = [
    {
      label: "View",
      key: "1",
      icon: <Eye />,
      disabled: !userPermissions?.includes("read"),
    },
    {
      label: "Edit/Update",
      key: "2",
      icon: <FilePenLine />,
      disabled: !userPermissions?.includes("edit/update"),
    },
    {
      label: "Delete",
      key: "3",
      icon: <Trash />,
      danger: true,
      disabled: !userPermissions?.includes("delete"),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<UserDataType> = {
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
    <Space
      direction="vertical"
      style={{
        alignItems: "end",
      }}
    >
      <Button
        type="primary"
        style={{
          marginRight: "20px",
        }}
        onClick={() => {
          router.push("/dashboard/users/create");
        }}
        icon={<Plus />}
      >
        Create User
      </Button>
      <Table
        rowKey="_id"
        loading={isLoading || isFetching}
        size="small"
        rowSelection={rowSelection}
        columns={[
          ...columns,
          {
            title: "Actions",
            key: "actions",
            render() {
              return (
                <Dropdown
                  menu={{
                    items: items,
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
        dataSource={data}
      />
    </Space>
  );
};

export default UserTable;
