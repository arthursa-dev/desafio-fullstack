import { useCallback, useRef, useState } from "react";
import { Button, Card, Form, Layout, notification, Typography } from "antd";

import { CreateProfessionalForm } from "../../components/CreateProfessionalForm";

import { createProfessional } from "../../services/createProfessional";

const { Content } = Layout;
const { Title } = Typography;

export function AddProfessionals() {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const handleCreateProfessional = useCallback(async () => {
    setIsLoading(true);
    form.submit();
    const formData = form.getFieldsValue();
    try {
      await createProfessional(formData);
      form.resetFields();
      notification.success({
        message: 'Sucesso!',
        description: 'O profissional foi criado com sucesso',
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(true);
    }
  }, []);
  
  return (
    <div>
      <Title>Cadastrar Profissional</Title>
      <Content style={{ display: 'flex', justifyContent: 'center' }}>
        <Card style={{ width: 720 }}>
          <CreateProfessionalForm form={form} />
          <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type="primary"
              loading={isLoading}
              onClick={handleCreateProfessional}
            >
              Cadastrar
            </Button>
          </Form.Item>
        </Card>
      </Content>
    </div>
  );
}
