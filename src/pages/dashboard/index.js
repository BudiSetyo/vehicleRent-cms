import { DashboardLayout, Spiner } from "@/components";
import { PieChart } from "react-minimal-pie-chart";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const api = process.env.API_URL;

const Dashboard = () => {
  const userData = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [chart, setChart] = useState({
    customer: 10,
    vehicle: 10,
    transaction: 10,
    admin: 10,
  });

  const fetchChart = () => {
    setLoading(!loading);

    axios({
      method: "get",
      url: `${api}/admin/totalData`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then((result) => {
        setLoading(false);

        return setChart(result.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchChart();
  }, []);

  return (
    <DashboardLayout>
      <main className="">
        {loading ? <Spiner /> : <></>}
        <section className="my-16 px-10">
          <div className="flex md:flex-row flex-col gap-10 max-w-5xl mx-auto items-center justify-center">
            <PieChart
              data={[
                {
                  title: "Customer",
                  value: parseInt(chart.customer),
                  color: "#2B3A55",
                },
                {
                  title: "Vehicles",
                  value: parseInt(chart.vehicle),
                  color: "#CE7777",
                },
                {
                  title: "Transactions",
                  value: parseInt(chart.transaction),
                  color: "#E8C4C4",
                },
                {
                  title: "Admin",
                  value: parseInt(chart.admin),
                  color: "#F2E5E5",
                },
              ]}
              animate={true}
              className="w-full max-w-md"
              lineWidth={50}
            />

            <div className="flex flex-col gap-4 w-full items-center">
              <div className="flex gap-4 items-center">
                <div
                  className="p-4 rounded-full"
                  style={{ backgroundColor: "#2B3A55" }}
                />
                <div className="flex gap-10 items-center justify-between w-48">
                  <h1 className="text-lg">Customer</h1>
                  <p>{chart.customer}</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div
                  className="p-4 rounded-full"
                  style={{ backgroundColor: "#CE7777" }}
                />
                <div className="flex gap-10 items-center justify-between w-48">
                  <h1 className="text-lg">Vehicles</h1>
                  <p>{chart.vehicle}</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div
                  className="p-4 rounded-full"
                  style={{ backgroundColor: "#E8C4C4" }}
                />
                <div className="flex gap-10 items-center justify-between w-48">
                  <h1 className="text-lg">Transactions</h1>
                  <p>{chart.transaction}</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div
                  className="p-4 rounded-full"
                  style={{ backgroundColor: "#F2E5E5" }}
                />
                <div className="flex gap-10 items-center justify-between w-48">
                  <h1 className="text-lg">Admin</h1>
                  <p>{chart.admin}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;
