import React from "react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { X } from "lucide-react";

interface ViewUserDialogProps {
  children?: React.ReactNode;
  user: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ViewUserDialog({
  children,
  user,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: ViewUserDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  
  const isControlled = externalOpen !== undefined && externalOnOpenChange !== undefined;
  const open = isControlled ? externalOpen : internalOpen;
  const setOpen = isControlled ? externalOnOpenChange : setInternalOpen;

  if (!user) return null;

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        {!isControlled && children && React.Children.map(children, (child: any) => {
          return React.cloneElement(child, {
            onClick: () => setOpen(true),
          });
        })}

        <AlertDialogContent className="rounded-xl w-[95%] sm:w-full max-w-md bg-white p-0 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4 bg-gray-50/50">
            <h2 className="text-lg font-semibold text-gray-900">User Details</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-4">
                <span className="text-sm font-medium text-gray-500">Name</span>
                <span className="col-span-2 text-sm text-gray-900">{user.name || "-"}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-4">
                <span className="text-sm font-medium text-gray-500">Email</span>
                <span className="col-span-2 text-sm text-gray-900 truncate" title={user.email}>{user.email || "-"}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-4">
                <span className="text-sm font-medium text-gray-500">Role</span>
                <span className="col-span-2 text-sm text-gray-900 capitalize">{user.role || "-"}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-4">
                <span className="text-sm font-medium text-gray-500">Status</span>
                <div className="col-span-2">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${
                      user.status === "Active" || user.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.status || (user.isActive ? "Active" : "Inactive")}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <span className="text-sm font-medium text-gray-500">Joined</span>
                <span className="col-span-2 text-sm text-gray-900">{user.joined || "-"}</span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="pt-2">
              <button
                onClick={() => setOpen(false)}
                className="w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
