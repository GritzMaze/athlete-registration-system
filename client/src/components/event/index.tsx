import {
  EditOutlined,
  EllipsisOutlined,
  SelectOutlined,
  ShareAltOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Card, Skeleton } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Event as EventType } from '../../models/events';
import { Description } from './description';
import { useCurrentUser } from '../context/current-user-context';
import { User } from '../../models';
import { AdminActions } from './admin-actions';

interface EventProps {
  event: EventType;
  loading: boolean;
}

export function Event({ event, loading }: EventProps) {

  const currentUser = useCurrentUser();

  const actions = [
    <SelectOutlined key='enter' />,
    <ShareAltOutlined key='share' />,
    <UserAddOutlined key='register' />
  ]

  if ((currentUser.user as User).id === event.managerId ) {
    actions.push(<AdminActions />)
  }


  return (
    <>
      <Card
        style={{ width: 300, marginTop: 16 }}
        cover={
          <img
            alt='example'
            src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
          />
        }
        actions={ actions }
      >
        <Skeleton loading={loading} active>
          <Meta
            title={event.name}
            description={<Description location={event.location} date={event.date} />}
          />
        </Skeleton>
      </Card>
    </>
  );
}
