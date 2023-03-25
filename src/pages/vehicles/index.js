import { DashboardLayout, EditModal, DeleteModal } from "@/components";
import {
  Table,
  Pagination,
  Input,
  Button,
  Select,
  Form,
  Upload,
  message,
} from "antd";
import {
  SearchOutlined,
  PlusCircleOutlined,
  CameraFilled,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
const api = process.env.API_VRENT;

const Vehicles = () => {
  const router = useRouter();
  const userData = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState({
    edit: {
      status: false,
      data: {},
    },
    delete: {
      status: false,
      data: {},
    },
  });

  //   console.log(showModal);

  const [vehicles, setVehicles] = useState({ data: [], total: 0 });
  const [vehicleType, setVehicleType] = useState([]);
  const [locations, setLocations] = useState([]);
  const [status, setStatus] = useState([]);

  //   console.log(vehicleType, locations);

  const [filter, setFilter] = useState({ search: "", type: "", status: "" });
  const [formData, setFormData] = useState({
    name: "",
    typeId: "",
    locationId: "",
    statusId: "",
    description: "",
    price: 0,
    stock: 0,
    capacity: 0,
    prePayment: 0,
    picture: "",
  });

  //   console.log(formData);

  const handleFormData = {
    name: (e) => setFormData({ ...formData, name: e.target.value }),
    type: (value) => setFormData({ ...formData, typeId: value }),
    location: (value) => setFormData({ ...formData, locationId: value }),
    status: (value) => setFormData({ ...formData, statusId: value }),
    description: (e) =>
      setFormData({ ...formData, description: e.target.value }),
    price: (e) => setFormData({ ...formData, price: e.target.value }),
    stock: (e) => setFormData({ ...formData, stock: e.target.value }),
    capacity: (e) => setFormData({ ...formData, capacity: e.target.value }),
    prePayment: (e) => setFormData({ ...formData, prePayment: e.target.value }),
  };

  const columns = [
    {
      title: "Vehicle",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      render: (_, record) => {
        return (
          <div>
            <Button
              className="bg-algae-green px-6"
              type="default"
              block
              onClick={() => {
                setFormData({
                  name: record.name,
                  typeId: record.typeId,
                  locationId: record.locationId,
                  statusId: record.statusId,
                  description: record.description,
                  price: record.price,
                  stock: record.stock,
                  capacity: record.capacity,
                  prePayment: record.prePayment,
                  picture: record.picture,
                });

                return setShowModal({
                  ...showModal,
                  edit: {
                    status: true,
                    data: record,
                  },
                });
              }}
            >
              <p className="text-white">Edit</p>
            </Button>
          </div>
        );
      },
    },
    {
      render: (_, record) => {
        return (
          <div>
            <Button
              className="px-4"
              type="primary"
              danger
              onClick={() => {
                return setShowModal({
                  ...showModal,
                  delete: {
                    status: true,
                    data: record,
                  },
                });
              }}
            >
              <p className="text-white">Delete</p>
            </Button>
          </div>
        );
      },
    },
  ];

  const props = {
    name: "image",
    action: `${api}/vehicles/image`,
    headers: {
      authorization: `Bearer ${userData.token}`,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        setFormData({
          ...formData,
          picture: info.file.response.data.secure_url,
        });
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleNavigate = (href) => router.push(href);

  const handlePagination = (page, pageSize) => fetchVehicles(page, pageSize);

  const handleFilter = {
    search: (e) => {
      setFilter({ ...filter, search: e.target.value });
    },
    type: (value) => {
      setFilter({ ...filter, type: value });
    },
    status: (value) => {
      setFilter({ ...filter, status: value });
    },
  };

  const handleEditVehicle = () => {
    setLoading(!loading);

    axios({
      method: "patch",
      url: `${api}/vehicles/?vehicleId=${showModal.edit.data?.id}`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
      data: {
        name: formData.name,
        typeId: formData.typeId,
        locationId: formData.locationId,
        statusId: formData.statusId,
        description: formData.description,
        capacity: parseInt(formData.capacity),
        price: parseInt(formData.price),
        stock: parseInt(formData.stock),
        prePayment: parseInt(formData.prePayment),
        picture: formData.picture,
      },
    })
      .then((_) => {
        setLoading(false);
        fetchVehicles(1, 5);
        setShowModal({ ...showModal, edit: { status: false, data: {} } });
        return message.success(`Edit vehicle success`);
      })
      .catch((err) => {
        console.log(err);
        return message.error(`Edit vehicle error`);
      });
  };

  const handleDeleteVehicle = () => {
    setLoading(!loading);

    axios({
      method: "delete",
      url: `${api}/vehicles/?vehicleId=${showModal.delete.data.id}`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then((_) => {
        setLoading(false);
        fetchVehicles(1, 5);
        setShowModal({ ...showModal, delete: { status: false, data: {} } });
        return message.success(`Delete vehicle success`);
      })
      .catch((err) => console.log(err));
  };

  const fetchVehicles = (page, row) => {
    setLoading(!loading);

    axios({
      method: "get",
      url:
        filter.search === ""
          ? `${api}/vehicles/?page=${page}&row=${row}`
          : `${api}/vehicles/?search=${filter.search}&page=${page}&row=${row}`,
    })
      .then((result) => {
        setLoading(false);
        const keyData = result.data.data.results.map((items) => {
          return {
            key: items.id,
            ...items,
          };
        });

        return setVehicles({
          data: keyData,
          total: result.data.data.total,
        });
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
        return setVehicleType(result.data.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchLocations = () => {
    setLoading(!loading);

    axios({
      method: "get",
      url: `${api}/locations`,
    })
      .then((result) => {
        setLoading(false);
        return setLocations(result.data.data);
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
        return setStatus(result.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchVehicles(1, 5);
    fetchTypes();
    fetchLocations();
    fetchStatus();
  }, []);

  return (
    <DashboardLayout>
      <main className="">
        <div className="mb-4 flex md:flex-row flex-col md:justify-between">
          <div className="flex md:mb-0 mb-2">
            <Input
              className="mr-2"
              placeholder="Search"
              style={{
                width: 100,
              }}
              prefix={<SearchOutlined />}
              onChange={handleFilter.search}
              onPressEnter={() => fetchVehicles(1, 5)}
            />
            <Select
              className="mr-2"
              defaultValue="Type"
              style={{
                width: 100,
              }}
              options={[
                {
                  value: "car",
                  label: "Car",
                },
                {
                  value: "moto bike",
                  label: "Moto bike",
                },
                {
                  value: "bike",
                  label: "Bike",
                },
              ]}
              onChange={handleFilter.type}
            />
            <Select
              defaultValue="Status"
              style={{
                width: 100,
              }}
              options={[
                {
                  value: "availale",
                  label: "Availale",
                },
                {
                  value: "non availale",
                  label: "Non availale",
                },
              ]}
              onChange={handleFilter.status}
            />
          </div>

          <Button
            type="primary"
            className="flex items-center justify-center bg-picton-blue w-fit px-2 rounded-full"
            onClick={() => handleNavigate("/vehicles/create")}
          >
            <PlusCircleOutlined className="mr-2 mb-1 text-lg text-white" />
            <p className="text-white text-lg">Create vehicle</p>
          </Button>
        </div>

        <section className="flex flex-col">
          <Table
            className="overflow-auto"
            columns={columns}
            dataSource={vehicles.data}
            pagination={false}
          />
          <div className="w-full my-4 flex justify-center">
            <Pagination
              defaultCurrent={1}
              pageSize={5}
              total={vehicles.total}
              onChange={handlePagination}
            />
          </div>
        </section>

        <section>
          <EditModal
            title={`Edit ${showModal.edit.data.name}`}
            modalOpen={showModal.edit.status}
            onCancel={() =>
              setShowModal({ ...showModal, edit: { status: false, data: {} } })
            }
          >
            <div className="py-4 px-4">
              <div className="mb-6">
                <div
                  className="rounded bg-center bg-mercury bg-cover max-w-sm mx-auto"
                  style={{
                    backgroundImage:
                      formData.picture !== "" ? `url(${formData.picture})` : "",
                  }}
                >
                  <Upload
                    className="py-16 rounded flex flex-col items-center justify-center"
                    {...props}
                    showUploadList={false}
                  >
                    <button className="flex flex-col items-center">
                      <CameraFilled
                        className={
                          formData.picture !== "" ? "text-white" : "text-black"
                        }
                        style={{ fontSize: "40px" }}
                      />
                      <p
                        className={
                          formData.picture !== "" ? "text-white" : "text-black"
                        }
                      >
                        Click to add image
                      </p>
                    </button>
                  </Upload>
                </div>
              </div>

              <Form
                layout="vertical"
                onFinish={handleEditVehicle}
                autoComplete="off"
              >
                <Form.Item label={"Name :"}>
                  <Input
                    value={formData.name}
                    type="text"
                    onChange={handleFormData.name}
                  />
                </Form.Item>

                <Form.Item>
                  <div className="flex gap-6">
                    <Form.Item label="Type :" className="w-full">
                      <Select
                        value={formData.typeId}
                        options={vehicleType.map((item) => {
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
                        value={formData.locationId}
                        options={locations.map((item) => {
                          return {
                            value: item.id,
                            label: item.name,
                          };
                        })}
                        onChange={handleFormData.location}
                      />
                    </Form.Item>

                    <Form.Item label="status :" className="w-full">
                      <Select
                        value={formData.statusId}
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
                </Form.Item>

                <Form.Item label="Description :">
                  <Input.TextArea
                    value={formData.description}
                    onChange={handleFormData.description}
                  />
                </Form.Item>

                <Form.Item>
                  <div className="flex gap-6">
                    <Form.Item label="Price :" className="w-full">
                      <Input
                        type="number"
                        onChange={handleFormData.price}
                        value={formData.price}
                      />
                    </Form.Item>

                    <Form.Item label="Stock :" className="w-full">
                      <Input
                        type="number"
                        onChange={handleFormData.stock}
                        value={formData.stock}
                      />
                    </Form.Item>
                  </div>
                </Form.Item>

                <Form.Item>
                  <div className="flex gap-6">
                    <Form.Item label="Capacity :" className="w-full">
                      <Input
                        type="number"
                        onChange={handleFormData.capacity}
                        value={formData.capacity}
                      />
                    </Form.Item>

                    <Form.Item label="Pre Payment :" className="w-full">
                      <Input
                        type="number"
                        onChange={handleFormData.prePayment}
                        value={formData.prePayment}
                      />
                    </Form.Item>
                  </div>
                </Form.Item>

                <Form.Item>
                  <div className="flex justify-end">
                    <Button
                      type="primary"
                      className="bg-picton-blue px-10"
                      htmlType="submit"
                    >
                      Confirm
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </EditModal>

          <DeleteModal
            modalOpen={showModal.delete.status}
            onCancel={() =>
              setShowModal({
                ...showModal,
                delete: { status: false, data: {} },
              })
            }
            title={`Are you sure to delete ${showModal.delete.data?.name}?`}
          >
            <div className="my-8 flex">
              <h1 className="text-xl">
                Please confirm to delete {showModal.delete.data?.name}
              </h1>
            </div>

            <di className="flex gap-4 justify-end">
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
                onClick={handleDeleteVehicle}
              >
                Confirm
              </Button>
            </di>
          </DeleteModal>
        </section>
      </main>
    </DashboardLayout>
  );
};

export default Vehicles;
