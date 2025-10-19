import React, { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";

export default function Sidebar() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/sidebar")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Sidebar fetch failed:", err));
  }, []);

  const importIcon = (fileName) => {
    try {
      return new URL(`../image/${fileName}`, import.meta.url).href;
    } catch (err) {
      console.warn("Icon not found:", fileName, err);
      return "";
    }
  };

  return (
    <aside className="absolute left-0 top-42 bottom-0 z-40 w-20 md:w-20 flex items-start border-none shadow-[0px_3px_6px_#00000029] rounded-tr-[8px] rounded-br-[8px] rounded-tl-[0px] rounded-bl-[0px]   bg-white">
      <div className="flex flex-col items-center w-full py-4 space-y-3">
        {items.map((it) =>
          it.active ? (
            <div
              key={it.key}
              className=" w-14 md:w-14 flex flex-col items-center bg-[#13255B] text-white rounded-2xl shadow-md py-3 px-9"
              title={it.label}
            >
              <img
                src={importIcon(it.icon)}
                alt={it.label}
                className="absolute  w-[17px] h-[20px] object-contain "
              />
              <div className="text-[10px] text-[#A6A8B1] leading-none font-normal  font-['Roboto'] mt-7">
                {it.label}
              </div>
            </div>
          ) : (
            <div
              key={it.key}
              className="w-14 md:w-14 flex flex-col items-center bg-white text-gray-500 py-2 hover:bg-gray-50 cursor-pointer"
              title={it.label}
            >
              <img
                src={importIcon(it.icon)}
                alt={it.title}
                className="w-[17px] mb-3 h-[20px] object-contain"
              />
              <div className="text-[10px] text-[#A6A8B1] leading-none font-normal  font-['Roboto']">
                {it.label}
              </div>
            </div>
          )
        )}
      </div>
    </aside>
  );
}
