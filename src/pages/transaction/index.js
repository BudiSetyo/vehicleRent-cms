import { DashboardLayout, DeleteModal, EditModal, Spiner } from "@/components";
import { Table, Pagination, Input, DatePicker, Button, message } from "antd";
import { SearchOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
const api = process.env.API_URL;
const apiVrent = process.env.API_VRENT;

const Transaction = () => {
  const userData = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const [transaction, setTransaction] = useState({ data: [], total: 0 });
  const [filter, setFilter] = useState({
    search: "",
    startDate: "",
    endDate: "",
  });

  const [showModal, setShowModal] = useState({
    delete: {
      status: false,
      data: {},
    },
    detail: {
      status: false,
      data: {},
    },
  });

  const [editStatus, setEditStatus] = useState({});

  //   console.log(showModal.detail.data);

  const handleSearch = (e) => setFilter({ ...filter, search: e.target.value });

  const changeStartDate = (_, dateString) =>
    setFilter({ ...filter, startDate: dateString });

  const changeEndDate = (_, dateString) =>
    setFilter({ ...filter, endDate: dateString });

  const columns = [
    {
      title: "customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Vehicle",
      dataIndex: "vehicle",
      key: "vehicle",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
      render: (_, record) => {
        const { paymentType } = record;
        return (
          <>
            <div
              className={`py-1 px-4 ${
                paymentType === "transfer"
                  ? "bg-picton-blue border-picton-blue"
                  : "bg-casablanca-orange border-casablanca-orange"
              } border-2 rounded-md flex justify-center`}
            >
              <h3 className={`font-semibold text-white`}>{paymentType}</h3>
            </div>
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (_, record) => {
        const { paymentStatus } = record;
        return (
          <>
            <button
              className={`w-20 py-1 px-4 ${
                paymentStatus === "finished"
                  ? "border-algae-green"
                  : paymentStatus === "waiting"
                  ? "border-casablanca-orange"
                  : paymentStatus === "order"
                  ? "border-picton-blue"
                  : paymentStatus === "canceled"
                  ? "border-cerise-red"
                  : "border-mercury"
              } border-2 rounded-md flex justify-center`}
              onClick={() => {
                editStatus.id === undefined
                  ? setEditStatus(record)
                  : editStatus.id !== record.id
                  ? setEditStatus(record)
                  : setEditStatus({});
              }}
            >
              <h3
                className={`font-semibold ${
                  paymentStatus === "finished"
                    ? "text-algae-green"
                    : paymentStatus === "waiting"
                    ? "text-casablanca-orange"
                    : paymentStatus === "order"
                    ? "text-picton-blue"
                    : paymentStatus === "canceled"
                    ? "text-cerise-red"
                    : "text-mercury"
                }`}
              >
                {paymentStatus}
              </h3>
            </button>
          </>
        );
      },
    },
    {
      render: (_, record) => {
        const listStatus = ["finished", "waiting", "order"];
        return (
          <section>
            <div
              className={`${
                editStatus.id === record.id ? "relative" : "hidden"
              } z-50`}
            >
              <div className="absolute top-6 right-16">
                <div className="bg-zinc-50 rounded-md shadow-2xl">
                  <div className="flex flex-col gap-4 px-6 py-6 mb-2">
                    {listStatus
                      .filter((item) => item !== record.paymentStatus)
                      .map((item) => {
                        return (
                          <button
                            className={`w-20 py-1 px-4 ${
                              item === "finished"
                                ? "border-algae-green"
                                : item === "waiting"
                                ? "border-casablanca-orange"
                                : item === "order"
                                ? "border-picton-blue"
                                : "border-mercury"
                            } border-2 rounded-md flex justify-center`}
                            key={item}
                            onClick={() => {
                              let data = {};
                              if (item === "finished") {
                                data = {
                                  status: "finished",
                                  isCompleted: true,
                                };

                                return handleChangeStatusTransaction(data);
                              }

                              if (item === "waiting") {
                                data = {
                                  status: "waiting",
                                  isCompleted: false,
                                };

                                return handleChangeStatusTransaction(data);
                              }

                              if (item === "order") {
                                data = {
                                  status: "order",
                                  isCompleted: false,
                                };

                                return handleChangeStatusTransaction(data);
                              }
                            }}
                          >
                            <p
                              className={`font-semibold ${
                                item === "finished"
                                  ? "text-algae-green"
                                  : item === "waiting"
                                  ? "text-casablanca-orange"
                                  : item === "order"
                                  ? "text-picton-blue"
                                  : item === "canceled"
                                  ? "text-cerise-red"
                                  : "text-mercury"
                              }`}
                            >
                              {item}
                            </p>
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                setShowModal({
                  ...showModal,
                  detail: {
                    status: true,
                    data: record,
                  },
                })
              }
            >
              <EyeOutlined className="text-2xl font-bold" />
            </button>
          </section>
        );
      },
    },
    {
      render: (_, record) => {
        return (
          <>
            <button
              onClick={() =>
                setShowModal({
                  ...showModal,
                  delete: {
                    status: true,
                    data: record,
                  },
                })
              }
            >
              <DeleteOutlined className="text-2xl font-bold" />
            </button>
          </>
        );
      },
    },
  ];

  const handlePagination = (page, pageSize) => fetchTransaction(page, pageSize);

  const handleChangeStatusTransaction = (data) => {
    setLoading(!loading);

    axios({
      method: "patch",
      url: `${apiVrent}/payments?reservationId=${editStatus.id}`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
      data: data,
    })
      .then((_) => {
        setLoading(false);

        setEditStatus({});
        fetchTransaction(1, 5);
        return message.success("Change status transaction success");
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTransaction = () => {
    setLoading(!loading);

    axios({
      method: "delete",
      url: `${apiVrent}/reservations/?reservationId=${showModal.delete.data.id}`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then((_) => {
        setLoading(false);

        fetchTransaction(1, 5);
        return setShowModal({
          ...showModal,
          delete: { status: false, data: {} },
        });
      })
      .catch((err) => console.log(err));
  };

  const fetchTransaction = (page, row) => {
    setLoading(!loading);

    axios({
      method: "get",
      url:
        filter.search !== ""
          ? `${api}/transaction/?search=${filter.search}&page=${page}&row=${row}`
          : `${api}/transaction/?page=${page}&row=${row}`,
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
            startDate: moment(item.startDate).format("DD-MM-YYYY"),
            endDate: moment(item.endDate).format("DD-MM-YYYY"),
          };
        });
        return setTransaction({
          data: keyData,
          total: result.data.data.total,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTransaction(1, 5);
  }, []);

  return (
    <DashboardLayout>
      <main className="">
        {loading ? <Spiner /> : <></>}

        <div className="mb-4 flex justify-between">
          <div className="w-full flex md:flex-row flex-col md:gap-x-5 gap-y-2 md:mb-0 mb-2">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={handleSearch}
              onPressEnter={() => fetchTransaction(1, 5)}
            />

            <DatePicker
              className="md:w-60"
              placeholder="Start date"
              onChange={changeStartDate}
            />
            <DatePicker
              className="md:w-60"
              placeholder="End date"
              onChange={changeEndDate}
            />
          </div>
        </div>
        <section className="flex flex-col">
          <Table
            className="overflow-auto"
            columns={columns}
            dataSource={transaction.data}
            pagination={false}
            s
          />
          <div className="w-full my-4 flex justify-center">
            <Pagination
              defaultCurrent={1}
              total={transaction.total}
              pageSize={5}
              onChange={handlePagination}
            />
          </div>
        </section>

        <section>
          <DeleteModal
            title={`Are you sure to delete this transaction ?`}
            modalOpen={showModal.delete.status}
            onCancel={() =>
              setShowModal({
                ...showModal,
                delete: { status: false, data: {} },
              })
            }
          >
            <section className="mt-6 w-full">
              <h1 className="text-lg">Click confirm button to confirm !</h1>

              <div className="mt-8 flex justify-end gap-6">
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
                  onClick={handleDeleteTransaction}
                >
                  Confirm
                </Button>
              </div>
            </section>
          </DeleteModal>

          <EditModal
            title={`${showModal.detail.data.vehicle} ordered by ${showModal.detail.data.customer}`}
            modalOpen={showModal.detail.status}
            width={420}
            onCancel={() =>
              setShowModal({
                ...showModal,
                detail: { status: false, data: {} },
              })
            }
          >
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex">
                <h2 className="w-1/2 text-lg font-semibold">Customer</h2>
                <h2 className="w-1/6 text-lg">:</h2>
                <h2 className="w-1/2 text-lg">
                  {showModal.detail.data.customer}
                </h2>
              </div>

              <div className="flex">
                <h2 className="w-1/2 text-lg font-semibold">Vehicle</h2>
                <h2 className="w-1/6 text-lg">:</h2>
                <h2 className="w-1/2 text-lg">
                  {showModal.detail.data.vehicle}
                </h2>
              </div>

              <div className="flex">
                <h2 className="w-1/2 text-lg font-semibold">Start Date</h2>
                <h2 className="w-1/6 text-lg">:</h2>
                <h2 className="w-1/2 text-lg">
                  {showModal.detail.data.startDate}
                </h2>
              </div>

              <div className="flex">
                <h2 className="w-1/2 text-lg font-semibold">End Date</h2>
                <h2 className="w-1/6 text-lg">:</h2>
                <h2 className="w-1/2 text-lg">
                  {showModal.detail.data.endDate}
                </h2>
              </div>

              <div className="flex">
                <h2 className="w-1/2 text-lg font-semibold">Quantity</h2>
                <h2 className="w-1/6 text-lg">:</h2>
                <h2 className="w-1/2 text-lg">
                  {showModal.detail.data.quantity} vehicle
                </h2>
              </div>

              <div className="flex">
                <h2 className="w-1/2 text-lg font-semibold">Price</h2>
                <h2 className="w-1/6 text-lg">:</h2>
                <h2 className="w-1/2 text-lg">
                  {showModal.detail.data.totalPrice}
                </h2>
              </div>

              <div className="flex">
                <h2 className="w-1/2 text-lg font-semibold">Days</h2>
                <h2 className="w-1/6 text-lg">:</h2>
                <h2 className="w-1/2 text-lg">
                  {showModal.detail.data.days} day
                </h2>
              </div>

              <div className="flex">
                <h2 className="w-1/2 text-lg font-semibold">Payment Type</h2>
                <h2 className="w-1/6 text-lg">:</h2>
                <h2 className="w-1/2 text-lg">
                  {showModal.detail.data.paymentType}
                </h2>
              </div>

              <div className="flex">
                <h2 className="w-1/2 text-lg font-semibold">Status</h2>
                <h2 className="w-1/6 text-lg">:</h2>
                <h2 className="w-1/2 text-lg">
                  {showModal.detail.data.paymentStatus}
                </h2>
              </div>
            </div>

            <div className="bg-mercury mt-4 h-6 rounded-b-lg" />
          </EditModal>
        </section>
      </main>
    </DashboardLayout>
  );
};

export default Transaction;
