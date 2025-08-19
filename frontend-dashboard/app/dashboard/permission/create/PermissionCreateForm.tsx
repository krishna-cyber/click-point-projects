"use client";
import { Button, Form, Input, message, Typography } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { CreatePermissionType } from "../../../../types/types";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../lib/http/api";

const { Title } = Typography;
const PermissionCreateForm = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const createPermisson = useMutation({
    mutationFn: (data: CreatePermissionType) => {
      return api.post("/permission", data);
    },
  });
  const onFinish = (values: CreatePermissionType) => {
    console.log("Received values of form: ", values);
    createPermisson.mutate(values);

    messageApi.info("Permission created successfully!");
    form.resetFields();
    router.push("/dashboard/permission");
  };

  return (
    <>
      {contextHolder}
      <Title>Create Role Form</Title>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Permission Name"
          rules={[
            {
              required: true,
              message: "Please input the permission name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="action"
          label="Action"
          rules={[
            {
              required: true,
              message: "Please input the action",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            disabled={createPermisson.isPending}
            type="primary"
            htmlType="submit"
          >
            Create Permission
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default PermissionCreateForm;
