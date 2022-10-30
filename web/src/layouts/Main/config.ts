import {
  AuditOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { createElement } from 'react';
import { NavigateFunction } from 'react-router-dom';

export function menuItems(navigate: NavigateFunction): MenuProps['items'] {
  return ([
    {
      key: 'home',
      icon: createElement(HomeOutlined),
      label: 'Home',
      onClick: () => navigate('/')
    },
    {
      key: 'professional',
      icon: createElement(UserOutlined),
      label: 'Profissionais',
      children: [
        {
          key: 'listProfessionals',
          label: 'Listar',
          onClick: () => navigate('/professionals')
        },
        {
          key: 'addProfessionals',
          label: 'Cadastrar',
          onClick: () => navigate('/add-professional')
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
  ]);
}
