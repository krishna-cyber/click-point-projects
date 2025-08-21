"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, message, Select, Typography } from "antd";
import {
  getPermissions,
  getRolesPermissions,
  updateRoleByName,
} from "../../../../../lib/http/api";
import { CreateRoleType } from "../../../../../types/types";

import React from "react";
import { useRouter } from "next/navigation";

const { Title } = Typography;

const EditForm = (params: { role: string }) => {
  const { role } = params;
  const [form] = Form.useForm();

  const createRole = useMutation({
    mutationFn: (values: CreateRoleType) => {
      return updateRoleByName(role, values);
    },
    onSuccess: () => {
      messageApi.success("Role created successfully!");
      form.resetFields();
      router.push("/dashboard/role");
    },
    onError: (error) => {
      messageApi.error(`Error: ${error.message}`);
    },
  });

  const router = useRouter();

  const { data: permissions, isLoading } = useQuery({
    queryKey: ["permissions"],
    queryFn: getPermissions,
  });

  const { data: rolePermissions } = useQuery({
    queryKey: ["permissions", role],
    queryFn: () => (role ? getRolesPermissions(role) : Promise.resolve([])),
    enabled: !!role,
  });

  form.setFieldValue("permissions", rolePermissions);
  form.setFieldValue("name", role);

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: CreateRoleType) => {
    createRole.mutate(values);

    messageApi.info("Role created successfully!");
    form.resetFields();
    router.push("/dashboard/role");
  };
  return (
    <>
      {contextHolder}

      <Title>Edit Role Form</Title>
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

export default EditForm;
