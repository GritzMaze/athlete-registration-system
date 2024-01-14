import {
    DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';

export function AdminActions() {
  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: '1',
      icon: <EditOutlined />,
    },
    {
      label: 'Delete',
      key: '2',
      icon: <DeleteOutlined />,
      danger: true,
    }
  ];
  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <EllipsisOutlined key='ellipsis' />
      </a>
    </Dropdown>
  );
}
