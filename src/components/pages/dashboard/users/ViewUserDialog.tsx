import React, { useEffect } from "react";
import { ChevronLeft, User, Mail, Shield, Activity, Phone, MapPin, Calendar, Clock, CreditCard, ShoppingBag } from "lucide-react";

interface ViewUserDialogProps {
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
        <div className="mx-auto max-w-7xl md:px-10 px-6 py-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                <User className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl text-gray-900">{user.name || "Unknown User"}</h1>
                <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {isActive ? "Active" : "Inactive"}
                    </span>
                    <span className="text-sm text-gray-500 font-mono text-xs">{user.email || "-"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:gap-8 lg:grid-cols-5 px-2">
            {/* LEFT SIDE - Details */}
            <div className="lg:col-span-3 space-y-10">

              {/* Personal Information */}
              <section className="bg-transparent md:pb-0 pb-6">
                <h2 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-5 flex items-center gap-2 border-b pb-2 border-gray-200">
                  <User className="w-4 h-4 text-gray-300" strokeWidth={2} />
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Full Name</p>
                    <p className="text-[15px] text-gray-900">{user.name || "-"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Email Address</p>
                    <p className="text-[15px] text-gray-900">{user.email || "-"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Phone Number</p>
                    <p className="text-[15px] text-gray-900">{user.phone || "-"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Date of Birth</p>
                    <p className="text-[15px] text-gray-900">
                        {user.dob ? new Date(user.dob).toLocaleDateString() : "-"}
                    </p>
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Address</p>
                    <p className="text-[15px] text-gray-900 flex items-start gap-1.5">
                      <MapPin className="w-4 h-4 text-gray-300 mt-0.5 shrink-0" />
                      {user.address || "-"}
                    </p>
                  </div>
                </div>
              </section>

              {/* Account Security & Identity */}
              <section className="bg-transparent md:pb-0 pb-6">
                <h2 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-5 flex items-center gap-2 border-b pb-2 border-gray-200">
                  <Shield className="w-4 h-4 text-gray-300" strokeWidth={2} />
                  Account Security & Identity
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">User Identifier</p>
                    <p className="text-[11px] font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded w-fit inline-block">
                      {user._id || user.id || "-"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Account Role</p>
                    <p className="text-[15px] font-medium text-gray-900 capitalize flex items-center gap-1.5">
                      {user.role || "-"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Account Tenure</p>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-300" />
                        <p className="text-[15px] text-gray-900">{joinedDate}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Login Provider</p>
                    <p className="text-[15px] text-gray-900">{user.provider || "Email/Password"}</p>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT SIDE - Activity & Stats Summary */}
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky md:top-24 mt-0.5">
                <h2 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-gray-300" strokeWidth={2} />
                  Performance Insights
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-md border border-gray-200">
                            <ShoppingBag className="w-4 h-4 text-gray-300" />
                        </div>
                        <span className="text-sm text-gray-500">Orders Placed</span>
                    </div>
                    <span className="text-lg font-medium text-gray-900">{user.totalOrders || 0}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-md border border-gray-200">
                            <CreditCard className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="text-sm text-gray-500">Total Spend</span>
                    </div>
                    <span className="text-lg font-medium text-emerald-600">£{Number(user.totalSpend || 0).toFixed(2)}</span>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            Last Logged In
                        </span>
                        <span className="text-gray-600">
                            {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : joinedDate}
                        </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Account Status Card */}
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                <div className="space-y-1">
                    <p className="text-[13px] font-medium text-blue-900">Security Profile</p>
                    <p className="text-[12px] text-blue-700 leading-relaxed">
                        This user is a {user.role || "standard member"} with {isActive ? "active" : "inactive"} system access.
                    </p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-10" />
        </div>
      </div>
    </div>
  );
}
