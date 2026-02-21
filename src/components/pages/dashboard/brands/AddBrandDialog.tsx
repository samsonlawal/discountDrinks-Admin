import React, { useState } from "react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { useCreateBrand, useUpdateBrand } from "@/hooks/api/brands";
import { FormField } from "@/components/ui/form-field";
import { FormSelect } from "@/components/ui/form-select";
import { IBrand } from "@/types";

interface AddBrandDialogProps {
  children: React.ReactNode;
  brand?: IBrand;
  onSave?: (data: any) => void;
}

export default function AddBrandDialog({
  children,
  brand,
  onSave,
}: AddBrandDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: brand?.name || "",
    status: brand?.status || "Active",
  });

  const { createBrand, loading: creating } = useCreateBrand();
  const { updateBrand, loading: updating } = useUpdateBrand();

  const loading = creating || updating;

  React.useEffect(() => {
    if (open && brand) {
      let initialStatus = "Active";
      if (brand.status) {
        initialStatus =
          brand.status.charAt(0).toUpperCase() +
          brand.status.slice(1).toLowerCase();
      }

      setFormData({
        name: brand.name || "",
        status: initialStatus,
      });
    } else if (open && !brand) {
      setFormData({
        name: "",
        status: "Active",
      });
    }
  }, [open, brand]);

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
    const payload = {
      name: formData.name,
      status: formData.status.toLowerCase(),
    };

    if (brand) {
      await updateBrand({
        data: { ...payload, id: brand.id },
        successCallback: () => {
          onSave?.(formData);
          setOpen(false);
        },
      });
    } else {
      await createBrand({
        data: payload,
        successCallback: () => {
          onSave?.(formData);
          setOpen(false);
          setFormData({
            name: "",
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

        <AlertDialogContent className="rounded-xl w-[95%] sm:w-full max-w-md bg-white">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              {brand ? "Edit Brand" : "Add Brand"}
            </h2>

            <div className="space-y-4">
              <FormField
                label="Brand Name"
                name="name"
                placeholder="Enter brand name"
                value={formData.name}
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
                {loading ? "Saving..." : brand ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
