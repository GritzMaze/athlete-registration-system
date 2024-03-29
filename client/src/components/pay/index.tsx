import { Alert, Button, Space } from 'antd';
import { paymentService } from '../../services/payment.service';
import { Typography } from 'antd';
import { useCurrentUser } from '../context/current-user-context';
import { useSearchParams } from 'react-router-dom';
import { registrationStepContextService } from '../../services/registration-step-context.service';
import { useEffect } from 'react';

const { Text } = Typography;

interface PayComponentProps {
  onCompleted: () => void;
  price: number | undefined;
  registrationId: number | undefined;
}

export function PayComponent({ onCompleted, price, registrationId }: PayComponentProps) {
  console.log("🚀 ~ PayComponent ~ registrationId:", registrationId)
  const { user } = useCurrentUser();
  const [searchParams] = useSearchParams();
  const cancel = searchParams.get('cancel');
  const eventId = searchParams.get('eventId');


  registrationStepContextService.setStepSubmitter(onCompleted);

  useEffect(() => {
    return () => {
      registrationStepContextService.disconnect();
    };
  }, []);

  const handleCheckout = async () => {
    await paymentService.checkout({
      product: 'registration',
      quantity: price || 1,
      mode: 'payment',
      successUrl:
        `http://localhost:3001/profile/registration/success?registrationId=${registrationId}`,
      cancelUrl: `http://localhost:3001/profile/registration?registrationId=${registrationId}&eventId=${eventId}&cancel=true`,
      metadata: {
        email: user?.email || '',
      },
    });
  };


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
        <Text>Price: {price} BGN</Text>
        <Button type='primary' onClick={handleCheckout}>
          Pay
        </Button>
      </Space>
    </>
  );
}
