import { Input, Button, Form, Alert, Select } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import './index.css';
import background from '../../assets/login-page-bg.webp';
import { Link, useNavigate } from 'react-router-dom';
import { useAsyncAction } from '../../hooks/use-async-action';
import { authService } from '../../services/auth-service';
import { Role, User } from '../../models';

// TODO: Unify this and login page
export function RegisterPage() {

  const navigate = useNavigate();
  const { loading, error, trigger: submit } = useAsyncAction(async (user: User) => {
    await authService.register(user);

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
              message: 'Username is required',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Username'
          />
        </Form.Item>
        <Form.Item
          name='email'
          hasFeedback
          rules={[
            {
              type: 'email',
              message: 'Email is not valid',
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item
          name='role'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Role is required',
            },
          ]}
        >
          <Select
            placeholder='Select a role'
          >
            <Select.Option value={Role.ATHLETE}>Athlete</Select.Option>
            <Select.Option value={Role.COACH}>Coach</Select.Option>
            <Select.Option value={Role.MANAGER}>Manager</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='password'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Password is required',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item
          name='confirmPassword'
          hasFeedback
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Confirm password is required',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The passwords does not match!'));
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Confirm Password'
          />
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            loading={loading}
            disabled={loading}
          >
            Register
          </Button>
          <span style={{color: `white`}}>Or </span><Link to='/login'>log in!</Link>
        </Form.Item>
        {!!error && <Alert type="error" message={ error.toString() } closable></Alert>}
      </Form>
      </div>
    </div>
  );
}
