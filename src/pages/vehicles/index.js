import { DashboardLayout } from "@/components";
import { Table, Pagination, Input, Button, Select } from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";

const Vehicles = () => {
  const columns = [
    {
      title: "Vehicle",
      dataIndex: "vehicle",
      key: "vehicle",
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
  ];

  const data = [
    {
      vehicle: "Lambo",
      type: "car",
      location: "jombok",
      capacity: 2,
      popular: true,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 1000000,
      status: "available",
      stock: 4,
      key: "1",
    },
    {
      vehicle: "Lambo",
      type: "car",
      location: "jombok",
      capacity: 2,
      popular: true,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 1000000,
      status: "available",
      stock: 4,
      key: "2",
    },
  ];

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
              ]}
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
              ]}
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

export default Vehicles;
