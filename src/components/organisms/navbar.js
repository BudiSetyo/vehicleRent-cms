import { Avatar, Divider, List } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "@/configs";
import { useRouter } from "next/router";
import axios from "axios";
const apiVrent = process.env.API_VRENT;

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userData = useSelector((state) => state.user);

  const [navbarModal, setNavbarModal] = useState({
    notif: false,
    avatar: false,
  });

  const data = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
  ];

  const handleNavigate = (href) => router.push(href);

  const handleNavbarModal = {
    notif: () => {
      setNavbarModal({ notif: !navbarModal.notif, avatar: false });
    },
    avatar: () => {
      setNavbarModal({ notif: false, avatar: !navbarModal.avatar });
    },
  };

  const handleLogout = () => {
    dispatch(userLogout());
    return handleNavigate("/auth");
  };

  const checkToken = () => {
    axios({
      method: "get",
      url: `${apiVrent}/auth`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then((result) => {
        if (result.data.error) {
          dispatch(userLogout());
          return handleNavigate("/auth");
        }
        return;
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className="md:px-8 px-2 py-4 flex justify-between bg-oxford-blue fixed w-full z-50">
      <button>
        <h1 className="text-white font-semibold">
          VehicleRent<span className="text-marine-blue">CMS</span>
        </h1>
      </button>

      <div className="">
        <button className="mr-4 relative" onClick={handleNavbarModal.notif}>
          <BellOutlined className="text-2xl text-white" />
          <div className="absolute px-1 rounded-full top-0 right-0 bg-cerise-red">
            <p className="text-xs text-white">2</p>
          </div>
        </button>

        <button onClick={handleNavbarModal.avatar}>
          <Avatar className="bg-cerise-red">U</Avatar>
        </button>

        <div>
          <div
            className={`${
              navbarModal.notif ? "absolute" : "hidden"
            } top-14 md:right-24 right-12 z-40 bg-white rounded border-2 border-mercury`}
          >
            <Divider orientation="left">
              <List
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <button>{item}</button>
                  </List.Item>
                )}
              />
            </Divider>

            <div className="flex justify-center mb-2">
              <button className="px-4 py-2 rounded-full bg-cerise-red">
                <p className="text-white">View all</p>
              </button>
            </div>
          </div>

          <div
            className={`${
              navbarModal.avatar ? "absolute" : "hidden"
            } top-14 md:right-6 right-0  z-40 px-4 py-1`}
          >
            <button
              className="bg-cerise-red px-4 py-1 rounded-full border-2 border-mercury"
              onClick={handleLogout}
            >
              <h1 className="text-md text-white">Logout</h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
