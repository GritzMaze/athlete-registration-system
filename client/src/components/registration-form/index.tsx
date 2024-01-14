import { useEffect, useState } from 'react';
import {
  Alert,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Spin,
} from 'antd';
import { Event as EventType } from '../../models/events';
import { useCurrentUser } from '../context/current-user-context';
import { countriesService } from '../../services/countries.service';
import { useAsyncAction } from '../../hooks/use-async-action';
import { registrationStepContextService } from '../../services/registration-step-context.service';
import { Registration } from '../../models';
import { registrationService } from '../../services/registration.service';
import { registrationContextService } from '../../services/registration-context.service';
import dayjs from 'dayjs';
import { eventsService } from '../../services/events.service';
import { useAsync } from '../../hooks/use-async';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const EVENTS = [
  '100m',
  '200m',
  '400m',
  '800m',
  '1500m',
  '5000m',
  '10000m',
  '110m hurdles',
  '400m hurdles',
  '3000m steeplechase',
  'High Jump',
  'Long Jump',
  'Triple Jump',
  'Pole Vault',
  'Shot Put',
  'Discus Throw',
  'Hammer Throw',
  'Javelin Throw',
  'Decathlon',
  'Heptathlon',
  '4x100m Relay',
  '4x400m Relay',
]

interface RegistrationFormComponentProps {
  event?: EventType;
  onCompleted: () => void;
}
export function RegistrationFormComponent({ event, onCompleted }: RegistrationFormComponentProps) {
  const [form] = Form.useForm();
  const user = useCurrentUser();
  const [dirty, setDirty] = useState(false);
  const url = new URL(window.location.href);
  const registrationId = url.searchParams.get('registrationId');
  const [selectedEvent, setSelectedEvent] = useState<EventType | undefined>(event);

  registrationStepContextService.setStepSubmitter(form.submit);
  registrationStepContextService.setStepValidator(form.validateFields);

  const { perform: registrationPerform } = useAsyncAction(async (formInput: Registration) => {
    registrationStepContextService.setLoading(true);
    const context = registrationContextService.registrationContext;
    let data: Registration;
    const toSubmit = { ...formInput, userId: user.user?.id, eventId: selectedEvent?.id };
    if (!context?.id) {
      data = await registrationService.post<Registration>(toSubmit);
    } else {
      data = await registrationService.put<Registration>(context.id, toSubmit);
    }
    const { birthDate, ...rest } = data;
    registrationContextService.registrationContext = { ...rest, birthDate: dayjs(birthDate) };

    if (!registrationId) {
      url.searchParams.set('registrationId', String(data.id));
      window.history.pushState({}, '', url.toString());
    }
    onCompleted();
    registrationStepContextService.setLoading(false);
    return data;
  });

  
  const { data: events, loading: eventsLoading, error: eventsError, trigger: eventsTrigger } = useAsyncAction(async () => {
    const data = await eventsService.getAll<EventType[]>();
    return data;
  });

  const onFinish = (values: Registration) => {
    if (dirty) {
      registrationPerform(values);
    }
  };

  const onEventSelected = (id: number) => {
    const event = events?.query.find((event) => event.id === id);
    setSelectedEvent(event);
    url.searchParams.set('eventId', String(id));
    window.history.pushState({}, '', url.toString());
  }


  const { data: countries, loading, perform } = useAsyncAction(async () => {
    const data = await countriesService.getCountries();
    return data.map((country) => ({
      label: country.name,
      value: country.name,
      emoji: country.flag,
    }));
  });


  useEffect(() => {
    perform();
    eventsTrigger();
  }, [eventsTrigger, perform]);

  const federations = [
    {
      value: 'bulgaria',
      label: 'Bulgarian Athletics Federation',
    },
    {
      value: 'other',
      label: 'Foreign Athletics Federation',
    },
  ]

  // clean up

  useEffect(() => {
    return () => {
      registrationStepContextService.disconnect();
    }
  }, [])

  if (eventsError) {
    return <Alert message='Error' description={(eventsError as any)?.message || eventsError} type='error' />;
  }

  if (!events && !eventsLoading && !event) {
    return <Alert message='Error' description='Event not found' type='error' />;
  }

  if (eventsLoading || !events) {
    return <Spin />;
  }

  
  if (registrationContextService.registrationContext) {
    form.setFieldsValue(registrationContextService.registrationContext);
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      name='register'
      onFinish={onFinish}
      initialValues={{ email: user.user?.email, country: 'Bulgaria', federation: 'bulgaria' }}
      style={{ maxWidth: 600, minWidth: 360 }}
      onFieldsChange={(changedFields) => {
        if (changedFields.length && !dirty) {
          setDirty(true);
        }

        if (!changedFields.length && dirty) {
          setDirty(false);
        }
      }
      }
      scrollToFirstError
    >
      <Form.Item
        name='eventId'
        label='Event'
        rules={[{ required: true, message: 'Event is required!' }]}
        hasFeedback
      >
      <Select
          placeholder='Select events'
          options={events!.query.map((event) => ({ label: event.name, value: event.id }))}
          virtual={true}
          showSearch
          onChange={onEventSelected}
        ></Select>
      </Form.Item>
      <Form.Item
        name='email'
        label='E-mail'
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'E-mail is required!',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='name'
        label='Athlete Name'
        tooltip='Name of the athlete to compete in the event.'
        rules={[
          {
            required: true,
            message: 'Athlete name is required!',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='birthDate'
        label='Date of Birth'
        style={{ width: '100%' }}
        rules={[{ required: true, message: 'Date of birth is required!' }]}
        hasFeedback
      >
        <DatePicker 
        format='DD/MM/YYYY'
        />
      </Form.Item>
      
      <Form.Item
        name='gender'
        label='Gender'
        rules={[{ required: true, message: 'Gender is required!' }]}
      >
        <Select placeholder='select your gender'>
          <Option value='male'>Male</Option>
          <Option value='female'>Female</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name='country'
        label='Country'
        rules={[{ required: true, message: 'Country is required!' }]}
        hasFeedback
      >
        <Select
          placeholder='Select your country'
          options={countries}
          loading={loading}
          optionRender={(option) => (
            <Space>
              <span role='img' aria-label={option.data.label}>
                {option.data.emoji}
              </span>
              {option.data.label}
            </Space>
          )}
          virtual={true}
          showSearch
        ></Select>
      </Form.Item>

      <Form.Item
        name='federation'
        label='Federation'
        rules={[{ required: true, message: 'Federation is required!' }]}
        hasFeedback
      >
        <Select
          placeholder='Select your federation'
          options={federations}
          virtual={true}
          showSearch
        ></Select>
      </Form.Item>

      <Form.Item
        name='events'
        label='Events'
        tooltip='Select the events the athlete will compete in.'
        rules={[{ required: true, message: 'Events are required!' }]}
        hasFeedback
      >
        <Select
          placeholder='Select events'
          options={EVENTS.map((event) => ({ label: event, value: event }))}
          virtual={true}
          mode='multiple'
          showSearch
          maxCount={3}
        ></Select>
      </Form.Item>

      <Form.Item
        name='club'
        label='Club'
        >
        <Input />
        </Form.Item>
    </Form>
  );
}
