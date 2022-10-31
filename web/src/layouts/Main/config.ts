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
      key: '/',
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
          key: '/professionals',
          label: 'Listar',
          onClick: () => navigate('/professionals')
        },
        {
          key: '/add-professional',
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
          key: '/professionals-type',
          label: 'Listar',
          onClick: () => navigate('/professionals-type')
        },
        {
          key: '/add-professional-type',
          label: 'Cadastrar',
          onClick: () => navigate('/add-professional-type')
        }
      ]
    },
  ]);
}
