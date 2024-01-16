import {
  SolutionOutlined,
  SmileOutlined,
  UploadOutlined,
  PayCircleOutlined,
} from '@ant-design/icons';
import { Button, Spin, Steps, message } from 'antd';
import './index.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RegistrationFormComponent } from '../../components/registration-form';
import { UploadComponent } from '../../components/upload/upload';
import { PayComponent } from '../../components/pay';
import { useSearchParams } from 'react-router-dom';
import { registrationStepContextService } from '../../services/registration-step-context.service';
import { registrationService } from '../../services/registration.service';
import { registrationContextService } from '../../services/registration-context.service';
import { Registration } from '../../models';
import { Event as EventType } from '../../models/events';
import { useAsync } from '../../hooks/use-async';
import { eventsService } from '../../services/events.service';
import dayjs from 'dayjs';



export function RegistrationPage() {
  const [searchParams] = useSearchParams();
  const cancel = searchParams.get('cancel');
  const [current, setCurrent] = useState(cancel ? 2 : 0);
  const eventId = searchParams.get('eventId');
  const registrationId = searchParams.get('registrationId');
  const [nextPage, setNextPage] = useState<number>(0);

  const onCompleted = useCallback(() => setCurrent(nextPage), [nextPage]);
  const onCompletedRef = useRef<() => void>(onCompleted);


  const {loading, error, completed: registrationCompleted } = useAsync(async () => {
    if (!registrationId) {
      return undefined;
    }
    const { birthDate, ...rest } = await registrationService.get<Registration>(Number(registrationId));
    registrationContextService.registrationContext = { ...rest, birthDate: dayjs(birthDate) };
    return registrationContextService.registrationContext;
  }, [registrationId]);

  const { data: event, loading: eventLoading, error: eventError, completed: eventCompleted } = useAsync(async () => {
    if (!eventId) {
      return undefined;
    }
    const data = await eventsService.get<EventType>(Number(eventId));
    return data;
  }, [eventId]);

  const steps = [
    {
      title: 'Personal Information',
      status: 'finish',
      icon: <SolutionOutlined />,
      content: <RegistrationFormComponent event={ event } onCompleted={ onCompleted } />
    },
    {
        title: 'Document Upload',
        status: 'finish',
        icon: <UploadOutlined />,
        content: <UploadComponent onCompleted={ onCompleted }/>,
      },
    {
      title: 'Pay',
      status: 'process',
      icon: <PayCircleOutlined />,
      content: <PayComponent onCompleted={ onCompleted } price={event?.participationFee} registrationId={Number(registrationId)} />,
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

  const next = async () => {
    let isValid = false;
    try {
      isValid = await registrationStepContextService.validateStep();
      
    }
    catch (err) {
      // do nothing
    }
    
    if (isValid) {
      setNextPage(current + 1);
      console.log('submit step')
      registrationStepContextService.submitStep();
    }
  };

  const prev = async () => {
    let isValid = false;
    try {
      isValid = await registrationStepContextService.validateStep();
    }
    catch (err) {
      // do nothing
    }
    if (isValid) {
      setNextPage(current - 1);
      console.log('submit step')
      registrationStepContextService.submitStep();
    }
  };

  if (error) {
    message.error(`An error occurred while fetching existing registration: ${error}`);
  }

  if (eventError) {
    message.error(`An error occurred while fetching event: ${eventError}`);
  }

  if (loading || eventLoading && !(registrationCompleted && eventCompleted)) {
    return <Spin />;
  }
  return (
    <div className='registration-container'>
      <Steps items={items} current={current} />
      {<div>{steps[current].content}</div> }
      <div style={{ marginTop: 24 }}>
      {current > 0 && (
          <Button loading={registrationStepContextService.getLoading()} style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        {current < steps.length - 2 && (
          <Button loading={registrationStepContextService.getLoading()} type='primary' onClick={() => next()}>
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
