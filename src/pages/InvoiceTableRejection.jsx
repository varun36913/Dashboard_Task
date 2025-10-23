import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CalendarMini from "../components/CalendarMini";
import { ChevronDown, ChevronUp } from "lucide-react";
import PaginationControl from "../components/PaginationControl";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { API_BASE_URL } from "../API/config";

export default function InvoiceTableRejection() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/invoices`)
      .then((r) => r.json())
      .then((json) => setInvoices(json))
      .catch((err) => console.error("Failed to fetch invoices:", err));
  }, []);

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const filteredInvoices = invoices.filter((inv) =>
    inv.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f3f6f8] flex">
      <Sidebar />

      <div className="flex-1 px-5">
        <Navbar />
        <main className="ml-[80px] md:ml-[80px] pt-4 mr-8 px-12">
          <div className="flex items-start justify-between">
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
            <button
              onClick={() => navigate("/page2")}
              className="px-4 py-2 bg-white rounded-md shadow-sm border border-[#CFD6E5] text-[#1F2439] text-[14px] font-medium hover:bg-[#E9F0FF] transition"
            >
              Approval
            </button>

            <button className="px-4 py-2 bg-[#13255B] text-white rounded-md shadow-sm border border-[#13255B] text-[14px] font-medium hover:opacity-90 transition">
              Rejected
            </button>

            <button className="px-4 py-2 bg-white rounded-md shadow-sm border border-[#CFD6E5] text-[#1F2439] text-[14px] font-medium hover:bg-[#E9F0FF] transition">
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
            <div
              className="overflow-auto"
              style={{
                maxHeight: "60vh",
                maxWidth: "79vw",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <table className="w-full text-left text-sm">
                <thead className=" bg-[#F5F7FB] text-[#141414] font-semibold font-['Roboto'] text-[13px]">
                  <tr>
                    <th className="p-3">All</th>
                    <th className="p-3">No</th>
                    <th className="p-3">Company name</th>
                    <th className="p-3">GST or Pan</th>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Invoice ID</th>
                    <th className="p-3">Issued date</th>
                    <th className="p-3">Invoice amount</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Remark</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredInvoices.map((inv, index) => (
                    <React.Fragment key={inv.id}>
                      <tr
                        onClick={() => toggleRow(inv.id)}
                        className={`cursor-pointer border-t border-[#E5E9F2] transition-colors ${
                          expandedRow === inv.id
                            ? "bg-[#13255B]"
                            : index % 2 === 0
                            ? "bg-[#F0F0F0]"
                            : "bg-white hover:bg-[#F9FAFB]"
                        }`}
                      >
                        {(() => {
                          var textColorClass =
                            expandedRow === inv.id
                              ? "text-white"
                              : "text-[#575757]";
                          return (
                            <>
                              <td
                                className={`p-4 align-middle ${textColorClass}`}
                              >
                                <input type="checkbox" />
                              </td>
                              <td
                                className={`p-4 align-middle font-normal text-[14px] font-['Roboto'] ${textColorClass}`}
                              >
                                {inv.id}
                              </td>
                              <td
                                className={`p-4 align-middle max-w-[95px] truncate whitespace-nowrap overflow-hidden text-ellipsis font-normal text-[14px] font-['Roboto'] ${textColorClass}`}
                                title={inv.company}
                              >
                                {inv.company}
                              </td>
                              <td
                                className={`p-4 align-middle font-normal text-[14px] font-['Roboto'] ${textColorClass}`}
                              >
                                {inv.gst}
                              </td>
                              <td
                                className={`p-4 align-middle font-normal text-[14px] font-['Roboto'] ${textColorClass}`}
                              >
                                {inv.orderId}
                              </td>
                              <td
                                className={`p-4 align-middle font-normal text-[14px] font-['Roboto'] ${textColorClass}`}
                              >
                                {inv.invoiceId}
                              </td>
                              <td
                                className={`p-4 align-middle whitespace-nowrap leading-[20px] h-[40px] font-normal text-[14px] font-['Roboto'] ${textColorClass}`}
                              >
                                {inv.issuedDate}
                              </td>
                              <td
                                className={`p-4 align-middle whitespace-nowrap flex justify-between font-normal text-[15px] font-['Roboto'] ${textColorClass}`}
                              >
                                <span>₹</span>{" "}
                                <span
                                  className={` ${
                                    expandedRow === inv.id
                                      ? "text-white"
                                      : "text-[#141414]"
                                  }`}
                                >
                                  {inv.amount}
                                </span>
                              </td>
                              <td
                                className={`p-4 align-middle font-normal text-[14px] font-['Roboto'] ${textColorClass}`}
                              >
                                {inv.department}
                              </td>
                              <td
                                className={`p-4 flex items-center justify-between align-middle font-normal text-[14px] font-['Roboto'] ${textColorClass}`}
                              >
                                {expandedRow === inv.id ? "Not paid" : ""}
                                {expandedRow === inv.id ? (
                                  <ChevronUp size={18} className="text-white" />
                                ) : (
                                  <ChevronDown
                                    size={18}
                                    className="text-[#575757]"
                                  />
                                )}
                              </td>
                            </>
                          );
                        })()}
                      </tr>

                      {expandedRow === inv.id && (
                        <tr>
                          <td
                            colSpan={10}
                            className="bg-[#F5F7FB] px-6 py-4 text-[#1F2439] align-top"
                          >
                            <div className="text-[15px] text-[#141414] font-medium mb-2 font-['Roboto']">
                              Remark
                            </div>
                            <div
                              className="text-[#222222] text-[14px] font-normal leading-[22px] tracking-[0.2px] font-['Roboto'] whitespace-pre-line break-words"
                              style={{
                                maxWidth: "81%",
                                wordBreak: "break-word",
                              }}
                            >
                              {inv.remark}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 mb-8">
            <PaginationControl
              current={3}
              total={3}
              onPrev={() => navigate("/page2")}
              onNext={() => navigate("/")}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
