import {
  SolutionOutlined,
  UploadOutlined,
  PayCircleOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Alert, Button, Space, Spin, Steps, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAsync } from '../../hooks/use-async';
import { registrationService } from '../../services/registration.service';

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

  const [searchParams] = useSearchParams();

  const registrationId = searchParams.get('registrationId');

  const { error, loading } = useAsync(async () => {
    if (!registrationId) {
      message.error('Registration not found');
      return undefined;
    }
    registrationService.confirm(Number(registrationId));
  }, [registrationId]);

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Alert type='error' message={(error as any).message || error} />;
  }

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
