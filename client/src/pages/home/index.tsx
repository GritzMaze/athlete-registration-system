import './index.css';
import { Event } from '../../components/event';
import { Alert, Button, Flex, Pagination, Space } from 'antd';
import { eventsService } from '../../services/events.service';
import { useAsyncAction } from '../../hooks/use-async-action';
import { useEffect, useState } from 'react';
import { Event as EventType } from '../../models/events';
import { EventDialog } from '../../components/event-dialog';
import Search from 'antd/es/input/Search';
import { useCurrentUser } from '../../components/context/current-user-context';
import { Role } from '../../models';

export function Home() {

  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [searchString, setSearchString] = useState('');
  const currentUser = useCurrentUser();

  const onSearch = (value: string) => {
    trigger(1, 20);
  }

  const { trigger, perform, data, error, loading } = useAsyncAction(async (page, pageSize) => {
    const where = searchString;
    const options: Record<string, string | number> = {
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: where
    }
    
    const data = await eventsService.getAll<EventType[]>(options);
    return data;
});

  useEffect(() => {
    perform(1, 20);
  }, []);

  if (error) {
    return <Alert message='Error' description={(error as any)?.message || error} type='error' />;
  }

  return (
    <>
    <EventDialog
      isModalOpen={eventDialogOpen}
      setModalOpen={setEventDialogOpen}
      reload={() => trigger(1, 20)}
    ></EventDialog>
      <h1 style={{ textAlign: 'center' }}>Events</h1>
    <Space direction='vertical' size='large' style={{ textAlign: 'center' }}>
      <Space direction='horizontal' size='large'>
      <Button type='primary' onClick={() => trigger(1, 20)}>Refresh</Button>
      { (currentUser.user?.role === Role.ADMIN || currentUser.user?.role === Role.MANAGER || currentUser.user?.role === Role.COACH) && <Button type='primary' onClick={() => setEventDialogOpen(true)}>Create an Event</Button> }
      </Space>
      <Search
      placeholder="Filter by name"
      allowClear
      enterButton="Search"
      size="large"
      style={{ width: 300 }}
      onChange={(e) => setSearchString(e.target.value)}
      onSearch={onSearch}
    />
      <Flex wrap='wrap' gap='small' justify='center' style={{ textAlign: 'left' }}>
        {data?.query.map((event, index) => {
          return <Event key={index} event={ event } loading={ loading } reload={ () => trigger(1, 20)} />;
        })}
      </Flex>
      <Pagination
        defaultCurrent={1}
        total={data?.count}
        defaultPageSize={20}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        onChange={(page, pageSize) => {trigger(page, pageSize)}}
        showSizeChanger
        style={{ textAlign: 'center' }}
      />
    </Space>
    </>
  );
}
