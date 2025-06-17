import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Layout = () => {
  return (
    <>
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="main">
        <div className="topbar">
          <Topbar />
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
