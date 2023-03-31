import { DashboardLayout, Spiner } from "@/components";
import { CaretLeftOutlined, CameraFilled } from "@ant-design/icons";
import {
  Button,
  message,
  Upload,
  Form,
  Input,
  Select,
  InputNumber,
} from "antd";
const { TextArea } = Input;
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
const api = process.env.API_VRENT;

const CreateVehicle = () => {
  const router = useRouter();
  const userData = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState([]);
  const [status, setStatus] = useState([]);
  const [types, setTypes] = useState([]);
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    locationId: "",
    description: "",
    price: 0,
    statusId: "",
    stock: 0,
    capacity: 0,
    typeId: "",
    prePayment: 0,
  });

  //   console.log(formData);

  const handleFormData = {
    name: (e) => setFormData({ ...formData, name: e.target.value }),
    location: (value) => setFormData({ ...formData, locationId: value }),
    description: (e) =>
      setFormData({ ...formData, description: e.target.value }),
    price: (value) => setFormData({ ...formData, price: value }),
    status: (value) => setFormData({ ...formData, statusId: value }),
    stock: (value) => setFormData({ ...formData, stock: value }),
    capacity: (value) => setFormData({ ...formData, capacity: value }),
    type: (value) => setFormData({ ...formData, typeId: value }),
    prePayment: (value) => setFormData({ ...formData, prePayment: value }),
  };

  const handleNavigate = (href) => router.push(href);

  const handleSubmitForm = () => {
    setLoading(!loading);
    const {
      image,
      name,
      locationId,
      description,
      price,
      statusId,
      stock,
      typeId,
      capacity,
    } = formData;

    if (
      image === "" ||
      name === "" ||
      locationId === "" ||
      description === "" ||
      price === 0 ||
      statusId === "" ||
      stock === 0 ||
      typeId === "" ||
      capacity === 0
    ) {
      setLoading(false);
      return message.error("Fields can't be empty");
    }

    axios({
      method: "post",
      url: `${api}/vehicles`,
      data: {
        name: formData.name,
        typeId: formData.typeId,
        locationId: formData.locationId,
        capacity: parseInt(formData.capacity),
        isPopular: false,
        description: formData.description,
        price: parseInt(formData.price),
        prePayment: parseInt(formData.prePayment),
        statusId: formData.statusId,
        picture: formData.image,
        stock: parseInt(formData.stock),
      },
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then((_) => {
        setLoading(false);
        message.success("Create vehicle success");
        return handleNavigate("/vehicles");
      })
      .catch((err) => console.log(err));
  };

  const props = {
    name: "image",
    action: `${api}/vehicles/image`,
    headers: {
      authorization: `Bearer ${userData.token}`,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        setFormData({ ...formData, image: info.file.response.data.secure_url });
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const fetchLocations = () => {
    setLoading(!loading);

    axios({
      method: "get",
      url: `${api}/locations`,
    })
      .then((result) => {
        setLoading(false);
        const keyData = result.data.data.map((item) => {
          return {
            ...item,
            key: item.id,
          };
        });
        return setLocation(keyData);
      })
      .catch((err) => console.log(err));
  };

  const fetchStatus = () => {
    setLoading(!loading);

    axios({
      method: "get",
      url: `${api}/vehicleStatus`,
    })
      .then((result) => {
        setLoading(false);
        const keyData = result.data.data.map((item) => {
          return {
            ...item,
            key: item.id,
          };
        });
        return setStatus(keyData);
      })
      .catch((err) => console.log(err));
  };

  const fetchTypes = () => {
    setLoading(!loading);
    axios({
      method: "get",
      url: `${api}/vehicleType`,
    })
      .then((result) => {
        setLoading(false);
        const keyData = result.data.data.map((item) => {
          return {
            ...item,
            key: item.id,
          };
        });
        return setTypes(keyData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchLocations();
    fetchStatus();
    fetchTypes();
  }, []);

  return (
    <DashboardLayout>
      <main>
        {loading ? <Spiner /> : <></>}

        <div className="flex gap-8 items-center">
          <button className="flex items-center" onClick={() => router.back()}>
            <CaretLeftOutlined className="text-2xl" />
          </button>
          <h1 className="text-xl font-medium">Add New Vehicle</h1>
        </div>

        <section className="mt-10">
          <div className="flex flex-col">
            <div className="w-full p-2 flex justify-center">
              <div className="w-full flex justify-center items-center">
                <div
                  className="rounded bg-center bg-mercury bg-cover"
                  style={{
                    backgroundImage:
                      formData.image !== "" ? `url(${formData.image})` : "",
                  }}
                >
                  <Upload
                    className="px-20 py-16 rounded flex flex-col items-center justify-center"
                    {...props}
                    showUploadList={false}
                  >
                    <button className="flex flex-col items-center">
                      <CameraFilled
                        className={`${
                          formData.image !== "" ? "text-white" : "text-black"
                        }`}
                        style={{ fontSize: "40px" }}
                      />
                      <p
                        className={`${
                          formData.image !== "" ? "text-white" : "text-black"
                        }`}
                      >
                        Click to add image
                      </p>
                    </button>
                  </Upload>
                </div>
              </div>
            </div>

            <div className="w-full p-4">
              <Form onFinish={handleSubmitForm} layout="vertical">
                <Form.Item label="Name :">
                  <Input
                    placeholder="Name (max up to 50 words)"
                    onChange={handleFormData.name}
                  />
                </Form.Item>

                <div className="flex gap-6">
                  <Form.Item label="Type :" className="w-full">
                    <Select
                      placeholder="Select vehicle type"
                      options={types.map((item) => {
                        return {
                          value: item.id,
                          label: item.name,
                        };
                      })}
                      onChange={handleFormData.type}
                    />
                  </Form.Item>

                  <Form.Item label="Location :" className="w-full">
                    <Select
                      placeholder="Select location"
                      options={location.map((item) => {
                        return {
                          value: item.id,
                          label: item.name,
                        };
                      })}
                      onChange={handleFormData.location}
                    />
                  </Form.Item>

                  <Form.Item label="Status :" className="w-full">
                    <Select
                      placeholder="Select status"
                      options={status.map((item) => {
                        return {
                          value: item.id,
                          label: item.name,
                        };
                      })}
                      onChange={handleFormData.status}
                    />
                  </Form.Item>
                </div>

                <Form.Item label="Description :">
                  <TextArea
                    placeholder="Description (max up to 150 words)"
                    onChange={handleFormData.description}
                  />
                </Form.Item>

                <div className="flex gap-6">
                  <Form.Item label="Price :" className="w-full">
                    <InputNumber
                      type="number"
                      className="w-full"
                      min={1}
                      placeholder="Type the price"
                      onChange={handleFormData.price}
                    />
                  </Form.Item>

                  <Form.Item label="Stock :" className="w-full">
                    <InputNumber
                      type="number"
                      className="w-full"
                      min={1}
                      placeholder="Type the stock"
                      onChange={handleFormData.stock}
                    />
                  </Form.Item>
                </div>

                <div className="flex gap-6">
                  <Form.Item label="Capacity" className="w-full">
                    <InputNumber
                      type="number"
                      className="w-full"
                      min={1}
                      placeholder="Type the capacity"
                      onChange={handleFormData.capacity}
                    />
                  </Form.Item>

                  <Form.Item label="Pre payment :" className="w-full">
                    <Input
                      type="number"
                      className="w-full"
                      min={0}
                      placeholder="Type the pre payment"
                      onChange={handleFormData.prePayment}
                    />
                  </Form.Item>
                </div>

                <div className="flex justify-end">
                  <Button
                    className="bg-picton-blue w-1/3"
                    type="primary"
                    htmlType="submit"
                  >
                    <p className="font-semibold">Submit</p>
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
};

export default CreateVehicle;
