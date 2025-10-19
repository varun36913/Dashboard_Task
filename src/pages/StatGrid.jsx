import React from "react";

export default function StatGrid({ stats = [] }) {
  const importIcon = (fileName) => {
    try {
      return new URL(`../image/${fileName}`, import.meta.url).href;
    } catch (err) {
      console.warn("Icon not found:", fileName, err);
      return "";
    }
  };

  return (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-4 
        gap-4 
        sm:gap-5 
        md:gap-6 
        w-full
      "
    >
      {stats.map((s) => (
        <div
          key={s.id}
          className="
            bg-white
            shadow-[0px_1px_1px_#00000029]
            rounded-[8px]
            border border-[#CFD6E5]
            p-4 
            flex flex-col 
            justify-between
            transition-all duration-200
            hover:shadow-md
            hover:scale-[1.02]
            w-full
            min-h-[120px]
          "
        >
          <div className="flex items-center gap-2 mb-3">
            {s.icon && (
              <img
                src={importIcon(s.icon)}
                alt={s.title}
                className="w-[18px] h-[20px] sm:w-[20px] sm:h-[22px] object-contain"
              />
            )}
            <h3 className="font-normal font-['Roboto'] text-[#2B2B2B] text-[16px] sm:text-[18px] leading-tight">
              {s.title}
            </h3>
          </div>

          <div className="flex items-center ml-4 sm:ml-6 gap-3 sm:gap-4 mb-1">
            <span className="text-[#4D5061] text-[13px] sm:text-[14px] font-['Roboto'] font-normal">
              Total
            </span>
            <span className="text-[#1F2439] text-[16px] sm:text-[18px] font-['Roboto'] font-medium">
              {s.total}
            </span>
          </div>

          <div className="flex items-center ml-4 sm:ml-6 gap-6 sm:gap-9">
            <span className="text-[#7B7C89] text-[15px] sm:text-[16px] font-normal rupee">
              ₹
            </span>
            <span className="text-[16px] sm:text-[18px] text-[#1F2439] font-semibold font-['Roboto'] truncate">
              {s.amount}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
