import React, { useState } from "react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { useCreateTag } from "@/hooks/api/tags";
import TagsService from "@/services/tags";

interface AddTagDialogProps {
  children: React.ReactNode;
  tag?: any;
  onSave?: (data: any) => void;
}

export default function AddTagDialog({
  children,
  tag,
  onSave,
}: AddTagDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: tag?.name || "",
    type: tag?.type || 1,
    status: tag?.status || "Active",
  });

  const { createTag, loading } = useCreateTag({ Service: TagsService });

  const handleSave = async () => {
    await createTag({
      data: {
        name: formData.name,
        type: Number(formData.type),
        status: formData.status,
      },
      successCallback: () => {
        onSave?.(formData);
        setOpen(false);
        // Reset form
        setFormData({
          name: "",
          type: 1,
          status: "Active",
        });
      },
    });
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        {React.Children.map(children, (child: any) => {
          return React.cloneElement(child, {
            onClick: () => setOpen(true),
          });
        })}

        <AlertDialogContent className="sm:rounded-[24px] max-w-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {tag ? "Edit Tag" : "Add Tag"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tag Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tag name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <input
                  type="number"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tag type"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-[#111111] text-white rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {loading ? "Saving..." : tag ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
