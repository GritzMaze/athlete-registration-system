import { Alert, Button, Space } from 'antd';
import { paymentService } from '../../services/payment.service';
import { Typography } from 'antd';
import { useCurrentUser } from '../context/current-user-context';
import { useSearchParams } from 'react-router-dom';

const { Text } = Typography;

export function PayComponent() {
  const { user } = useCurrentUser();

  const handleCheckout = async () => {
    await paymentService.checkout({
      product: 'registration',
      quantity: 1,
      mode: 'payment',
      successUrl:
        'http://localhost:3001/profile/registration/success/session_id={CHECKOUT_SESSION_ID}',
      cancelUrl: 'http://localhost:3001/profile/registration?cancel=true',
      metadata: {
        email: user?.email || '',
      },
    });
  };

  const [searchParams] = useSearchParams();
  const cancel = searchParams.get('cancel');

  return (
    <>
      {cancel && (
        <div>
          <Alert
            message='Payment cancelled'
            description='You have cancelled your payment. You can try again by clicking the button.'
            type='info'
            showIcon
          />
        </div>
      )}

      <Space direction='vertical' size='large' style={{ textAlign: 'center' }}>
        <Text>
          You will be redirected to an another page for payment after clicking
          the button.
        </Text>
        <Button type='primary' onClick={handleCheckout}>
          Pay
        </Button>
      </Space>
    </>
  );
}
