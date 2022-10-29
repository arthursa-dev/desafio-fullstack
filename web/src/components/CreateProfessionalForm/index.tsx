import { useEffect, useState } from "react";
import { Form, FormInstance, Input, Select, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import { getProfessionalsType } from "../../services/getProfessionalsType";

import { Professional, ProfessionalType } from "../../types";

const { Option } = Select;

type CreateProfessionalFormProps = {
  form: FormInstance;
  defaultValues?: Professional; 
};

export function CreateProfessionalForm({ form, defaultValues }: CreateProfessionalFormProps) {
  const [professionalsType, setProfessionalsType] = useState<ProfessionalType[]>([]);

  useEffect(() => {
    getProfessionalsType()
    .then((res) => setProfessionalsType(res));
  }, []);

  useEffect(() => {
    if (defaultValues) {
      form.setFieldsValue({
        name: defaultValues?.name,
        phone: defaultValues?.phone,
        email: defaultValues?.email,
        professionalType: defaultValues?.professionalType.id,
        situation: defaultValues?.situation,
      });
    }
  }, [defaultValues]);
  
  return (
    <Form
      layout="vertical"
      form={form}
    >
      <Form.Item 
        label="Nome" 
        name="name"
        required 
        rules={[{ message: 'Digite o nome', required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Telefone"
        name="phone"
        required 
        rules={[{
          message: 'Digite o telefone',
          required: true,
          len: 14
        }]}
        normalize={(value) => (
          value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3')
        )}
      >
        <Input placeholder="Somente números" maxLength={14} />
      </Form.Item>
      <Form.Item
        label="E-mail"
        name="email"
        required 
        rules={[{ message: 'Digite o endereço de e-mail', required: true, type: 'email' }]}
      >
        <Input placeholder="(99)99999-9999" />
      </Form.Item>
      <Form.Item
        label="Cargo"
        name="professionalType"
        required 
        rules={[{ message: 'Selecione um cargo', required: true }]}
      >
        <Select
          placeholder="Selecione um cargo"
        >
          {professionalsType.map((professionalType) => (
            <Option
              key={professionalType.id}
              value={professionalType.id}
            >
              {professionalType.description}
            </Option>
          ))}
        </Select>
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