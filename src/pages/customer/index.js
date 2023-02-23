import { DashboardLayout } from "@/components";
import { Table, Pagination, Input, Button, Select } from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";

const Customer = () => {
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
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
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
      title: "Birth",
      dataIndex: "birth",
      key: "birth",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
  ];

  const data = [
    {
      name: "Bukayo Saka",
      email: "sakka@gmail.com",
      gender: "male",
      address: "Jl. Kebayoran 12 No. 08",
      phoneNumber: "0895678273627",
      birth: "11-09-2001",
      location: "Jakarta",
      key: "1",
    },
    {
      name: "Bukayo Saka",
      email: "sakka@gmail.com",
      gender: "male",
      address: "Jl. Kebayoran 12 No. 08",
      phoneNumber: "0895678273627",
      birth: "11-09-2001",
      location: "Jakarta",
      key: "2",
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

export default Customer;
