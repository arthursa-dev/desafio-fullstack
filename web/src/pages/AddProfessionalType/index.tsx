import { useCallback, useState } from "react";
import { Button, Card, Form, Layout, notification, Typography } from "antd";

import { CreateProfessionalTypeForm } from "../../components/CreateProfessionalTypeForm";

import { createProfessionalType } from "../../services/createProfessionalType";

const { Content } = Layout;
const { Title } = Typography;

export function AddProfessionalType() {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const handleCreateProfessional = useCallback(async () => {
    setIsLoading(true);
    form.submit();
    const formData = form.getFieldsValue();
    try {
      await createProfessionalType(formData);
      form.resetFields();
      notification.success({
        message: 'Sucesso!',
        description: 'O cargo foi criado com sucesso',
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return (
    <div>
      <Title>Cadastrar Cargo</Title>
      <Content style={{ display: 'flex', justifyContent: 'center' }}>
        <Card style={{ width: 720 }}>
          <CreateProfessionalTypeForm form={form} />
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
