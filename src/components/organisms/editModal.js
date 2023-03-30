import { Modal } from "antd";

const EditModal = ({ modalOpen, onOk, onCancel, title, children, width }) => {
  return (
    <div>
      <Modal
        width={width || 850}
        title={<h1 className="text-lg">{title}</h1>}
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
