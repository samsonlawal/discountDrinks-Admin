import React, { useState, useEffect } from "react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { useCreateCategory, useUpdateCategory } from "@/hooks/api/categories";
import CategoriesService from "@/services/categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/ui/form-field";
import { FormSelect } from "@/components/ui/form-select";
import { FormTextarea } from "@/components/ui/form-textarea";

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
    name: "",
    description: "",
    status: "",
  });

  const { createCategory, loading: createLoading } = useCreateCategory();
  const { updateCategory, loading: updateLoading } = useUpdateCategory();
  const loading = createLoading || updateLoading;

  // Update form when category prop changes or dialog opens
  useEffect(() => {
    if (open && category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        status: category.status ? category.status.toLowerCase() : "",
      });
    } else if (open && !category) {
      setFormData({
        name: "",
        description: "",
        status: "",
      });
    }
  }, [open, category]);

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleSelectChange = React.useCallback(
    (name: string, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleSave = async () => {
    const categoryId = category?.id || category?._id;

    if (categoryId) {
      // Update existing category
      await updateCategory({
        data: {
          id: categoryId,
          name: formData.name,
          description: formData.description,
          status: formData.status.toLowerCase(),
        },
        successCallback: () => {
          onSave?.(formData);
          setOpen(false);
        },
      });
    } else {
      // Create new category
      await createCategory({
        data: {
          name: formData.name,
          description: formData.description,
          status: formData.status.toLowerCase(),
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
    }
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        {React.Children.map(children, (child: any) => {
          return React.cloneElement(child, {
            onClick: () => setOpen(true),
          });
        })}

        <AlertDialogContent className="rounded-xl w-[95%] sm:w-full max-w-112.5 bg-white">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              {category ? "Edit Category" : "Add Category"}
            </h2>

            <div className="space-y-4">
              <FormField
                label="Category Name"
                name="name"
                placeholder="Enter category name"
                value={formData.name}
                onChange={handleInputChange}
              />

              <FormTextarea
                label="Description"
                name="description"
                placeholder="Enter description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
              />

              <FormSelect
                label="Status"
                name="status"
                placeholder="Active/Inactive"
                value={formData.status}
                onChange={handleSelectChange}
                options={["Active", "Inactive"]}
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 font-medium"
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
