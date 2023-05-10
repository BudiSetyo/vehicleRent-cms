import { DashboardLayout, Spiner } from "@/components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Skeleton, Input, Space, Button } from "antd";
import { useRouter } from "next/router";
import axios from "axios";
const apiVrent = process.env.API_VRENT;

const ChatDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const userData = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState([]);

  const fetchData = () => {
    setLoading(true);

    axios({
      method: "get",
      url: `${apiVrent}/chats/detail/?userId=${id}`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then((result) => {
        setChatList(result.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <Skeleton loading={loading}>
        <section className="border-2 p-4 rounded-lg">
          <div className="flex flex-col-reverse gap-2 overflow-auto">
            {chatList.map((item) => {
              return (
                <div
                  key={item.id}
                  className={`flex ${
                    item.senderId === id ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`p-2 border rounded-lg w-fit max-w-xs ${
                      item.senderId === id ? "bg-catskill-white" : ""
                    }`}
                  >
                    <p>{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <Space.Compact className="w-full mt-10">
            <Input placeholder="Input your message" />
            <Button type="primary" className="bg-picton-blue">
              Send
            </Button>
          </Space.Compact>
        </section>
      </Skeleton>
    </DashboardLayout>
  );
};

export default ChatDetail;
