import { CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Space } from 'antd';

interface DescriptionProps {
    location: string;
    date: string;
}


export function Description({location, date}: DescriptionProps) {
    const transformDate = (date: string) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString();
    }
  return (
    <Space direction='vertical'>
      <div><EnvironmentOutlined /> { location }</div>
      <div><CalendarOutlined /> { transformDate(date) } </div>
    </Space>
  )
}