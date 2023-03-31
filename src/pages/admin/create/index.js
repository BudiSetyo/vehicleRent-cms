import { DashboardLayout, Spiner } from "@/components";
import { CaretLeftOutlined, CameraFilled } from "@ant-design/icons";
import { Button, message, Upload, Form, Input, Select } from "antd";
const { TextArea } = Input;
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
const api = process.env.API_URL;
const apiVrent = process.env.API_VRENT;

const CreateAdmin = () => {
  const router = useRouter();
  const userData = useSelector((state) => state.user);

  const [loading, setLoading] = useState();
  const [location, setLocation] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    address: "",
    phoneNumber: "",
    locationId: "",
  });

  const handleFormData = {
    name: (e) => setFormData({ ...formData, name: e.target.value }),
    email: (e) => setFormData({ ...formData, email: e.target.value }),
    password: (e) => setFormData({ ...formData, password: e.target.value }),
    gender: (value) => setFormData({ ...formData, gender: value }),
    address: (e) => setFormData({ ...formData, address: e.target.value }),
    phoneNumber: (e) =>
      setFormData({ ...formData, phoneNumber: e.target.value }),
    location: (value) => setFormData({ ...formData, locationId: value }),
  };

  const handleSubmitForm = () => {
    setLoading(!loading);
    const { name, email, password, gender, address, phoneNumber, locationId } =
      formData;

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      gender === "" ||
      address === "" ||
      phoneNumber === "" ||
      locationId === ""
    ) {
      return console.log("Field cant be empty");
    }

    axios({
      method: "post",
      url: `${api}/admin/register`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
      data: formData,
    })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  const fetchLocations = () => {
    setLoading(!loading);

    axios({
      method: "get",
      url: `${apiVrent}/locations`,
    })
      .then((result) => {
        setLoading(false);
        return setLocation(result.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <DashboardLayout>
      <main>
        {loading ? <Spiner /> : <></>}

        <div className="flex gap-8">
          <button className="flex items-center" onClick={() => router.back()}>
            <CaretLeftOutlined className="text-2xl" />
          </button>
          <h1 className="text-xl font-medium">Create Admin</h1>
        </div>

        <section className="mt-10 md:mx-20 mx-6">
          <Form onFinish={handleSubmitForm}>
            <Form.Item>
              <Input placeholder="Name" onChange={handleFormData.name} />
            </Form.Item>

            <Form.Item>
              <Input
                type="email"
                placeholder="Email"
                onChange={handleFormData.email}
              />
            </Form.Item>

            <Form.Item>
              <Input
                type="password"
                placeholder="Password"
                onChange={handleFormData.password}
              />
            </Form.Item>

            <Form.Item>
              <Select
                placeholder="Select the location"
                options={location.map((item) => {
                  return {
                    value: item.id,
                    label: item.name,
                  };
                })}
                onChange={handleFormData.location}
              />
            </Form.Item>

            <Form.Item>
              <Select
                placeholder="Select the gender"
                options={[
                  {
                    value: "male",
                    label: "Male",
                  },
                  {
                    value: "female",
                    label: "Female",
                  },
                ]}
                onChange={handleFormData.gender}
              />
            </Form.Item>

            <Form.Item>
              <TextArea
                placeholder="Type the address"
                onChange={handleFormData.address}
              />
            </Form.Item>

            <Form.Item>
              <Input
                type="number"
                placeholder="Phone Number"
                onChange={handleFormData.phoneNumber}
              />
            </Form.Item>

            <div className="flex justify-end">
              <Button
                className="bg-picton-blue w-1/3"
                type="primary"
                htmlType="submit"
              >
                <p>Submit</p>
              </Button>
            </div>
          </Form>
        </section>
      </main>
    </DashboardLayout>
  );
};

module.exports = CreateAdmin;
