import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, Trash2, X, Upload } from "lucide-react";
import CategoriesService from "@/services/categories";
import TagsService from "@/services/tags";
import { FormField } from "@/components/ui/form-field";
import { FormSelect } from "@/components/ui/form-select";
import { FormTextarea } from "@/components/ui/form-textarea";
import { MultiSelect } from "@/components/ui/multi-select";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddProductDialog({
  open,
  onOpenChange,
}: AddProductDialogProps) {
  const [images, setImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch categories and tags
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await CategoriesService.fetchCategories();
        if (categoriesResponse.data?.success && categoriesResponse.data?.data) {
          const categoryNames = categoriesResponse.data.data.map(
            (cat: any) => cat.name,
          );
          setCategories(categoryNames);
        }

        // Fetch tags
        const tagsResponse = await TagsService.fetchTags();
        if (tagsResponse.data?.success && tagsResponse.data?.data) {
          const tagNames = tagsResponse.data.data.map((tag: any) => tag.name);
          setTags(tagNames);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    if (open) {
      loadData();
    }
  }, [open]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result as string);
            if (newImages.length === files.length) {
              setImages((prev) => [...prev, ...newImages].slice(0, 5));
            }
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <button
        aria-label="Close dialog overlay"
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 bg-black/40"
      />

      {/* Dialog wrapper */}
      <div className="relative h-full w-full flex">
        {/* Sidebar spacer - 240px to match sidebar width */}
        <div className="w-[240px] shrink-0 hidden md:block" />

        {/* Dialog Panel */}
        <div className="flex-1 h-full overflow-auto bg-gray-50">
          {/* Top Header */}
          <div className="sticky top-0 z-20 border-b bg-white">
            <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Inventory
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="h-9 w-9 grid place-items-center rounded-lg border hover:bg-gray-50"
                >
                  <Trash2 className="h-4 w-4 text-gray-600" />
                </button>

                <button
                  type="button"
                  className="h-9 rounded-lg bg-black px-4 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Save
                </button>

                {/* Close icon */}
                {/* <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="ml-2 h-9 w-9 grid place-items-center rounded-lg hover:bg-gray-50"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button> */}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="mx-auto max-w-7xl px-6 py-6">
            <h1 className="text-xl font-semibold text-gray-900">
              Add New Product
            </h1>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* LEFT */}
              <div className="lg:col-span-2 space-y-6">
                {/* Product Information */}
                <section className="rounded-xl border bg-white p-5">
                  <h2 className="text-sm font-semibold text-gray-900">
                    Product Information
                  </h2>

                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      label="Product Name"
                      placeholder="Château Margaux"
                    />
                    {/* <Field
                      label="Product ID"
                      placeholder="PRD-MARG-750-2025"
                    /> */}
                    {/* <Field label="SKU" placeholder="WINE-MARG-750" /> */}
                    <FormSelect
                      label="Brand"
                      options={[
                        "Château Margaux",
                        "Johnnie Walker",
                        "Hennessy",
                        "Moët & Chandon",
                      ]}
                    />
                    <FormSelect
                      label="Category"
                      options={
                        categories.length > 0 ? categories : ["Loading..."]
                      }
                    />
                    <FormSelect
                      label="Sub-Category"
                      options={
                        categories.length > 0 ? categories : ["Loading..."]
                      }
                    />
                    <FormSelect
                      label="Status"
                      options={["Active", "Inactive"]}
                    />
                    <FormSelect
                      label="Badge"
                      options={tags.length > 0 ? tags : ["Loading..."]}
                    />
                  </div>

                  <div className="mt-4">
                    <MultiSelect
                      label="Tags"
                      placeholder="Select tag(s)"
                      availableOptions={tags}
                      selectedOptions={selectedTags}
                      onOptionsChange={setSelectedTags}
                    />
                  </div>

                  <FormTextarea
                    label="Description"
                    placeholder="Write product description..."
                  />
                </section>

                {/* Pricing & Inventory */}
                <section className="rounded-xl border bg-white p-5">
                  <h2 className="text-sm font-semibold text-gray-900">
                    Pricing & Inventory
                  </h2>

                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField label="Base Price ($)" placeholder="4.99" />
                    <FormField label="Cost Price ($)" placeholder="2.99" />
                    <FormField label="Available Quantity" placeholder="200" />
                    <FormField label="Low Stock Threshold" placeholder="20" />
                    {/* <SelectField
                      label="In-Stock"
                      options={["True", "False"]}
                    /> */}

                    {/* <SelectField
                      label="Inventory Location"
                      options={["Main Warehouse", "Store 1", "Store 2"]}
                    /> */}
                  </div>
                </section>

                {/* Shipping */}
                <section className="rounded-xl border bg-white p-5">
                  <h2 className="text-sm font-semibold text-gray-900">
                    Shipping & Logistics
                  </h2>

                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      label="Shipping Weight (kg)"
                      placeholder="0.65"
                    />
                    <FormSelect
                      label="Shipping Class"
                      options={["Standard", "Fragile"]}
                    />
                    <FormField
                      label="Dimensions for Box"
                      placeholder="20 × 15 × 25 cm"
                    />
                  </div>
                </section>
              </div>

              {/* RIGHT */}
              <div className="space-y-6">
                {/* Product Image */}
                <section className="rounded-xl border bg-white p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-gray-900">
                      Product Images
                    </h2>
                    <button
                      type="button"
                      onClick={handleUploadClick}
                      className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      Upload
                    </button>
                  </div>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {/* Image preview boxes */}
                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg border border-gray-200 relative group"
                      >
                        {images[index] ? (
                          <>
                            <img
                              src={images[index]}
                              alt={`Product ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg overflow-hidden"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center hover:bg-red-600 shadow-md"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={handleUploadClick}
                            className="w-full h-full bg-gray-50 hover:bg-gray-100 transition-colors grid place-items-center"
                          >
                            <Upload className="h-4 w-4 text-gray-400" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <p className="mt-3 text-xs text-gray-500">
                    Upload up to 5 images. Only jpeg, jpg, png with minimum size
                    of 500 × 500px.
                  </p>
                </section>

                {/* Specs */}
                <section className="rounded-xl border bg-white p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-gray-900">
                      Specifications
                    </h2>
                    <button
                      type="button"
                      className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                    >
                      + Add Spec
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField label="Volume (ml)" placeholder="750ml" />
                    <FormField label="AVB (%)" placeholder="20%" />
                    <FormSelect
                      label="Origin"
                      options={[
                        "Hamburg, Gernmany",
                        "Bordeaux, France",
                        "Lagos, Nigeria",
                      ]}
                    />
                  </div>
                </section>
              </div>
            </div>

            <div className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
