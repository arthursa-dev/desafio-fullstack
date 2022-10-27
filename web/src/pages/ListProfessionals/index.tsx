import { useEffect, useState } from "react";
import { Checkbox, Table, Typography } from "antd";
import { EditOutlined } from '@ant-design/icons';

import { getProfessionals } from "../../services/getProfessionals";

import type { ColumnsType } from 'antd/es/table';
import { Professional } from "../../types";

const { Text, Title } = Typography;

interface DataType {
  key: string;
  name: string;
  phone: string;
  email: string;
  professionalType: string;
  situation: boolean
}

const columns: ColumnsType<DataType> = [
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
    render: () => (
      <EditOutlined />
    ),
  },
];

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

export function ListProfessionals() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  
  useEffect(() => {
    getProfessionals()
    .then((res) => setProfessionals(res));
  }, []);
  
  return (
    <div>
      <Title>Lista de Profissionais</Title>
      <Table
        id="professionals-table"
        columns={columns}
        dataSource={getProfessionalsDataSource(professionals)}
        pagination={false}
      />
    </div>
  );
}