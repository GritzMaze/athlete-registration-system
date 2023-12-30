import { Input, Checkbox, Button, Form, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.css';
import background from '../../assets/login-page-bg.webp';
import { Link, useNavigate } from 'react-router-dom';
import { useAsyncAction } from '../../hooks/use-async-action';
import { User } from '../../models';
import { authService } from '../../services/auth-service';

export function LoginPage() {
  const navigate = useNavigate();
  const { loading, error, trigger: submit } = useAsyncAction(async (user: User) => {
    await authService.login(user);

    navigate('/');
  });

  const onFinish = (values: User) => {
    submit(values);
  };

  return (
    <div className='container' style={{ backgroundImage: `url(${background})` }}>
        <div className='overlay'></div>
      
      <div className='login-container'>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Username'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox style={{color: `white`}}>Remember me</Checkbox>
          </Form.Item>

          <a className='login-form-forgot' href=''>
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            loading={loading}
            disabled={loading}
          >
            Log in
          </Button>
          <span style={{color: `white`}}>Or </span><Link to='/register'>register now!</Link>
        </Form.Item>
        {!!error && <Alert type="error" message={ error.toString() } closable></Alert>}
      </Form>
      </div>
    </div>
  );
}
