import { useSelector } from "react-redux";
import Dashboard from "./dashboard";
import Auth from "./auth";

export default function Home() {
  const userData = useSelector((state) => state.user);

  return userData.isLogin ? <Dashboard /> : <Auth />;
}
