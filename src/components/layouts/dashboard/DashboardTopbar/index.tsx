import React from "react";

function DashboardTopbar({ leftTitle }: { leftTitle?: string }) {
  return (
    <div
      className={`py-6 px-6 font-medium fixed w-full md:w-[calc(100%-240px)] shrink-0 border-b-[#E9EDF5] border-b-[1px] flex items-center justify-between`}
    >
      <div className="flex gap-[16px] items-center">
        {/* <img
          src="/icons/house.svg"
          alt="menu-icon"
          className="w-[24px] h-[24px] object-contain"
        /> */}
        <h3 className="text-[#111111] text-[18px] leading-[26px]">
          {leftTitle}
        </h3>
      </div>

      <div className="flex gap-[16px] items-center">
        <button>
          <img
            src="/icons/bell-dark.svg"
            alt="avatar-icon"
            className="w-[18px] h-[18px] object-contain"
          />
        </button>
        <button>
          <img
            src="/icons/avatar.svg"
            alt="avatar-icon"
            className="w-[36px] h-[36px] object-contain"
          />
        </button>
      </div>
    </div>
  );
}

export default DashboardTopbar;
