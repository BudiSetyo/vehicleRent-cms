import { AuthLayout, Spiner } from "@/components";
import { Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { userLogin } from "@/configs";
import axios from "axios";
const api = process.env.API_URL;

const Auth = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleNavigate = (href) => {
    return router.push(href);
  };

  const handleForm = {
    email: (e) => setFormValue({ ...formValue, email: e.target.value }),
    password: (e) => setFormValue({ ...formValue, password: e.target.value }),
  };

  const handleSubmitForm = () => {
    setLoading(!loading);

    if (formValue.email === "" && formValue.password === "") {
      return console.log("Field cannot be empty");
    }

    axios({
      method: "post",
      url: `${api}/auth`,
      data: {
        email: formValue.email,
        password: formValue.password,
      },
    })
      .then((result) => {
        setLoading(false);
        dispatch(userLogin(result.data));
        return handleNavigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthLayout>
      <main>
        {loading ? <Spiner /> : <></>}

        <section className="flex flex-col items-center p-4">
          <h1 className="mt-36 text-4xl text-oxford-blue font-bold">
            VehicleRent<span className="text-san-juan">CMS</span>
          </h1>

          <div className="bg-white md:w-3/5 w-full mt-10 mb-36 rounded p-8 ">
            <Form layout="vertical" onFinish={handleSubmitForm}>
              <Form.Item
                label={
                  <div className="flex items-center mb-2">
                    <MailOutlined className="mr-2 text-xl" />
                    <h1 className="text-xl">Email address</h1>
                  </div>
                }
              >
                <Input
                  type="email"
                  className="bg-catskill-white text-xl p-3"
                  onChange={handleForm.email}
                />
              </Form.Item>

              <Form.Item
                label={
                  <div className="flex items-center mb-2">
                    <LockOutlined className="mr-2 text-xl" />
                    <h1 className="text-xl">Password</h1>
                  </div>
                }
              >
                <Input
                  type="password"
                  className="bg-catskill-white text-xl p-3"
                  onChange={handleForm.password}
                />
              </Form.Item>

              <Form.Item>
                <div className="flex justify-between items-center">
                  <a className="text-xl text-san-juan">Forgot Password?</a>
                  <Button
                    className="bg-oxford-blue py-6 px-10 flex items-center"
                    type="primary"
                    htmlType="submit"
                  >
                    <p className="text-xl text-white">Sign in</p>
                  </Button>
                </div>
              </Form.Item>

              {/* <Button className="flex items-center justify-center w-full text-xl p-6">
                Don’t have & account?
              </Button> */}

              <h2 className="mt-10 text-xl text-center font-bold">
                Contact the Admin for register!
              </h2>
            </Form>
          </div>
        </section>
      </main>
    </AuthLayout>
  );
};

export default Auth;
