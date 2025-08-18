"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Dropdown, Space, message, Table, Tag } from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import {
  ChevronDown,
  Eye,
  FilePenLine,
  Plus,
  Share2,
  Trash,
} from "lucide-react";
import { TableRowSelection } from "antd/es/table/interface";
import { getCategories } from "../../../../lib/http/api";
import { useRouter } from "next/navigation";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
const items: MenuProps["items"] = [
  {
    label: "View",
    key: "1",
    icon: <Eye />,
  },
  {
    label: "Edit",
    key: "2",
    icon: <FilePenLine />,
  },
  {
    label: "Share",
    key: "3",
    icon: <Share2 />,
  },
  {
    label: "Delete",
    key: "4",
    icon: <Trash />,
    danger: true,
    // disabled: true,
  },
];
const handleMenuClick: MenuProps["onClick"] = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};

const menuProps = {
  items,
  onClick: handleMenuClick,
};

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Status",
    dataIndex: "status",
    render(value) {
      return value == "active" ? (
        <Tag color="#2db7f5">{value}</Tag>
      ) : (
        <Tag color="#f50">{value}</Tag>
      );
    },
  },
  {
    title: "Slug",
    dataIndex: "slug",
  },
];

const CategoryTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  console.log(data?.data);

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
  const router = useRouter();

  return (
    <>
      <Button
        type="primary"
        className=" my-2"
        onClick={() => {
          router.push("/dashboard/category/create");
        }}
        icon={<Plus />}
      >
        Create new category
      </Button>

      <Table
        loading={isLoading}
        size="small"
        rowSelection={rowSelection}
        columns={[
          ...columns,
          {
            title: "Actions",
            key: "actions",
            render() {
              return (
                <Dropdown menu={menuProps}>
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
        dataSource={data?.data}
      />
    </>
  );
};

export default CategoryTable;
