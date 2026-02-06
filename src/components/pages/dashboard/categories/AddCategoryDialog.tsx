import React, { useState } from "react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { useCreateCategory } from "@/hooks/api/categories";
import CategoriesService from "@/services/categories";

interface AddCategoryDialogProps {
  children: React.ReactNode;
  category?: any;
  onSave?: (data: any) => void;
}

export default function AddCategoryDialog({
  children,
  category,
  onSave,
}: AddCategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: category?.name || "",
    description: category?.description || "",
    status: category?.status || "Active",
  });

  const { createCategory, loading } = useCreateCategory({
    Service: CategoriesService,
  });

  const handleSave = async () => {
    await createCategory({
      data: {
        name: formData.name,
        description: formData.description,
        status: formData.status,
      },
      successCallback: () => {
        onSave?.(formData);
        setOpen(false);
        // Reset form
        setFormData({
          name: "",
          description: "",
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
              {category ? "Edit Category" : "Add Category"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
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
                {loading ? "Saving..." : category ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
