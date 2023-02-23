import { Button } from "antd";

const Buttons = ({ className, text, type, onClick }) => {
  return (
    <>
      <Button
        className={className || "bg-san-juan"}
        type={type || "primary"}
        onClick={onClick}
      >
        {text || "Button"}
      </Button>
    </>
  );
};

export default Buttons;
