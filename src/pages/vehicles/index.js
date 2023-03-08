import { DashboardLayout } from "@/components";
import { Table, Pagination, Input, Button, Select } from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
const api = process.env.API_VRENT;

const Vehicles = () => {
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState({ data: [], total: 0 });
  //   console.log(vehicles);

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

  const fetchVehicles = () => {
    setLoading(!loading);

    axios({
      method: "get",
      url: `${api}/vehicles`,
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
    fetchVehicles();
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
            dataSource={vehicles.data}
            pagination={false}
          />
          <div className="w-full my-4 flex justify-center">
            <Pagination defaultCurrent={1} total={vehicles.total} />
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
};

export default Vehicles;
