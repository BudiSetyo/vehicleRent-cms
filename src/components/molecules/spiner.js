import { Spin } from "antd";

const Spiner = () => {
  return (
    <div className="fixed inset-0 bg-transparant z-50 flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
};

export default Spiner;
