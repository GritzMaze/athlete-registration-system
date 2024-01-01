import {
  SolutionOutlined,
  UploadOutlined,
  PayCircleOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Alert, Button, Space, Steps } from 'antd';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    title: 'Personal Information',
    icon: <SolutionOutlined />,
  },
  {
    title: 'Document Upload',
    icon: <UploadOutlined />,
  },
  {
    title: 'Pay',
    icon: <PayCircleOutlined />,
  },
  {
    title: 'Done',
    icon: <SmileOutlined />,
  },
];

export function SuccessRegistrationPage() {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/');
  };
  return (
    <div className='registration-container'>
      <Steps items={items} current={items.length} />
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Space direction='vertical' size='large'>
          <div>
            <Alert
              type='info'
              message='Thank you for your registration!'
            ></Alert>
          </div>
          <Button type='primary' onClick={navigateToHome}>
            Go to Home
          </Button>
        </Space>
      </div>
    </div>
  );
}
