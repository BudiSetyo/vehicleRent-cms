import { DashboardLayout, EditModal, DeleteModal, Spiner } from "@/components";
import { Table, Pagination, Input, Button, Form, Select, message } from "antd";
import {
  SearchOutlined,
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
const api = process.env.API_URL;
const apiVrent = process.env.API_VRENT;

const Admin = () => {
  const router = useRouter();
  const userData = useSelector((state) => state.user);
  //   console.log(userData);

  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState({ data: [], total: 0 });
  const [location, setLocation] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    locationId: "",
    gender: "",
    address: "",
    phoneNumber: "",
  });
  const [editPassword, setEditPassword] = useState({
    password: "",
    checkPassword: "",
  });

  const [showModal, setShowModal] = useState({
    edit: {
      status: false,
      data: {},
    },
    delete: {
      status: false,
      data: {},
    },
    password: {
      status: false,
      data: {},
    },
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      render: (_, record) => {
        return (
          <button
            onClick={() => {
              setShowModal({
                ...showModal,
                edit: {
                  status: true,
                  data: record,
                },
              });

              setFormData({
                ...formData,
                name: record.name,
                email: record.email,
                locationId: record.locationId,
                gender: record.gender,
                address: record.address,
                phoneNumber: record.phoneNumber,
              });
            }}
          >
            <EditOutlined className="text-2xl" />
          </button>
        );
      },
    },
    {
      render: (_, record) => {
        return (
          <button
            onClick={() => {
              setShowModal({
                ...showModal,
                password: {
                  status: true,
                  data: record,
                },
              });
            }}
          >
            <UnlockOutlined className="text-2xl" />
          </button>
        );
      },
    },
    {
      render: (_, record) => {
        return (
          <button
            onClick={() => {
              setShowModal({
                ...showModal,
                delete: {
                  status: true,
                  data: record,
                },
              });
            }}
          >
            <DeleteOutlined className="text-2xl" />
          </button>
        );
      },
    },
  ];

  const handleChangeForm = (e) => {
    const { name, value } = e.target;

    return setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeFormPassword = (e) => {
    const { name, value } = e.target;

    return setEditPassword({
      ...editPassword,
      [name]: value,
    });
  };

  const handleChangeSelect = {
    location: (value) => setFormData({ ...formData, locationId: value }),
    gender: (value) => setFormData({ ...formData, gender: value }),
  };

  const handleNavigate = (href) => router.push(href);

  const handlePagination = (page, pageSize) => {
    return fetchAdmins(page, pageSize);
  };

  const handleSearch = (e) => setSearch(e.target.value);

  const handleSubmitForm = () => {
    setLoading(!loading);

    axios({
      method: "patch",
      url: `${api}/admin/?id=${showModal.edit.data.id}`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
      data: formData,
    })
      .then((_) => {
        setLoading(false);
        fetchAdmins(1, 5);
        setShowModal({
          ...showModal,
          edit: {
            status: false,
            data: {},
          },
        });
        return message.success("Edit admin success");
      })
      .catch((err) => console.log(err));
  };

  const handleSubmitFormPassword = () => {
    setLoading(!loading);

    if (editPassword.password === "" || editPassword.checkPassword === "") {
      return message.error("Fields can't be empty!");
    }

    if (editPassword.password !== editPassword.checkPassword) {
      return message.error("Passwords must be the same!");
    }

    axios({
      method: "patch",
      url: `${api}/admin/?id=${showModal.password.data.id}`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
      data: {
        password: editPassword.password,
      },
    })
      .then((_) => {
        setLoading(false);
        fetchAdmins(1, 5);
        setShowModal({
          ...showModal,
          password: {
            status: false,
            data: {},
          },
        });
        setEditPassword({
          password: "",
          checkPassword: "",
        });
        return message.success("Change password admin success");
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteAdmin = () => {
    setLoading(!loading);

    axios({
      method: "delete",
      url: `${api}/admin/${showModal.delete.data.id}`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then((_) => {
        setLoading(false);
        return message.success("Delete admin success");
      })
      .catch((err) => console.log(err));
  };

  const fetchAdmins = (page, row) => {
    setLoading(!loading);

    axios({
      method: "get",
      url:
        search !== ""
          ? `${api}/admin/?search=${search}&page=${page}&row=${row}`
          : `${api}/admin/?page=${page}&row=${row}`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then((result) => {
        setLoading(false);
        const keyData = result.data.data.results.map((item) => {
          return {
            ...item,
            key: item.id,
          };
        });

        setAdmins({
          data: keyData,
          total: result.data.data.total,
        });
      })
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
    fetchAdmins(1, 5);
    fetchLocations();
  }, []);

  return (
    <DashboardLayout>
      <main className="">
        {loading ? <Spiner /> : <></>}

        <div className="mb-4 flex justify-between">
          <div className="flex md:mb-0 mb-2">
            <Input
              className="mr-2"
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={handleSearch}
              onPressEnter={() => fetchAdmins(1, 5)}
            />
          </div>

          <Button
            type="primary"
            className="flex items-center justify-center bg-picton-blue w-fit px-2 rounded-full"
            onClick={() => handleNavigate("/admin/create")}
          >
            <PlusCircleOutlined className="mr-2 mb-1 text-lg text-white" />
            <p className="text-white text-lg">Create admin</p>
          </Button>
        </div>
        <section className="flex flex-col">
          <Table
            className="overflow-auto"
            columns={columns}
            dataSource={admins.data}
            pagination={false}
          />
          <div className="w-full my-4 flex justify-center">
            <Pagination
              defaultCurrent={1}
              total={admins.total}
              pageSize={5}
              onChange={handlePagination}
            />
          </div>
        </section>

        <section>
          <EditModal
            title={`Edit admin ${showModal.edit.data.name}`}
            modalOpen={showModal.edit.status}
            width={640}
            onCancel={() =>
              setShowModal({ ...showModal, edit: { status: false, data: {} } })
            }
          >
            <Form
              className="mt-6"
              layout="vertical"
              onFinish={handleSubmitForm}
            >
              <Form.Item label="Name :">
                <Input
                  value={formData.name}
                  onChange={handleChangeForm}
                  name="name"
                />
              </Form.Item>

              <Form.Item label="Email :">
                <Input
                  value={formData.email}
                  type="email"
                  onChange={handleChangeForm}
                  name="email"
                />
              </Form.Item>

              <div className="flex gap-4">
                <Form.Item className="w-full" label="Location :">
                  <Select
                    value={formData.locationId}
                    options={location.map((item) => {
                      return {
                        value: item.id,
                        label: item.name,
                      };
                    })}
                    onChange={handleChangeSelect.location}
                  />
                </Form.Item>

                <Form.Item className="w-full" label="Gender :">
                  <Select
                    value={formData.gender}
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
                    onChange={handleChangeSelect.gender}
                  />
                </Form.Item>
              </div>

              <Form.Item className="w-full" label="Address :">
                <Input.TextArea
                  value={formData.address}
                  onChange={handleChangeForm}
                  name="address"
                />
              </Form.Item>

              <Form.Item className="w-full" label="Phone Number :">
                <Input
                  value={formData.phoneNumber}
                  type="number"
                  onChange={handleChangeForm}
                  name="phoneNumber"
                />
              </Form.Item>

              <div className="flex justify-end gap-6">
                <Button
                  type="primary"
                  danger
                  onClick={() =>
                    setShowModal({
                      ...showModal,
                      edit: {
                        status: false,
                        data: {},
                      },
                    })
                  }
                >
                  Cancel
                </Button>

                <Button
                  className="bg-picton-blue"
                  type="primary"
                  htmlType="submit"
                >
                  Confirm
                </Button>
              </div>
            </Form>
          </EditModal>

          <DeleteModal
            title={`Are you sure to delete admin ${showModal.delete.data.name}`}
            modalOpen={showModal.delete.status}
            onCancel={() =>
              setShowModal({
                ...showModal,
                delete: { status: false, data: {} },
              })
            }
          >
            <div className="mt-6">
              <h1 className="text-lg">Click confirm button to delete admin!</h1>

              <div className="flex justify-end mt-10 gap-6">
                <Button
                  type="primary"
                  danger
                  onClick={() =>
                    setShowModal({
                      ...showModal,
                      delete: { status: false, data: {} },
                    })
                  }
                >
                  Cancel
                </Button>

                <Button
                  className="bg-picton-blue"
                  type="primary"
                  onClick={handleDeleteAdmin}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </DeleteModal>

          <DeleteModal
            title={`Change password admin ${showModal.password.data.name}`}
            modalOpen={showModal.password.status}
            onCancel={() => {
              setShowModal({
                ...showModal,
                password: { status: false, data: {} },
              });

              setEditPassword({
                password: "",
                checkPassword: "",
              });
            }}
          >
            <Form
              className="mt-6"
              layout="vertical"
              onFinish={handleSubmitFormPassword}
            >
              <Form.Item>
                <Input
                  type="password"
                  value={editPassword.password}
                  placeholder="Type your new password"
                  name="password"
                  onChange={handleChangeFormPassword}
                />
              </Form.Item>

              <Form.Item>
                <Input
                  type="password"
                  value={editPassword.checkPassword}
                  placeholder="Re type your new password"
                  name="checkPassword"
                  onChange={handleChangeFormPassword}
                />
              </Form.Item>

              <div className="flex gap-6 justify-end">
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    setShowModal({
                      ...showModal,
                      password: { status: false, data: {} },
                    });

                    setEditPassword({
                      password: "",
                      checkPassword: "",
                    });
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="primary"
                  className="bg-picton-blue"
                  htmlType="submit"
                >
                  Confirm
                </Button>
              </div>
            </Form>
          </DeleteModal>
        </section>
      </main>
    </DashboardLayout>
  );
};

export default Admin;
