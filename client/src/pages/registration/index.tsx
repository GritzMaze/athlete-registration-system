import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Button, FormInstance, Steps, message } from 'antd';
import './index.css';
import { useState } from 'react';
import { RegistrationFormComponent } from '../../components/registration-form';
import { UploadComponent } from '../../components/upload/upload';



export function RegistrationPage() {
  const [current, setCurrent] = useState(0);

  const submitRegistrationForm = (form: FormInstance): boolean => {
    form.validateFields().then((values) => {
        return true;
    }
    ).catch((error) => {
        return false;
    });
    return false;
  }


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
      icon: <LoadingOutlined />,
      content: 'Last-content',
    },
    {
      title: 'Done',
      status: 'wait',
      icon: <SmileOutlined />,
      content: 'Last-content',
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
        {current < steps.length - 1 && (
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
