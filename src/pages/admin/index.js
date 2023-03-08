import { DashboardLayout } from "@/components";
import { Table, Pagination, Input, Button } from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const api = process.env.API_URL;

const Admin = () => {
  const userData = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState({ data: [], total: 0 });

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

  const fetchAdmins = () => {
    setLoading(!loading);

    axios({
      method: "get",
      url: `${api}/admin`,
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

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <DashboardLayout>
      <main className="">
        <div className="mb-4 flex justify-between">
          <div className="flex md:mb-0 mb-2">
            <Input
              className="mr-2"
              placeholder="Search"
              prefix={<SearchOutlined />}
            />
          </div>

          <Button
            type="primary"
            className="flex items-center justify-center bg-algae-green w-fit px-2 rounded-full"
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
            <Pagination defaultCurrent={1} total={admins.total} />
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
};

export default Admin;
