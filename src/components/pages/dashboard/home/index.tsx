"use client";
import DashboardLayout from "@/components/layouts/dashboard";

function DashboardHome() {
  return (
    <DashboardLayout leftTitle="Dashboard">
      <div>
        {/* Header */}
        <p>Header</p>
        {/* Body */}
        <div className="px-6 pb-[32.52px]">
          <p>Body</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardHome;
