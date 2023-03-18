import { DashboardLayout } from "@/components";
import { Table, Pagination, Input, Button, Select } from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
const api = process.env.API_VRENT;

const Vehicles = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState({ data: [], total: 0 });
  const [filter, setFilter] = useState({ search: "", type: "", status: "" });

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
  ];

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

  useEffect(() => {
    fetchVehicles(1, 5);
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
      </main>
    </DashboardLayout>
  );
};

export default Vehicles;
