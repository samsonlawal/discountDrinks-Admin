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
import { X } from "lucide-react";

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
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [currentSubCategory, setCurrentSubCategory] = useState("");

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
      setSubCategories(category.subCategories || []);
    } else if (open && !category) {
      setFormData({
        name: "",
        description: "",
        status: "",
      });
      setSubCategories([]);
    }
    setCurrentSubCategory("");
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

  const handleAddSubCategory = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = currentSubCategory.trim();
      if (value && !subCategories.includes(value)) {
        setSubCategories([...subCategories, value]);
      }
      setCurrentSubCategory("");
    }
  };

  const removeSubCategory = (subCatToRemove: string) => {
    setSubCategories(subCategories.filter((sc) => sc !== subCatToRemove));
  };

  const handleSave = async () => {
    const categoryId = category?.id || category?._id;

    if (categoryId) {
      // Update existing category
      await updateCategory({
        data: {
          id: categoryId,
          name: formData.name,
          description: formData.description,
          subCategories,
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
          subCategories,
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
          setSubCategories([]);
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

        <AlertDialogContent className="rounded-xl w-[95%] sm:w-full max-w-140 bg-white">
          <div className="p-4 md:p-4">
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

              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-600">
                  Sub-Categories
                </label>
                <div className="w-full min-h-[42px] p-2 rounded-lg border border-gray-300 bg-white flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-black focus-within:border-transparent transition-all">
                  {subCategories.map((sc) => (
                    <span
                      key={sc}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 text-xs font-medium border border-gray-200"
                    >
                      {sc}
                      <button
                        type="button"
                        onClick={() => removeSubCategory(sc)}
                        className="p-0.5 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={currentSubCategory}
                    onChange={(e) => setCurrentSubCategory(e.target.value)}
                    onKeyDown={handleAddSubCategory}
                    placeholder={subCategories.length === 0 ? "Type and press enter to add..." : ""}
                    className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                <p className="text-[10px] text-gray-500">Press Enter or comma to add a sub-category</p>
              </div>

              <FormSelect
                label="Status"
                name="status"
                placeholder="Active or Inactive"
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
