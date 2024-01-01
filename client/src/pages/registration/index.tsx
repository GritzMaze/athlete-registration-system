import {
  SolutionOutlined,
  SmileOutlined,
  UploadOutlined,
  PayCircleOutlined,
} from '@ant-design/icons';
import { Button, Steps, message } from 'antd';
import './index.css';
import { useState } from 'react';
import { RegistrationFormComponent } from '../../components/registration-form';
import { UploadComponent } from '../../components/upload/upload';
import { PayComponent } from '../../components/pay';
import { useSearchParams } from 'react-router-dom';



export function RegistrationPage() {
  const [searchParams] = useSearchParams();
  const cancel = searchParams.get('cancel');
  const [current, setCurrent] = useState(cancel ? 2 : 0);


  const steps = [
    {
      title: 'Personal Information',
      status: 'finish',
      icon: <SolutionOutlined />,
      content: <RegistrationFormComponent />
    },
    {
        title: 'Document Upload',
        status: 'finish',
        icon: <UploadOutlined />,
        content: <UploadComponent />,
      },
    {
      title: 'Pay',
      status: 'process',
      icon: <PayCircleOutlined />,
      content: <PayComponent />,
    },
    {
      title: 'Done',
      status: 'wait',
      icon: <SmileOutlined />,
      content: 'Done',
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className='registration-container'>
      <Steps items={items} current={current} />
      <div>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
      {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        {current < steps.length - 2 && (
          <Button type='primary' onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type='primary'
            onClick={() => message.success('Processing complete!')}
          >
            Done
          </Button>
        )}
      </div>
    </div>
  );
}
