import { DatePicker, Form, Input, InputNumber, Modal, message } from 'antd';
import { Event } from '../../models';
import { useAsyncAction } from '../../hooks/use-async-action';
import { eventsService } from '../../services/events.service';
import dayjs from 'dayjs';
import { useCurrentUser } from '../context/current-user-context';


interface EventDialogProps {
    isModalOpen: boolean;
    setModalOpen: (isOpen: boolean) => void;
    reload: () => void;
    event?: Event;
}

export function EventDialog({ isModalOpen, setModalOpen, reload, event }: EventDialogProps) {
  const [form] = Form.useForm();
  const user = useCurrentUser();

    const { loading, error, perform } = useAsyncAction(async (formInput: Event) => {
        if (event) {
            await eventsService.put<Event>(event.id, formInput);
        } else {
            await eventsService.post<Event>({...formInput, managerId: user.user?.id || 0});
        }
        reload();
        setModalOpen(false);
    });

    const handleOk = async () => {
      try {
        if (await form.validateFields()) {
            form.submit();
            perform(form.getFieldsValue());
        }
      } catch (error) {
        console.log(error);
      }
    }

    const handleCancel = () => {
        setModalOpen(false);
    }

    if (error) {
        message.error(`Error: ${(error as any)?.message || error}`);
    }

    return (
        <Modal title="Create/Update Event" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Submit" confirmLoading={loading}>
             <Form
      form={form}
      name='register'
      initialValues={{ name: event?.name, date: dayjs(event?.date), location: event?.location, participationFee: event?.participationFee }}
      style={{ maxWidth: 600, minWidth: 360 }}
      >

        <Form.Item
        name='name'
        label='Event Name'
        rules={[
          {
            required: true,
            message: 'Event name is required!',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='date'
        label='Date'
        style={{ width: '100%' }}
        rules={[{ required: true, message: 'Date is required!' }]}
        hasFeedback
      >
        <DatePicker 
        format='DD/MM/YYYY'
        />
      </Form.Item>

        <Form.Item
            name='location'
            label='Location'
            rules={[{ required: true, message: 'Location is required!' }]}
            hasFeedback
        >
            <Input />
        </Form.Item>

        <Form.Item
            name='participationFee'
            label='Price'
            rules={[{ required: true, message: 'Price is required!' }]}
            hasFeedback
        >
            <InputNumber addonAfter="$" defaultValue={20} />
        </Form.Item>
        <Form.Item
            name='image'
            label='Image'
            rules={[{ required: true, message: 'Image is required!' }]}
            hasFeedback
        >
            <Input />
        </Form.Item>

      </Form>
      </Modal>
    )
}