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
    <div className="w-full flex items-center gap-6">
      {data.map((item) => {
        const current = item?.id === activeTab?.id;

        return (
          <button
            disabled={item?.disabled}
            key={item?.id}
            className={`transition duration-100 ease-in-out border-b-2 border-b-[#2864FF00] pb-2 ${
              current ? "text-[#2864FF] border-b-[#2864FF]" : "text-[#838383]"
            } hover:scale-[1.04] ${item?.disabled ? "cursor-not-allowed opacity-30" : "cursor-pointer"}`}
            onClick={() => {
              console.log("item", item);
              onChangeTab?.({ item });
            }}
          >
            <span className="text-inherit font-medium text-sm leading-[22px]">
              {item?.title}
            </span>
            {item?.showBadge &&
            (typeof item?.badge === "string" ||
              typeof item?.badge === "number") ? (
              <span className="text-[#4E4E4E] text-[10px] leading-4 px-[8px] py-[2px] rounded-[13px] bg-[#F3F3F3] ml-[4px]">
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
