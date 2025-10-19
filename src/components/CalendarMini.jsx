import React from "react";

export default function CalendarMini() {
  return (
    <div className="w-[280px] px-6 py-0 rounded-lg inline-block text-center font-['Roboto'] ">
      <div className="text-sm text-gray-600 mb-2 font-['Roboto']">
        July 2022
      </div>

      <div className="flex justify-between text-gray-600 text-sm font-medium mb-1">
        <span>S</span>
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
      </div>

      <div className="flex justify-between text-gray-400 text-sm">
        <span>11</span>
        <span>12</span>
        <span>13</span>

        <div className="relative flex flex-col items-center">
          <div className="absolute -top-[22px] bg-[#FFA726] text-white text-xs font-semibold rounded-t-full w-7 h-7 flex items-center justify-center shadow-sm">
            W
          </div>
          <div className="bg-[#1E2B4A] text-white text-xs font-semibold rounded-b-full w-7 h-7 flex items-center justify-center mt-[6px]">
            14
          </div>
        </div>

        <span>15</span>
        <span>16</span>
        <span>17</span>
      </div>
    </div>
  );
}
