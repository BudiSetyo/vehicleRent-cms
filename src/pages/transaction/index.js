import { DashboardLayout } from "@/components";
import { Table, Pagination, Input, DatePicker } from "antd";

import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const Transaction = () => {
  //   const [typeDate, setTypeDate] = useState(false);

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
      dataIndex: "status",
      key: "status",
    },
  ];

  const data = [
    {
      key: "1",
      customer: "Rangga",
      vehicle: "Ferari",
      quantity: 1,
      totalPrice: 4000000,
      days: 4,
      startDate: "12-02-2023",
      endDate: "16-02-2023",
      paymentType: "transfer",
      status: "Done",
    },
    {
      key: "2",
      customer: "Rangga",
      vehicle: "Ferari",
      quantity: 1,
      totalPrice: 4000000,
      days: 4,
      startDate: "12-02-2023",
      endDate: "16-02-2023",
      paymentType: "transfer",
      status: "Done",
    },
  ];

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
            dataSource={data}
            pagination={false}
            s
          />
          <div className="w-full my-4 flex justify-center">
            <Pagination defaultCurrent={1} total={100} />
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
};

export default Transaction;
