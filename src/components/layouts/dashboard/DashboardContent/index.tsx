import React from "react";

function DashboardContent({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`mt-[60px] h-[calc(100vh-60px)] overflow-x-hidden overflow-y-auto bg-[white] pb-[80px] md:pb-0`}
    >
      {children}
    </div>
  );
}

export default DashboardContent;
