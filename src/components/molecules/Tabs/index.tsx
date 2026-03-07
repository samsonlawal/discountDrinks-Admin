import React from "react";

export interface ITabItem {
  id: string;
  title?: string;
  badge?: string;
  showBadge?: boolean;
  disabled?: boolean;
}

function Tabs({
  data,
  activeTab,
  onChangeTab,
}: {
  data: ITabItem[];
  activeTab?: ITabItem;
  onChangeTab?: (props: { item: ITabItem }) => void;
}) {
  if (!data?.length && typeof data !== "object") return null;

  return (
    <div className="w-fit flex items-center gap-4 bg-gray-100 p-1 rounded-lg border border-gray-200">
      {data.map((item) => {
        const current = item?.id === activeTab?.id;

        return (
          <button
            disabled={item?.disabled}
            key={item?.id}
            className={`transition duration-100 ease-in-out border-b-2 border-b-[#2864FF00] px-3 rounded-md flex gap-2 justify-center items-center ${
              current ? "text-[#111] bg-gray-300 border-gray-200" : "text-[#838383]"
            } hover:scale-[1.04] ${item?.disabled ? "cursor-not-allowed opacity-30" : "cursor-pointer"}`}
            onClick={() => {
              console.log("item", item);
              onChangeTab?.({ item });
            }}
          >
            <span className="text-inherit text-[12px] leading-[22px]">
              {item?.title}
            </span>
            {item?.showBadge &&
            (typeof item?.badge === "string" ||
              typeof item?.badge === "number") ? (
              <span className="text-[#4E4E4E] flex text-center items-center justify-center text-[10px] leading-4 px-1.5 rounded-[13px] bg-[#F3F3F3]">
                {item?.badge} 
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
