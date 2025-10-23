import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import StatGrid from "./pages/StatGrid";
import ChartsRow from "./pages/ChartsRow";
import DueAgeStrip from "./pages/DueAgeStrip";
import CalendarMini from "./components/CalendarMini";
import PaginationControl from "./components/PaginationControl";
import InvoiceTable from "./pages/InvoiceTable";
import InvoiceTableRejection from "./pages/InvoiceTableRejection";
import { API_BASE_URL } from "../src/API/config";

function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/dashboard`)
      .then((r) => r.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!data) return <div className="p-8">No data available</div>;

  return (
    <div className="min-h-screen bg-[#f3f6f8] flex">
      <Sidebar />
      <div className="flex-1 px-5">
        <Navbar />
        <main className="ml-[80px] md:ml-[80px] pt-4 mr-8 px-12">
          <div className="flex items-start justify-between ">
            <div>
              <div className="text-[12px] font-semibold leading-[16px] text-[#141414]">
                Dashboard
              </div>
              <h1 className="mt-[15px] text-[22px] font-bold text-[#141414]">
                Dashboard
              </h1>
            </div>

            <div className="flex flex-col items-end">
              <CalendarMini />
            </div>
          </div>
          <div className="mt-5">
            <div className="inline-flex items-center w-[352px] h-[52px] bg-white shadow-[0px_1px_2px_#00000029] border border-[#CFD6E5] rounded-[8px] px-4 text-[#141414] text-[16px]">
              <div className="text-left">Overall Outstanding</div>
              <div className="ml-[20px] flex items-center gap-1">
                <span className="text-[#8E8E8E] text-[22px]">₹</span>
                <span className="text-[24px] font-medium text-[#1F2439]">
                  {data.overallOutstanding}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <StatGrid stats={data.stats} />
          </div>

          <div className="mt-6">
            <ChartsRow queues={data.queues} kpi={data.kpi} />
          </div>

          <div className="mt-6">
            <DueAgeStrip
              items={data.dueByAge}
              penaltySaved={data.penaltySaved}
            />
          </div>

          <div className="mt-10 mb-6">
            <PaginationControl
              current={1}
              total={3}
              onPrev={() => {}}
              onNext={() => navigate("/page2")}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/page2" element={<InvoiceTable />} />
        <Route path="/page3" element={<InvoiceTableRejection />} />
      </Routes>
    </Router>
  );
}
