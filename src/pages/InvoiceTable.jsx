import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PaginationControl from "../components/PaginationControl";
import CalendarMini from "../components/CalendarMini";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";

const API = "http://localhost:4000";

export default function InvoiceTable() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API}/invoices`)
      .then((r) => r.json())
      .then((json) => setInvoices(json))
      .catch((err) => console.error("Failed to fetch invoices:", err));
  }, []);

  const filteredInvoices = invoices.filter((inv) =>
    inv.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f3f6f8] flex">
      <Sidebar />

      <div className="flex-1 px-5">
        <Navbar />

        <main className="ml-[80px] md:ml-[80px] pt-4 mr-8 px-12">
          <div className="flex items-start justify-between ">
            <div>
              <div className="text-[12px] font-semibold text-[#141414] leading-[16px]">
                Dashboard &gt; Invoice Received
              </div>
              <h1 className="mt-[15px] text-[22px] font-bold text-[#141414]">
                Invoice Received
              </h1>
            </div>

            <div className="flex flex-col items-end">
              <CalendarMini />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button className="px-4 py-2 bg-white rounded-md shadow-sm border border-[#CFD6E5] text-[#1F2439] text-[14px] font-medium hover:bg-[#13255B] hover:text-[#ffffff] transition">
              Approval
            </button>

            <button
              onClick={() => navigate("/page3")}
              className="px-4 py-2 bg-white rounded-md shadow-sm border border-[#CFD6E5] text-[#1F2439] text-[14px] font-medium hover:bg-[#13255B] hover:text-[#ffffff] transition"
            >
              Rejected
            </button>

            <button className="px-4 py-2 bg-white rounded-md shadow-sm border border-[#CFD6E5] text-[#1F2439] text-[14px] font-medium hover:bg-[#13255B] hover:text-[#ffffff] transition">
              Pending
            </button>
          </div>

          <div className="flex items-center justify-end  gap-3">
            <div className="relative w-[250px]">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 pr-3 py-2 border font-['Roboto']  border-[#CFD6E5] bg-white rounded-md text-[14px] text-[#999999] focus:outline-none focus:ring-1 focus:ring-[#13255B]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search
                className="absolute left-2.5 top-2.5 text-[#16325C]"
                size={18}
              />
            </div>

            <button className="p-3 bg-white rounded-[4px] shadow-[0px_3px_6px_#00000029] hover:bg-[#F5F7FB] transition">
              <SlidersHorizontal size={20} className="text-[#13255B]" />
            </button>
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-sm border border-[#CFD6E5] overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FFFFFF] text-[#1F2439] font-semibold">
                <tr>
                  <th className="p-3  text-[#141414] font-['Roboto'] text-[16px]">
                    All
                  </th>
                  <th className="p-3  text-[#141414] font-['Roboto'] text-[16px]">
                    No
                  </th>
                  <th className="p-3  text-[#141414] font-['Roboto'] text-[16px]">
                    Company name
                  </th>
                  <th className="p-3  text-[#141414] font-['Roboto'] text-[16px]">
                    GST or Pan
                  </th>
                  <th className="p-3  text-[#141414] font-['Roboto'] text-[16px]">
                    Order ID
                  </th>
                  <th className="p-3  text-[#141414] font-['Roboto'] text-[16px]">
                    Invoice ID
                  </th>
                  <th className="p-3  text-[#141414] font-['Roboto'] text-[16px]">
                    Issued date
                  </th>
                  <th className="p-3  text-[#141414] font-['Roboto'] text-[16px]">
                    Invoice amount
                  </th>
                  <th className="p-3  text-[#141414] font-['Roboto'] text-[16px]">
                    Department
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredInvoices.map((inv, index) => (
                  <tr
                    key={inv.id}
                    className={`border-t border-[#E5E9F2] hover:bg-[#F9FAFB] ${
                      index % 2 === 0 ? "bg-[#F0F0F0]" : "bg-white"
                    }`}
                  >
                    <td className="p-3">
                      <input type="checkbox" />
                    </td>
                    <td className="p-3 font-normal text-[#575757] font-['Roboto'] text-[14px]">
                      {inv.id}
                    </td>
                    <td className="p-3 font-normal text-[#575757] font-['Roboto'] text-[14px]">
                      {inv.company}
                    </td>
                    <td className="p-3 font-normal text-[#575757] font-['Roboto'] text-[14px]">
                      {inv.gst}
                    </td>
                    <td className="p-3 font-normal text-[#575757] font-['Roboto'] text-[14px]">
                      {inv.orderId}
                    </td>
                    <td className="p-3 font-normal text-[#575757] font-['Roboto'] text-[14px]">
                      {inv.invoiceId}
                    </td>
                    <td className="p-3 font-normal text-[#575757] font-['Roboto'] text-[14px]">
                      {inv.issuedDate}
                    </td>
                    <td className="p-3 font-normal text-[#575757] font-['Roboto'] text-[16px] flex justify-between">
                      <span>₹</span>{" "}
                      <span className="text-[#141414] font-['Roboto']">
                        {inv.amount}
                      </span>
                    </td>
                    <td className="p-3 text-[#7B7C89]">{inv.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 mb-8">
            <PaginationControl
              current={2}
              total={3}
              onPrev={() => navigate("/")}
              onNext={() => navigate("/page3")}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
