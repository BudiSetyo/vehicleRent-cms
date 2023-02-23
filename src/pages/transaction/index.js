import { DashboardLayout } from "@/components";
import { Table, Pagination, Input, Button, Select } from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";

const Transaction = () => {
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
          <div className="flex md:mb-0 mb-2">
            <Input
              className="mr-2"
              placeholder="Search"
              style={{
                width: 125,
              }}
              prefix={<SearchOutlined />}
            />
          </div>

          <Button
            type="primary"
            className="flex items-center justify-center bg-algae-green w-fit px-2 rounded-full"
          >
            <PlusCircleOutlined className="mr-2 mb-1 text-lg text-white" />
            <p className="text-white text-lg">Create vehicle</p>
          </Button>
        </div>
        <section className="flex flex-col">
          <Table
            className="overflow-auto"
            columns={columns}
            dataSource={data}
            pagination={false}
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
