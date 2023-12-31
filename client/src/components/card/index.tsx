import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Skeleton } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useState, useEffect } from 'react';

interface Card {
  name: string;
  subtitle: string;
}

interface CardComponentProps {
  card: Card;
}

export function CardComponent({ card }: CardComponentProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const getRandomSeed = () => {
    return Math.floor(Math.random() * 1000);
  };
  return (
    <>
      <Card
        style={{ width: 300, marginTop: 16 }}
        actions={[
          <SettingOutlined key='setting' />,
          <EditOutlined key='edit' />,
          <EllipsisOutlined key='ellipsis' />,
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={
              <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${getRandomSeed()}`}
              />
            }
            title={card.name}
            description={card.subtitle}
          />
        </Skeleton>
      </Card>
    </>
  );
}
