import { useCallback, useEffect, useRef, useState } from "react";
import { Checkbox, Form, Modal, notification, Table, Typography } from "antd";
import { EditOutlined } from '@ant-design/icons';

import { CreateProfessionalTypeForm } from "../../components/CreateProfessionalTypeForm";

import { ProfessionalType } from "../../types";
import { getProfessionalsType } from "../../services/getProfessionalsType";
import { updateProfessionalType } from "../../services/updateProfessionalType";

const { Title } = Typography;

function getProfessionalsTypeDataSource(data: ProfessionalType[]) {
  return data.map((professionalType) => ({
    key: professionalType.id,
    description: professionalType.description,
    situation: professionalType.situation
  }));
}

function findItemIndexBydId(professionalsType: ProfessionalType[], id: string) {
  return professionalsType.findIndex((professionalType) => professionalType.id === id);
}

export function ListProfessionalsType() {
  const [professionalsType, setProfessionalsType] = useState<ProfessionalType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const selectedProfessionalType = useRef<{
    index: number;
    data: ProfessionalType;
  }>();
  
  const handleCancel = useCallback(() => setIsModalOpen(false), []);

  const handleOk = useCallback(async () => {
    setConfirmLoading(true);
    form.submit();
    const formData = form.getFieldsValue();
    try {
      await updateProfessionalType(
        selectedProfessionalType.current?.data.id!,
        formData
      );
      const result = await getProfessionalsType();
      setProfessionalsType(result);
      notification.success({
        message: 'Sucesso!',
        description: 'O cargo foi atualizado com sucesso',
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsModalOpen(false);
      setConfirmLoading(false);
    }
  }, []);
  
  useEffect(() => {
    setIsLoading(true);
    getProfessionalsType()
      .then((res) => setProfessionalsType(res))
      .finally(() => setIsLoading(false));
  }, []);
  
  return (
    <div>
      <Title>Lista de Cargos</Title>
      <Table
        columns={[
          {
            key: 'description',
            title: 'Descrição',
            dataIndex: 'description',
            width: '80%'
          },
          {
            key: 'situation',
            title: 'Situação',
            dataIndex: 'situation',
            render: (value: boolean) => (
              <Checkbox checked={value} disabled={false} />
            ),
            width: '10%'
          },
          {
            title: '',
            key: 'action',
            render: (value: { key: string }) => (
              <EditOutlined
                onClick={() => {
                  const index = findItemIndexBydId(professionalsType, value.key);
                  selectedProfessionalType.current = {
                    index,
                    data: professionalsType[index]
                  };
                  setIsModalOpen(true);
                }}
              />
            ),
            width: '10%'
          },
        ]}
        dataSource={getProfessionalsTypeDataSource(professionalsType)}
        loading={isLoading}
        pagination={false}
      />
      <Modal
        title="Atualizar Cargo"
        open={isModalOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <CreateProfessionalTypeForm
          form={form}
          defaultValues={professionalsType[selectedProfessionalType.current?.index!]}
        />
      </Modal>
    </div>
  );
}