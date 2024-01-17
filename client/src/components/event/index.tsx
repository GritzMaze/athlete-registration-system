import {
  SelectOutlined,
  ShareAltOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Card, Skeleton } from 'antd';
import { Event as EventType } from '../../models/events';
import { Description } from './description';
import { useCurrentUser } from '../context/current-user-context';
import { Role, User } from '../../models';
import { AdminActions } from './admin-actions';
import { useNavigate } from 'react-router-dom';
import './index.css';

const { Meta } = Card;

interface EventProps {
  event: EventType;
  loading: boolean;
  reload: () => void;
}

export function Event({ event, loading, reload }: EventProps) {

  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const actions = [
    <SelectOutlined key='enter' />,
    <ShareAltOutlined key='share' />,
    <UserAddOutlined key='register' onClick={() => navigate(`/profile/registration?eventId=${event.id}`)} />
  ]

  if ((currentUser.user as User).id === event.managerId || currentUser.user?.role === Role.ADMIN ) {
    actions.push(<AdminActions event={event} reload={reload} />)
  }


  return (
    <>
      <Card
        style={{ width: 300, marginTop: 16 }}
        cover={
          <img
            alt={event.name}
            src={event.image}
          />
        }
        onTabChange={(key) => console.log(key)}
        actions={ actions }
        loading={loading}
      >
        <Skeleton loading={loading} active>
          <Meta
            title={event.name}
            description={<Description location={event.location} date={event.date} price={event.participationFee} />}
          />
        </Skeleton>
      </Card>
    </>
  );
}
