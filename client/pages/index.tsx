import DashboardLayout from "../components/ui/dashboardLayout";
import QueryModal from "../components/queryModal";
import Header from "../components/header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserQueriesQuery } from "../state/api/api";
import { useAppSelector } from "../state/hooks/hooks";
import Render from "../components/ui/render";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState({});
  const userQueries: any = useAppSelector((state) => state.global.userQueries);

  const handleQuery = (query: any) => {
    setQuery(query);
    setOpen(true);
  };

  return (
    <>
      <QueryModal open={open} setOpen={setOpen} query={query} />
      <div className="bg-gray-50 h-[90vh]">
        <DashboardLayout title="Your Queries">
          {userQueries && userQueries.length > 0 ? (
            <div className="mx-auto max-w-7xl py-6">
              <table className="w-full text-sm text-left border">
                <thead className="text-xs uppercase border-b">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      S.No
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Message
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Status
                    </th>
                    <th scope="col" className="py-3 px-6">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userQueries.map((query: any, index: any) => {
                    return (
                      <tr key={index} className="bg-white border-b">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium  whitespace-nowrap "
                        >
                          {index + 1}
                        </th>
                        <th className="py-4 px-6 font-medium whitespace-nowrap">
                          <p className="truncate w-96">{query.message}</p>
                        </th>
                        <td className="py-4 px-6 flex items-center">
                          {query.status === "pending" ? (
                            <span className=" flex items-center font-medium rounded-lg text-sm py-1 mr-4">
                              Pending
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="red"
                                className="w-4 h-4 ml-2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                />
                              </svg>
                            </span>
                          ) : (
                            <span className="flex items-center font-medium rounded-lg text-sm py-1 mr-4">
                              Approved
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="green"
                                className="w-4 h-4 ml-3"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-6 font-medium whitespace-nowrap">
                          <p
                            onClick={() => handleQuery(query)}
                            className="font-medium text-blue-600 cursor-pointer hover:underline"
                          >
                            View
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <Render />
          )}
        </DashboardLayout>
      </div>
    </>
  );
}
