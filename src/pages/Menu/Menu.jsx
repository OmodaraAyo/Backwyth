import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { formatLabelName } from "../../helper/Formatter";

const Menu = () => {
  const user = useSelector((state) => state?.user.user);
  // console.log("from menu", user);
  const createNewMenu = "/dashboard/menus/add";

  return (
    <section
      id="menus"
      className="w-full h-full bg-[#07020D]/90 text-white px-2 sm:px-8 py-6"
    >
      <div className="mx-auto">
        {user?.options.length === 0 ? (
          <div className="flex flex-col text-center p-4 space-y-3 text-xl">
            <p className="text-gray-400">No menu created yet.</p>
            <Link
              to={createNewMenu}
              className="text-sm text-[#6315db] hover:underline inline-block"
            >
              + Add New Menu
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full menuTable">
              <thead className="bg-[#1a0b2d] text-white">
                <tr>
                  <th className="px-4 py-3 border-b border-r border-[#6315db]/30">
                    Sr.
                  </th>
                  <th className="px-4 py-3 border-b border-r border-[#6315db]/30">
                    Title
                  </th>
                  <th className="px-4 py-3 border-b border-r border-[#6315db]/30">
                    Created Date
                  </th>
                  <th className="px-4 py-3 border-b border-[#6315db]/30">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {user?.options.map((menu, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#0e021a] transition-colors"
                  >
                    <td className="px-4 py-3 border-b border-r border-[#6315db]/30">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 border-b border-r border-[#6315db]/30">
                      {formatLabelName(menu.title)}
                    </td>
                    <td className="px-4 py-3 border-b border-r border-[#6315db]/30">
                      {moment(menu?.createdAt, "MM/DD/YYYY HH:mm:ss").format(
                        "LLL"
                      )}
                    </td>
                    <td className="px-4 py-3 border-b border-[#6315db]/30">
                      <Link
                        to={`/dashboard/menus/${menu.optionId}/edit`}
                        className="text-sm text-[#7a2fff] hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-8 flex justify-self-start">
              <Link
                to={createNewMenu}
                className="flex justify-center w-full bg-[#6315db] hover:bg-[#7a2fff] text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                + Add New Menu
              </Link>
            </div>
          </div>
        )}
      </div>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </section>
  );
};

export default Menu;
