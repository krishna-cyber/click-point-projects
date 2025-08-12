"use client";
import React, { useState } from "react";
import { Button, Dropdown, Space, message, Table } from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import { ChevronDown, Eye, FilePenLine, Share2, Trash } from "lucide-react";
import { TableRowSelection } from "antd/es/table/interface";

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
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Slug",
    dataIndex: "slug",
  },
  {
    title: "Author",
    dataIndex: "author",
  },
];

const dataSource = Array.from({ length: 46 }).map<DataType>((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));

const ContentTable = () => {
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
      rowSelection={rowSelection}
      bordered
      pagination={{
        size: "small",
        total: 50,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
        showQuickJumper: true,
        showSizeChanger: true,
      }}
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
      dataSource={dataSource}
    />
  );
};

export default ContentTable;
