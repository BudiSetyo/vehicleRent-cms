import { Spin } from "antd";

const Spiner = () => {
  return (
    <div
      className="fixed inset-0 bg-transparant flex justify-center items-center"
      style={{ zIndex: "99999" }}
    >
      <Spin size="large" />
    </div>
  );
};

export default Spiner;
