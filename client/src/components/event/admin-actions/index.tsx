import {
    DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Dropdown, MenuProps, message } from 'antd';
import { ConfirmDialog } from '../../confirm-dialog';
import { useState } from 'react';
import { Event } from '../../../models';
import { eventsService } from '../../../services/events.service';
import { EventDialog } from '../../event-dialog';
import { EventRegistrations } from '../../event-registrations';

interface AdminActionsProps {
  event: Event;
  reload: () => void;
}
export function AdminActions({ event, reload }: AdminActionsProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [EventRegistrationsDialogOpen, setEventRegistrationsDialogOpen] = useState(false);

  const handleDelete = async () => {
    await eventsService.delete(event.id);
    message.success('Event deleted successfully!');
    setDeleteDialogOpen(false);
    reload();
  }

  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: '1',
      icon: <EditOutlined />,
      onClick: () => setEventDialogOpen(true)
    },
    {
      label: 'See Participants',
      key: '3',
      icon: <ProfileOutlined />,
      onClick: () => setEventRegistrationsDialogOpen(true)

    },
    {
      label: 'Delete',
      key: '2',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => setDeleteDialogOpen(true) 
    }
  ];
  return (
    <>
    <EventRegistrations
      id={event.id}
      open={EventRegistrationsDialogOpen}
      setOpen={setEventRegistrationsDialogOpen}
    ></EventRegistrations>
    <EventDialog
      isModalOpen={eventDialogOpen}
      setModalOpen={setEventDialogOpen}
      reload={reload}
      event={event}
    ></EventDialog>
    <ConfirmDialog
      open={deleteDialogOpen}
      message='Are you sure you want to delete this event?'
      onOk={handleDelete}
      onCancel={() => setDeleteDialogOpen(false)}
    ></ConfirmDialog>
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <EllipsisOutlined key='ellipsis' />
      </a>
    </Dropdown>
    </>
  );
}
