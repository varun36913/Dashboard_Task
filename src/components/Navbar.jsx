import { Bell, CircleHelp, Menu } from "lucide-react";
import React from "react";

export default function Navbar({ onMenuClick = () => {} }) {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-[0px_1px_1px_#00000029] z-50">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-3 sm:px-6 h-[56px] sm:h-[60px] gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <button
            aria-label="Open menu"
            onClick={onMenuClick}
            className="p-2 rounded hover:bg-gray-100 flex items-center justify-center"
          >
            <Menu className="w-5 h-5 text-[#13255B]" />
          </button>

          <h1 className="text-[18px] sm:text-[22px] leading-[24px] sm:leading-[28px] font-medium text-[#141414] font-['Roboto'] whitespace-nowrap">
            Logo
          </h1>
        </div>

        <div className="flex-1 flex justify-center">
          <input
            type="text"
            placeholder="Search"
            className="
              w-[130px]
              xs:w-[160px]
              sm:w-[250px]
              md:w-[350px]
              lg:w-[450px]
              h-[36px] sm:h-[40px]
              bg-white
              border border-[#E1E1E1]
              rounded-[6px]
              px-2 sm:px-3
              text-[13px] sm:text-[15px]
              text-[#999999]
              font-['Poppins']
              focus:outline-none
              focus:ring-1
              focus:ring-[#13255B]
              transition-all
            "
          />
        </div>

        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <div className="relative">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-[#3A4B6A]" />
            <span className="absolute top-[-3px] right-[-3px] w-2.5 h-2.5 bg-[#FFA726] rounded-full"></span>
          </div>

          <CircleHelp className="w-5 h-5 sm:w-6 sm:h-6 text-[#3A4B6A]" />

          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#13255B] text-white flex items-center justify-center font-medium text-[12px] sm:text-[14px]">
            JA
          </div>
        </div>
      </div>
    </nav>
  );
}
