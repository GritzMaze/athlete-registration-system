import { CalendarOutlined, DollarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Space } from 'antd';

interface DescriptionProps {
    location: string;
    date: string;
    price: number;
}


export function Description({location, date, price}: DescriptionProps) {
    const transformDate = (date: string) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString();
    }
  return (
    <Space direction='vertical'>
      <div><EnvironmentOutlined /> { location }</div>
      <div><CalendarOutlined /> { transformDate(date) } </div>
      <div><DollarOutlined /> { price } BGN</div>
    </Space>
  )
}