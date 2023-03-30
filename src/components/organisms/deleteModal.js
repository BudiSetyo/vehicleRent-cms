import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const DeleteModal = ({ title, modalOpen, onOk, onCancel, children }) => {
  return (
    <>
      <Modal
        title={
          <div className="flex items-center gap-4">
            <ExclamationCircleOutlined className="text-casablanca-orange text-2xl" />
            <h1 className="text-lg">{title}</h1>
          </div>
        }
        open={modalOpen}
        onOk={onOk}
        onCancel={onCancel}
        footer={[]}
      >
        {children}
      </Modal>
    </>
  );
};
export default DeleteModal;
