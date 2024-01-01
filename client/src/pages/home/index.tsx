import './index.css';
import { CardComponent } from '../../components/card';
import { Flex } from 'antd';

export function Home() {
  const cardProp = {
    name: 'John Doe',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  };
  return (
    <Flex wrap="wrap" gap="small" justify='center'>
      {Array.from({ length: 20 }).map((card, index) => {
        return <CardComponent key={index} card={cardProp} />;
      })}
    </Flex>
  );
}
