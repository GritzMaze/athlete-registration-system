import { useState } from 'react';
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  ReconciliationOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth-service';

const centerStyle = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
};

const KEY_TO_PAGE_MAP: Record<string, string> = {
  home: '/',
  athletes: '/athletes',
  clubs: '/clubs',
  editProfile: '/profile/edit',
  register: '/profile/register',
  logout: '/login'
};

const PAGE_TO_KEY_MAP: Record<string, string> = {
  '': 'home',
  'athletes': 'athletes',
  'clubs': 'clubs',
  'profile/edit': 'editProfile',
  'profile/register': 'register',
};

const items: MenuProps['items'] = [
  {
    label: 'Home',
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: 'Athletes',
    key: 'athletes',
    icon: <TeamOutlined />,
  },
  {
    label: 'Clubs',
    key: 'clubs',
    icon: <ProfileOutlined />,
  },
  {
    label: 'Profile',
    key: 'SubMenu',
    icon: <UserOutlined />,
    children: [
      {
        label: 'Edit Profile',
        key: 'editProfile',
        icon: <SettingOutlined />,
      },
      {
        label: 'Register',
        key: 'register',
        icon: <ReconciliationOutlined />,
      },
      {
        label: 'Logout',
        key: 'logout',
        icon: <LogoutOutlined />,
      }
    ],
  },
];

function determineCurrentPage(url: string) {
  const splitUrl = url.split('/');

  if (splitUrl.length === 1) {
    return 'home';
  }

  if (splitUrl.length === 2) {
    return PAGE_TO_KEY_MAP[splitUrl[1]];
  }

  const firstLevelPage = splitUrl[1];
  const secondLevelPage = splitUrl[2];

  return PAGE_TO_KEY_MAP[`${firstLevelPage}/${secondLevelPage}`];
}

export function Navigation() {

  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = determineCurrentPage(location.pathname);
  const [current, setCurrent] = useState(currentPage);

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);

    if (e.key === 'logout') {
      authService.logout();
    }

    navigate(KEY_TO_PAGE_MAP[e.key] ?? '');
  };

  return (
    <Menu
      style={centerStyle}
      onClick={onClick}
      selectedKeys={[current]}
      theme='dark'
      mode='horizontal'
      items={items}
    />
  );
}
