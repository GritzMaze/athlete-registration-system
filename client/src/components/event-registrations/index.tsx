import { Modal, Spin, Table, TableColumnsType, Tag, message } from 'antd';
import { Registration, TransactionStatus } from '../../models';
import { Key } from 'antd/es/table/interface';
import { eventsService } from '../../services/events.service';
import { useAsyncAction } from '../../hooks/use-async-action';
import { useEffect } from 'react';
import dayjs from 'dayjs';

interface RegistrationProps {
    id: number;
    open: boolean;
    setOpen: (isOpen: boolean) => void;
}

export function EventRegistrations({ id, open, setOpen }: RegistrationProps) {

    const { data:participants, loading, error, trigger } = useAsyncAction(async () => {
        const data = await eventsService.getRegistrations(id);
        
        return data;
    });

    useEffect(() => {
        if (open) {
            trigger();
        }
    }, [open]);

    const columns: TableColumnsType<Registration> = [
        {
          title: 'Name',
          dataIndex: 'name',
          // specify the condition of filtering result
          // here is that finding the name started with `value`
          onFilter: (value: Key | boolean, record) => record.name.indexOf(value.toString()) === 0,
          sorter: (a, b) => a.name.length - b.name.length,
          sortDirections: ['descend'],
        },
        {
          title: 'Date of Birth',
          dataIndex: 'birthDate',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.birthDate.valueOf() - b.birthDate.valueOf(),
          render: (date: string) => (<>{ dayjs(date).format('DD/MM/YYYY') }</>),
        },
        {
          title: 'country',
          dataIndex: 'country',
          onFilter: (value: Key | boolean, record) => record.country.indexOf(value.toString()) === 0,
          sorter: (a, b) => a.country.length - b.country.length,
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
        },
        {
            title: 'events',
            dataIndex: 'events',
            render: (events: string[], _, index) => (
                <>
                    {events.map(event => {
                    return (
                        <Tag color='green' key={index}>
                        {event.toUpperCase()}
                        </Tag>
                    );
                    })}
                </>
                ),
        },
        {
            title: 'Status',
            dataIndex: 'ParticipationFeeStatus',
            render: (status: TransactionStatus, _, index) => {
                let color = 'green';
                if (status === TransactionStatus.FAILED) {
                    color = 'red';
                }
                if (status === TransactionStatus.PENDING) {
                    color = 'blue';
                }
                return (
                    <Tag color={color} key={index}>
                        {status.toUpperCase()}
                    </Tag>
                );
            },
        },

      ];

      if (error) {
        message.error('Internal server error: ' + error);
        setOpen(false);
        return null;
    }

    return (
        <Modal
        style={{ maxWidth: 700, minWidth: 700 }}
        title="Event Registrations"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        >
        { loading && <Spin /> }
        { !loading && <Table columns={columns} dataSource={participants} /> }
        </Modal>
    )
}