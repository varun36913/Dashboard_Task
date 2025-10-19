import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationControl({ current, total, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-center py-4">
      <button
        onClick={onPrev}
        disabled={current === 1}
        className={`p-2 text-gray-500 hover:text-[#1F2439] transition ${
          current === 1 ? "opacity-40 cursor-not-allowed" : ""
        }`}
      >
        <ChevronLeft size={20} />
      </button>

      <span className="mx-3 text-[15px] text-[#1F2439] font-['Roboto']">
        {current} <span className="text-[#7B7C89]">of</span> {total}
      </span>

      <button
        onClick={onNext}
        disabled={current === total}
        className={`p-2 text-gray-500 hover:text-[#1F2439] transition ${
          current === total ? "opacity-40 cursor-not-allowed" : ""
        }`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
