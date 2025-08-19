"use client";

import React from "react";
import { Button, Form, Input, message, Select, Typography } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api, getRoles } from "../../../../lib/http/api";
import { RegisterUserType } from "../../../../types/types";
import { useRouter } from "next/navigation";

const { Title } = Typography;

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const UserRegistrationForm: React.FC = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const registerUser = useMutation({
    mutationFn: (data: RegisterUserType) => {
      return api.post("/users", data);
    },
  });

  const [form] = Form.useForm();

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  const onFinish = (values: RegisterUserType) => {
    delete values?.confirm;

    registerUser.mutate(values);

    messageApi.info("User registered successfully!");
    form.resetFields();
    router.push("/dashboard/users");
  };

  return (
    <>
      {contextHolder}
      <Title>User Registration Form</Title>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="First name"
          rules={[
            {
              required: true,
              message: "Please input your name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "E-mail address is required!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="roles"
          label="Roles"
          rules={[
            { required: true, message: "Please select role!" },
            {
              type: "array",
            },
          ]}
        >
          <Select mode="multiple" placeholder="Select role">
            {roles?.map((role) => {
              return (
                <Option key={role._id} value={role._id}>
                  {role.name.toUpperCase()}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserRegistrationForm;
