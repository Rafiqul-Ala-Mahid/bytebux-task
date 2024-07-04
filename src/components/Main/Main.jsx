import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Main = () => {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
    );
};

export default Main;
