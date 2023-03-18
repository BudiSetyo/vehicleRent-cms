import { DashboardLayout } from "@/components";
import { Table, Pagination, Input, Button } from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
const api = process.env.API_URL;

const Admin = () => {
  const router = useRouter();
  const userData = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState({ data: [], total: 0 });
  const [search, setSearch] = useState("");

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

  const handleNavigate = (href) => router.push(href);

  const handlePagination = (page, pageSize) => {
    return fetchAdmins(page, pageSize);
  };

  const handleSearch = (e) => setSearch(e.target.value);

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

  useEffect(() => {
    fetchAdmins(1, 5);
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
      </main>
    </DashboardLayout>
  );
};

export default Admin;
