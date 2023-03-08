import { DashboardLayout } from "@/components";
import { Table, Pagination, Input, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
const api = process.env.API_URL;

const Transaction = () => {
  const userData = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState({ data: [], total: 0 });

  const changeStartDate = (date, dateString) => {
    console.log(date, dateString);
  };

  const changeEndDate = (date, dateString) => {
    console.log(date, dateString);
  };

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
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
  ];

  const fetchTransaction = () => {
    setLoading(!loading);

    axios({
      method: "get",
      url: `${api}/transaction`,
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
    fetchTransaction();
  }, []);

  return (
    <DashboardLayout>
      <main className="">
        <div className="mb-4 flex justify-between">
          <div className="w-full flex md:flex-row flex-col md:gap-x-5 gap-y-2 md:mb-0 mb-2">
            <Input placeholder="Search" prefix={<SearchOutlined />} />

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
            <Pagination defaultCurrent={1} total={transaction.total} />
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
};

export default Transaction;
