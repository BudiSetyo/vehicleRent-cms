import { Modal, Button } from "antd";

const EditModal = ({ modalOpen, onOk, onCancel, title, children }) => {
  return (
    <div>
      <Modal
        width={850}
        title={title}
        open={modalOpen}
        onOk={onOk}
        onCancel={onCancel}
        footer={[]}
      >
        {children}
      </Modal>
    </div>
  );
};

export default EditModal;
