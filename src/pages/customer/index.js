import { DashboardLayout, Spiner } from "@/components";
import { Table, Pagination, Input, Button, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";
const api = process.env.API_URL;

const Customer = () => {
  const userData = useSelector((state) => state.user);
  const [customer, setCustomer] = useState({ data: [], total: 0 });
  const [loading, setLoading] = useState(false);
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

  const handlePagination = (page, pageSize) => {
    return fetchCustomer(page, pageSize);
  };

  const handleSearch = (e) => setSearch(e.target.value);

  const fetchCustomer = (page, row) => {
    setLoading(!loading);

    axios({
      method: "get",
      url:
        search !== ""
          ? `${api}/customer/?search=${search}&page${page}&row=${row}`
          : `${api}/customer/?`,
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
            birth: moment(item.birth).format("DD-MM-YYYY"),
          };
        });

        return setCustomer({
          data: keyData,
          total: result.data.data.total,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCustomer(1, 5);
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
              onPressEnter={() => fetchCustomer(1, 5)}
            />
          </div>
        </div>
        <section className="flex flex-col">
          <Table
            className="overflow-auto"
            columns={columns}
            dataSource={customer.data}
            pagination={false}
          />
          <div className="w-full my-4 flex justify-center">
            <Pagination
              defaultCurrent={1}
              total={customer.total}
              pageSize={5}
              onChange={handlePagination}
            />
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
};

export default Customer;
