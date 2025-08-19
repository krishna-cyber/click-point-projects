"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, message, Select, Typography } from "antd";
import React from "react";
import { api, getPermissions } from "../../../../lib/http/api";
import { CreateRoleType } from "../../../../types/types";
import { useRouter } from "next/navigation";

const { Title } = Typography;

const RoleCreateForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { data: permissions, isLoading } = useQuery({
    queryKey: ["permissions"],
    queryFn: getPermissions,
  });

  const router = useRouter();
  const createRole = useMutation({
    mutationFn: (data: CreateRoleType) => {
      return api.post("/role", data);
    },
  });
  const [form] = Form.useForm();

  const onFinish = (values: CreateRoleType) => {
    console.log("Received values of form: ", values);
    createRole.mutate(values);

    messageApi.info("Role created successfully!");
    form.resetFields();
    router.push("/dashboard/role");
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
          label="Role Name"
          rules={[
            {
              required: true,
              message: "Please input the role name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="permissions"
          label="Permissions"
          rules={[
            { required: true, message: "Please select permissions!" },
            {
              type: "array",
            },
          ]}
        >
          <Select mode="multiple" placeholder="Select permissions">
            {permissions?.map((permission) => {
              return (
                <Select.Option key={permission._id} value={permission._id}>
                  {`${permission.name}/${permission.action}`}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button disabled={isLoading} type="primary" htmlType="submit">
            Create Role
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RoleCreateForm;
