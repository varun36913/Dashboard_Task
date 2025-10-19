import React from "react";

export default function DueAgeStrip({ items = [], penaltySaved = 0 }) {
  return (
    <div className="bg-[#E9F0FF] rounded-xl p-5 shadow-sm font-roboto overflow-hidden ">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
        <div>
          <h4 className="text-[#1F2439] font-medium text-[16px] leading-tight">
            Due by Age Summary
          </h4>
          <p className="text-[#7B7C89] text-[13px] mt-1">
            Payment due days wise
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap ">
          <span className="text-[#7B7C89] text-[13px] whitespace-nowrap font-['Roboto']">
            Penalty Saved amount
          </span>
          <span className="bg-white pr-15 pl-3 py-2  text-[#1F2439] text-[16px] font-semibold rounded-md shadow-[0px_3px_6px_#0000000A] font-['Roboto']">
            ₹ {penaltySaved}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4  sm:gap-6 md:gap-8">
        {items.map((it) => (
          <div
            key={it.id}
            className="bg-white rounded-md p-3  shadow-[0px_3px_6px_#0000000A] flex flex-col justify-center items-start w-full"
          >
            <div className="text-[#7B7C89] text-[14px] mb-1 text-left truncate">
              {it.label}
            </div>
            <div className="text-[#1F2439] font-semibold text-[16px] text-left truncate">
              ₹ {it.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
