import DashboardTopbar from "./DashboardTopbar";
import DashboardSidebar from "./DashboardSidebar";
import DashboardContent from "./DashboardContent";

function DashboardLayout({
  children,
  leftTitle,
}: {
  children: React.ReactNode;
  leftTitle?: string;
}) {
  return (
    <div className="w-screen h-screen overflow-hidden relative flex p-0 m-0 bg-white">
      <DashboardSidebar />
      <div className="relative flex-1 m-0 p-0 ">
        <DashboardTopbar leftTitle={leftTitle} />
        <DashboardContent>{children}</DashboardContent>
      </div>
    </div>
  );
}

export default DashboardLayout;
