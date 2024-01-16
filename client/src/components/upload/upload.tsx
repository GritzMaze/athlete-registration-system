import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload, Typography, Space } from 'antd';
import { registrationStepContextService } from '../../services/registration-step-context.service';
import { useEffect } from 'react';

const { Dragger } = Upload;
const { Title } = Typography;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  accept: 'accept="image/*',
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

interface UploadComponentProps {
  onCompleted: () => void;
}

export function UploadComponent({ onCompleted }: UploadComponentProps) {

  // TODO: Add upload logic and remove this and add actual submitter
  console.log('UploadComponent oncompleted mouted');
  registrationStepContextService.setStepSubmitter(() => onCompleted());

  useEffect(() => {
    return () => {
      registrationStepContextService.disconnect();
    };
  }, []);

  return (
    <>
    <Space direction='vertical' size='large'>
        <Title level={5}>Upload scanned ID both sides and for athletes under the age of 18, upload an declaration, signed by parents</Title>
    <Dragger {...props}>
      <p className='ant-upload-drag-icon'>
        <InboxOutlined />
      </p>
      <p className='ant-upload-text'>
        Click or drag file to this area to upload
      </p>
      <p className='ant-upload-hint'>
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
    </Space>
    </>
  );
}
