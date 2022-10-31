import { useCallback, useEffect, useRef, useState } from "react";
import { Checkbox, Form, Modal, Table, Typography } from "antd";
import { EditOutlined } from '@ant-design/icons';

import { CreateProfessionalForm } from "../../components/CreateProfessionalForm";

import { getProfessionals } from "../../services/getProfessionals";
import { updateProfessional } from "../../services/updateProfessional";

import { Professional } from "../../types";

const { Title } = Typography;

function getProfessionalsDataSource(data: Professional[]) {
  return data.map((professional) => ({
    key: professional.id,
    name: professional.name,
    phone: professional.phone,
    email: professional.email,
    professionalType: professional.professionalType.description,
    situation: professional.situation
  }));
}

function findItemIndexBydId(professionals: Professional[], id: string) {
  return professionals.findIndex((professional) => professional.id === id);
}

export function ListProfessionals() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const selectedProfessional = useRef<{
    index: number;
    data: Professional;
  }>();
  
  const handleCancel = useCallback(() => setIsModalOpen(false), []);

  const handleOk = useCallback(async () => {
    setConfirmLoading(true);
    form.submit();
    const formData = form.getFieldsValue();
    try {
      await updateProfessional(selectedProfessional.current?.data.id!, formData);
      const result = await getProfessionals();
      setProfessionals(result)
    } catch (error) {
      console.log(error);
    } finally {
      setIsModalOpen(false);
      setConfirmLoading(false);
    }
  }, []);
  
  useEffect(() => {
    setIsLoading(true);
    getProfessionals()
      .then((res) => setProfessionals(res))
      .finally(() => setIsLoading(false));
  }, []);
  
  return (
    <div>
      <Title>Lista de Profissionais</Title>
      <Table
        id="professionals-table"
        columns={[
          {
            key: 'name',
            title: 'Nome',
            dataIndex: 'name',
          },
          {
            key: 'phone',
            title: 'Telefone',
            dataIndex: 'phone',
            responsive: ["sm"],
          },
          {
            key: 'email',
            title: 'E-mail',
            dataIndex: 'email',
            responsive: ["sm"],
          },
          {
            key: 'professionalType',
            title: 'Cargo',
            dataIndex: 'professionalType',
          },
          {
            key: 'situation',
            title: 'Situação',
            dataIndex: 'situation',
            responsive: ["sm"],
            render: (value: boolean) => (
              <Checkbox checked={value} disabled={false} />
            ),
          },
          {
            title: '',
            key: 'action',
            render: (value: { key: string }) => (
              <EditOutlined
                onClick={() => {
                  const index = findItemIndexBydId(professionals, value.key);
                  selectedProfessional.current = {
                    index,
                    data: professionals[index]
                  };
                  setIsModalOpen(true);
                }}
              />
            ),
          },
        ]}
        dataSource={getProfessionalsDataSource(professionals)}
        loading={isLoading}
        pagination={false}
      />
      <Modal
        title="Atualizar Profissional"
        open={isModalOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <CreateProfessionalForm
          form={form}
          defaultValues={professionals[selectedProfessional.current?.index!]}
        />
      </Modal>
    </div>
  );
}