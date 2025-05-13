import React from "react";
import { Link, Outlet } from "react-router-dom";
import Particles from "../../components/Particles";
import { dashboardChildren } from "../../assets/MultiListView";

const Dashboard = () => {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-[#07020D] text-white flex">
      {/* Sidebar */}
      <div className="hidden md:block w-full max-w-64 bg-[#07020D] border-r border-[#6315db]/30 p-6">
        <h2 className="px-2 text-2xl font-bold mb-8 text-[#6315db]">
          Admin Panel
        </h2>
        <aside className="space-y-3">
          {dashboardChildren.map((item, index) => (
            <Link
              to={"/dashboard" + item.path}
              key={index}
              className="block py-2 px-4 hover:bg-[#6315db]/20 rounded-lg transition"
            >
              {item.page}
            </Link>
          ))}
        </aside>
      </div>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
