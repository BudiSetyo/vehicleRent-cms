import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Radio } from "antd";
import { useState } from "react";
const Forms = () => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        requiredMarkValue: requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
      <Form.Item label="Field A" required tooltip="This is a required field">
        <Input type="email" placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        label="Field B"
        tooltip={{
          title: "Tooltip with customize icon",
          icon: <InfoCircleOutlined />,
        }}
      >
        <Input type="password" placeholder="input placeholder" />
      </Form.Item>
      <Form.Item>
        <Button className="bg-san-juan" type="primary">
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Forms;
