import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const centerLabelPlugin = {
  id: "centerLabelPlugin",
  afterDraw(chart, args, options) {
    const { ctx } = chart;
    const dataset = chart.config.data.datasets[0];
    if (!dataset) return;

    const customValues = options.customValues || dataset.data;
    const chartTitle = options.chartTitle || "";
    const meta = chart.getDatasetMeta(0);

    meta.data.forEach((arc, i) => {
      const value = customValues[i];
      if (chartTitle === "Queues" && value !== 54) return;

      const angle = (arc.startAngle + arc.endAngle) / 2;
      const radius = ((arc.outerRadius + arc.innerRadius) / 2) * 1.1;
      const x = chart.width / 2 + Math.cos(angle) * radius;
      const y = chart.height / 2 + Math.sin(angle) * radius;

      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(0,0,0,0.1)";
      ctx.shadowBlur = 6;
      ctx.arc(x, y, 18, 0, 2 * Math.PI);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.fillStyle = "#000";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${value}%`, x, y);
      ctx.restore();
    });
  },
};

export default function ChartsRow({ queues = [], kpi = [] }) {
  const queueLabels = queues.map((q) => q.name);
  const queueValues = queues.map((q) => q.value);
  const queueColors = queues.map((q) => q.color);

  const kpiLabels = kpi.map((k) => k.label);
  const kpiValues = kpi.map((k) => k.value);
  const kpiColors = kpi.map((k) => k.color);

  const baseOptions = (customValues, chartTitle) => ({
    cutout: "70%",
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: false },
      centerLabelPlugin: { customValues, chartTitle },
    },
    layout: { padding: 10 },
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8 w-full">
      <div className="bg-white rounded-lg shadow-sm p-5 w-full max-w-full">
        <h3 className="font-medium mb-3 font-['Roboto'] text-[18px] text-[#141414] text-center sm:text-left">
          Queues
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-6">
          <div className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] flex-shrink-0">
            <Doughnut
              data={{
                labels: queueLabels,
                datasets: [
                  {
                    data: queueValues,
                    backgroundColor: queueColors,
                    borderWidth: 0,
                  },
                ],
              }}
              options={baseOptions(queueValues, "Queues")}
              plugins={[centerLabelPlugin]}
            />
          </div>
          <div className="flex-1 w-full sm:w-auto">
            <ul className="space-y-2 text-sm flex flex-wrap sm:block justify-center sm:justify-start">
              {queues.map((q) => (
                <li
                  key={q.name}
                  className="flex items-center gap-2 sm:gap-3 w-1/2 sm:w-auto justify-center sm:justify-start"
                >
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: q.color }}
                  ></span>
                  <span className="text-[14px] font-normal font-['Roboto'] text-[#1F2439] truncate max-w-[120px] sm:max-w-none">
                    {q.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-5 w-full max-w-full">
        <h3 className="font-medium mb-3 font-['Roboto'] text-[18px] text-[#141414] text-center sm:text-left">
          KPI
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-6">
          <div className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] flex-shrink-0">
            <Doughnut
              data={{
                labels: kpiLabels,
                datasets: [
                  {
                    data: kpiValues,
                    backgroundColor: kpiColors,
                    borderWidth: 0,
                  },
                ],
              }}
              options={baseOptions(kpiValues, "KPI")}
              plugins={[centerLabelPlugin]}
            />
          </div>

          <div className="flex-1 w-full sm:w-auto">
            <ul className="space-y-2 text-sm flex flex-wrap sm:block justify-center sm:justify-start">
              {kpi.map((k) => (
                <li
                  key={k.label}
                  className="flex items-center gap-2 sm:gap-3 w-1/2 sm:w-auto justify-center sm:justify-start"
                >
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: k.color }}
                  ></span>
                  <span className="text-[14px] font-normal font-['Roboto'] text-[#1F2439] truncate max-w-[120px] sm:max-w-none">
                    {k.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
