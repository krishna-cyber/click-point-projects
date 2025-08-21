"use client";

import {
  Button,
  Dropdown,
  message,
  Space,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { ChevronDown, Plus, Trash, UserRoundPen } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RoleType } from "../../../../types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteRoleById,
  getPermissionsOfUser,
  getRoles,
} from "../../../../lib/http/api";
import {
  UserContext,
  UserContextType,
} from "../../../../lib/context/userContext";

const columns: TableColumnsType<RoleType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Permissions",
    dataIndex: "permissons",
    render(value, record) {
      return (
        <>
          {record.permissions.map((permission) => (
            <Tag key={permission._id}>
              {`${permission.name}/${permission.action}`}
            </Tag>
          ))}
        </>
      );
    },
  },
];

const RolesTable = () => {
  const { user } = React.useContext(UserContext) as UserContextType;
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data: userPermissions } = useQuery({
    queryKey: ["permissions", "role", user?._id],
    queryFn: () =>
      user?._id ? getPermissionsOfUser(user._id, "role") : Promise.resolve([]),
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<RoleType> = {
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
    <div>
      {contextHolder}
      <Button
        type="primary"
        style={{
          marginRight: "20px",
        }}
        onClick={() => {
          router.push("/dashboard/role/create");
        }}
        icon={<Plus />}
      >
        Create Role
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

            render(value, record) {
              return (
                <Dropdown
                  menu={{
                    items: [
                      {
                        label: "Edit/Update",
                        key: "3",
                        icon: <UserRoundPen />,
                        disabled: !userPermissions?.includes("edit/update"),
                        onClick: () => {
                          router.push(`/dashboard/role/edit/${record.name}`);
                        },
                      },
                      {
                        label: "Delete",
                        key: "4",
                        icon: <Trash />,
                        danger: true,
                        disabled: !userPermissions?.includes("delete"),
                        onClick: () => {
                          deleteRoleById(record._id);
                          queryClient.invalidateQueries({
                            queryKey: ["roles"],
                          });
                          messageApi.info("Role has been deleted successfully");
                        },
                      },
                    ],
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
    </div>
  );
};

export default RolesTable;
