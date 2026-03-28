import React, { useEffect } from "react";
import { ChevronLeft, User, Mail, Calendar, Shield, Activity, Phone, MapPin, Clock } from "lucide-react";

interface ViewUserDialogProps {
  children?: React.ReactNode;
  user: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ViewUserDialog({
  user,
  open,
  onOpenChange,
}: ViewUserDialogProps) {
  // Close on ESC
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  // Lock background scroll
  useEffect(() => {
    if (!open) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open || !user) return null;

  const isActive = user.status?.toLowerCase() === "active" || user.isActive;
  const joinedDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : (user.joined || "-");

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <button
        aria-label="Close dialog overlay"
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 bg-black/40 cursor-default"
      />

      {/* Sidebar spacer - 240px to match sidebar width */}
      <div className="w-[240px] shrink-0 hidden md:block relative z-10" />

      {/* Dialog Panel */}
      <div className="flex-1 h-full overflow-auto bg-gray-50 relative z-10 shadow-xl border-l border-gray-200">
        {/* Top Header */}
        <div className="sticky top-0 z-20 border-b bg-white">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Users
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto max-w-7xl md:px-10 px-6 py-8 flex flex-col md:flex-row md:gap-12">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="h-32 w-32 rounded-md bg-gray-200 flex items-center justify-center text-gray-400">
                <User className="h-6 w-6" />
              </div>
              {/* <div>
                <h1 className="text-xl font-medium text-gray-900">{user.name || "-"}</h1>
                <p className="text-sm text-gray-500">{user.email || "-"}</p>
              </div> */}

            </div>
          </div>

          <div className="grid grid-cols-1 md:gap-8 lg:grid-cols-5 px-2">
            {/* LEFT SIDE - Details */}
            <div className="lg:col-span-3 space-y-10">

              {/* Personal Information */}
              <section className="bg-transparent md:pb-0 pb-6">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  Personal Information
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="w-32 text-sm text-gray-500">Full Name</span>
                    <span className="text-sm text-gray-900">{user.name || "-"}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-32 text-sm text-gray-500">Email Address</span>
                    <span className="text-sm text-gray-900">{user.email || "-"}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-32 text-sm text-gray-500">Phone Number</span>
                    <span className="text-sm text-gray-900">{user.phone || "-"}</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="w-32 text-sm text-gray-500 mt-0.5">Address</span>
                    <span className="text-sm text-gray-900 max-w-xs">{user.address || "-"}</span>
                  </div>
                </div>
              </section>

              {/* Account Details */}
              <section className="bg-transparent md:pb-0 pb-6">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  Account Details
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="w-32 text-sm text-gray-500">User ID</span>
                    <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{user._id || user.id || "-"}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-32 text-sm text-gray-500">Role</span>
                    <span className="text-sm text-gray-900 capitalize font-medium">{user.role || "-"}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-32 text-sm text-gray-500">Account Type</span>
                    <span className="text-sm text-gray-900">{user.type || "Standard"}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-32 text-sm text-gray-500">Joined Date</span>
                    <span className="text-sm text-gray-900">{joinedDate}</span>
                  </div>
                </div>
              </section>

              {/* Activity & Logs */}
              <section className="bg-transparent md:pb-0 pb-6">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-gray-400" />
                  Activity & Insights
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="w-32 text-sm text-gray-500">Last Active</span>
                    <span className="text-sm text-gray-900">{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "-"}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-32 text-sm text-gray-500">Orders Placed</span>
                    <span className="text-sm text-gray-900 font-medium">{user.totalOrders || 0}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-32 text-sm text-gray-500">Total Spend</span>
                    <span className="text-sm text-emerald-600 font-bold">${user.totalSpend?.toFixed(2) || "0.00"}</span>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT SIDE - Additional Info or Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* This section is currently empty or can be used for extra info later */}
            </div>
          </div>

          <div className="h-10" />
        </div>
      </div>
    </div>
  );
}
