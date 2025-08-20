"use client";

import { Button, Dropdown, Space, Table, TableColumnsType } from "antd";
import { ChevronDown, FilePenLine, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PermissionType } from "../../../types/types";
import { TableRowSelection } from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import {
  deletePermissionById,
  getPermissions,
  getPermissionsOfUser,
} from "../../../lib/http/api";
import { UserContext, UserContextType } from "../../../lib/context/userContext";

const columns: TableColumnsType<PermissionType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const PermissionViewTable = () => {
  const { user } = React.useContext(UserContext) as UserContextType;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const router = useRouter();

  const { data: userPermissions } = useQuery({
    queryKey: ["permissions", "user", user?._id],
    queryFn: () =>
      user?._id
        ? getPermissionsOfUser(user._id, "permission")
        : Promise.resolve([]),
    enabled: !!user?._id,
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["userPermissions"],
    queryFn: getPermissions,
  });

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<PermissionType> = {
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
      <Button
        type="primary"
        style={{
          marginRight: "20px",
        }}
        onClick={() => {
          router.push("/dashboard/permission/create");
        }}
        icon={<Plus />}
      >
        Create Permission
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
                        key: "2",
                        icon: <FilePenLine />,
                        disabled: !userPermissions?.includes("edit/update"),
                      },
                      {
                        label: "Delete",
                        key: "3",
                        onClick: () => {
                          if (record._id) {
                            deletePermissionById(record._id);
                          }
                        },
                        icon: <Trash />,
                        danger: true,
                        disabled: !userPermissions?.includes("delete"),
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

export default PermissionViewTable;
