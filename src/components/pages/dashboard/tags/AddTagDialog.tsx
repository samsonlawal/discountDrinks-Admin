import React, { useState } from "react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { useCreateTag, useUpdateTag } from "@/hooks/api/tags";
import TagsService from "@/services/tags";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/ui/form-field";
import { FormSelect } from "@/components/ui/form-select";

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
    status: tag?.status || (tag?.isActive ? "Active" : "Inactive") || "",
  });

  const { createTag, loading: creating } = useCreateTag();
  const { updateTag, loading: updating } = useUpdateTag();

  const loading = creating || updating;

  React.useEffect(() => {
    if (open && tag) {
      let initialStatus = "Active";
      if (tag.status) {
        initialStatus =
          tag.status.charAt(0).toUpperCase() +
          tag.status.slice(1).toLowerCase();
      } else if (typeof tag.isActive === "boolean") {
        initialStatus = tag.isActive ? "Active" : "Inactive";
      }

      setFormData({
        name: tag.name || "",
        status: initialStatus,
      });
    } else if (open && !tag) {
      setFormData({
        name: "",
        status: "Active",
      });
    }
  }, [open, tag]);

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

    if (tag) {
      await updateTag({
        data: { ...payload, id: tag.id || tag._id || tag.tagID },
        successCallback: () => {
          onSave?.(formData);
          setOpen(false);
        },
      });
    } else {
      console.log();
      await createTag({
        data: payload,
        successCallback: () => {
          onSave?.(formData);
          setOpen(false);
          setFormData({
            name: "",
            status: "active",
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
              {tag ? "Edit Tag" : "Add Tag"}
            </h2>

            <div className="space-y-4">
              <FormField
                label="Tag Name"
                name="name"
                placeholder="Enter tag name"
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
                {loading ? "Saving..." : tag ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
