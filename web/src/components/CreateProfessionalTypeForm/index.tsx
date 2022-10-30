import { useEffect } from "react";
import { Form, FormInstance, Input, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import { ProfessionalType } from "../../types";

type CreateProfessionalFormProps = {
  form: FormInstance;
  defaultValues?: ProfessionalType; 
};

export function CreateProfessionalTypeForm({ form, defaultValues }: CreateProfessionalFormProps) {
  useEffect(() => {
    if (defaultValues) {
      form.setFieldsValue({
        description: defaultValues?.description,
        situation: defaultValues?.situation,
      });
    }
  }, [defaultValues]);
  
  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ situation: false }}
    >
      <Form.Item 
        label="Descrição" 
        name="description"
        required
        rules={[{ message: 'Digite a descrição', required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Situação"
        name="situation"
        required 
        rules={[{ message: 'Selecione a situação', required: true }]}
        valuePropName="checked"
      >
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={false}
        />
      </Form.Item>
    </Form>
  );
}