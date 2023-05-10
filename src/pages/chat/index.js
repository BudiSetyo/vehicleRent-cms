import { DashboardLayout, Spiner } from "@/components";
import { Avatar, List, Typography, Skeleton } from "antd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
const apiVrent = process.env.API_VRENT;

const Chat = () => {
  const router = useRouter();
  const userData = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [chatData, setChatData] = useState([]);
  //   console.log(chatData);

  const handleNavigate = (href) => router.push(href);

  const fetchData = () => {
    setLoading(true);

    axios({
      method: "get",
      url: `${apiVrent}/chats/admin/?userId=${userData.data.id}`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then((result) => {
        setChatData(result.data.data);
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
        <section>
          <List
            header={<div>Header</div>}
            bordered
            dataSource={chatData}
            renderItem={(item) => (
              <List.Item>
                <div className="flex gap-2 items-center">
                  <Avatar src={item.profileImage} />
                  <button
                    onClick={() => handleNavigate(`/chat/detail/${item.id}`)}
                  >
                    <p>{item.currentChat}</p>
                  </button>
                </div>
              </List.Item>
            )}
          />
        </section>
      </Skeleton>
    </DashboardLayout>
  );
};

export default Chat;
