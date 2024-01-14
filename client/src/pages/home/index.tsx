import './index.css';
import { Event } from '../../components/event';
import { Alert, Flex, Pagination, Space } from 'antd';
import { eventsService } from '../../services/events.service';
import { useAsyncAction } from '../../hooks/use-async-action';
import { useEffect } from 'react';
import { Event as EventType } from '../../models/events';

export function Home() {
  const { trigger, perform, data, error, loading } = useAsyncAction(async (page, pageSize) => {
    const options: Record<string, string | number> = {
      skip: (page - 1) * pageSize,
      take: pageSize,
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
    <Space direction='vertical' size='large'>
      <Flex wrap='wrap' gap='small' justify='center'>
        {data?.query.map((event, index) => {
          return <Event key={index} event={ event } loading={ loading } />;
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
  );
}
