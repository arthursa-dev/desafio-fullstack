import {
  AuditOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { createElement } from 'react';

export const menuItems: MenuProps['items'] = [
  {
    key: 'home',
    icon: createElement(HomeOutlined),
    label: 'Home',
  },
  {
    key: 'professional',
    icon: createElement(UserOutlined),
    label: 'Profissionais',
    children: [
      {
        key: 'listProfessionals',
        label: 'Listar',
      },
      {
        key: 'addProfessionals',
        label: 'Cadastrar',
      }
    ]
  },
  {
    key: 'professionalType',
    icon: createElement(AuditOutlined),
    label: 'Cargos',
    children: [
      {
        key: 'listProfessionalsType',
        label: 'Listar',
      },
      {
        key: 'addProfessionalsType',
        label: 'Cadastrar',
      }
    ]
  },
];