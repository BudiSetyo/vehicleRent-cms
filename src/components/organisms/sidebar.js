import {
  HomeOutlined,
  CarOutlined,
  UserOutlined,
  ShopOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { capitalizeFirstLetter } from "@/utils";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  const page = router.pathname.split("/")[1];
  //   console.log(page);

  const handleNavigate = (href) => router.push(href);

  const mainMenu = [
    "dashboard",
    "vehicles",
    "customer",
    "transaction",
    "admin",
  ];

  return (
    <div className="md:px-8 px-2 pb-20 pt-10 bg-mercury fixed inset-y-0 z-40">
      <div className="mt-16 flex flex-col md:items-start items-center">
        <h1 className="md:mb-6 mb-1 font-semibold text-marine-blue">Manage</h1>
        {mainMenu.map((item, index) => {
          return (
            <button key={index} onClick={() => handleNavigate(`/${item}`)}>
              <div
                className={`my-4 flex items-center w-fit ${
                  page === item ? "border-b-2 border-black" : ""
                }`}
              >
                <div className="text-md mb-2">
                  {item === "dashboard" ? (
                    <HomeOutlined />
                  ) : item === "vehicles" ? (
                    <CarOutlined />
                  ) : item === "customer" ? (
                    <UserOutlined />
                  ) : item === "transaction" ? (
                    <ShopOutlined />
                  ) : item === "admin" ? (
                    <SmileOutlined />
                  ) : (
                    <div />
                  )}
                </div>
                <h1 className={`ml-3 text-md md:inline hidden`}>
                  {capitalizeFirstLetter(item)}
                </h1>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
