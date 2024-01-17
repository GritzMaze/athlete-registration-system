import { Modal } from 'antd';

interface ConfirmDialogProps {
    open: boolean;
    message: string;
    onOk: () => void;
    onCancel: () => void;
}


export function ConfirmDialog({ open, message, onOk: handleOk, onCancel: handleCancel }: ConfirmDialogProps) {
    return (
        <Modal
            title='Confirm'
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            okText='Confirm'
            cancelText='Cancel'
        >
            <p>{message}</p>
        </Modal>
    );
}