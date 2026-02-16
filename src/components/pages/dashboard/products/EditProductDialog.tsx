import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, Trash2, X, Upload } from "lucide-react";
import CategoriesService from "@/services/categories";
import TagsService from "@/services/tags";
import { FormField } from "@/components/ui/form-field";
import { FormSelect } from "@/components/ui/form-select";
import { FormTextarea } from "@/components/ui/form-textarea";
import { MultiSelect } from "@/components/ui/multi-select";
import { useUpdateProduct } from "@/hooks/api/products";

const STATUS_OPTIONS = ["Active", "Inactive"];
const SHIPPING_CLASS_OPTIONS = ["Standard", "Express", "Overnight"];
const LOADING_OPTIONS = ["Loading..."];

interface EditProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: any;
  onSave?: () => void;
}

export default function EditProductDialog({
  open,
  onOpenChange,
  product,
  onSave,
}: EditProductDialogProps) {
  const [images, setImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    subCategory: "",
    status: "",
    badge: "",
    description: "",
    basePrice: "",
    costPrice: "",
    availableQuantity: "",
    lowStockThreshold: "",
    shippingWeight: "",
    shippingClass: "",
    dimensions: "",
    volume: "",
    abv: "",
    origin: "",
  });

  const brandDefaults = [
    "Château Margaux",
    "Johnnie Walker",
    "Hennessy",
    "Moët & Chandon",
  ];
  const brandOptions = React.useMemo(() => {
    return formData.brand && !brandDefaults.includes(formData.brand)
      ? [...brandDefaults, formData.brand]
      : brandDefaults;
  }, [formData.brand]);

  const originDefaults = [
    "Hamburg, Gernmany",
    "Bordeaux, France",
    "Lagos, Nigeria",
  ];
  const originOptions = React.useMemo(() => {
    return formData.origin && !originDefaults.includes(formData.origin)
      ? [...originDefaults, formData.origin]
      : originDefaults;
  }, [formData.origin]);

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

  const { updateProduct, loading } = useUpdateProduct();

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

  // Populate form data if product exists (Edit Mode)
  // Populate form data if product exists (Edit Mode)
  useEffect(() => {
    if (open && product) {
      setFormData({
        name: product.name || "",
        brand: product.brand || "",
        category: product.category || "",
        subCategory: product.subCategory || "",
        status: product.status || (product.isActive ? "active" : "inactive"),
        badge: product.badge || "",
        description: product.description || "",
        basePrice: product.basePrice?.toString() || "",
        costPrice: product.costPrice?.toString() || "",
        availableQuantity: product.availableQuantity?.toString() || "",
        lowStockThreshold: product.lowStockThreshold?.toString() || "",
        shippingWeight: product.shippingWeight?.toString() || "",
        shippingClass: product.shippingClass || "",
        dimensions: product.dimensions || "",
        volume: product.specifications?.volume || "",
        abv: product.specifications?.abv || "",
        origin: product.specifications?.origin || "",
      });
      setSelectedTags(product.tags || []);
      setImages(product.images || []);
    }
  }, [open, product]);

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

  const handleSave = async () => {
    const productData = {
      name: formData.name,
      brand: formData.brand,
      category: formData.category,
      subCategory: formData.subCategory,
      status: formData.status.toLowerCase(),
      badge: formData.badge,
      tags: selectedTags,
      description: formData.description,
      basePrice: parseFloat(formData.basePrice) || 0,
      costPrice: parseFloat(formData.costPrice) || 0,
      availableQuantity: parseInt(formData.availableQuantity) || 0,
      lowStockThreshold: parseInt(formData.lowStockThreshold) || 10,
      shippingWeight: parseFloat(formData.shippingWeight) || 0,
      shippingClass: (formData.shippingClass || "standard").toLowerCase(),
      dimensions: formData.dimensions,
      images: images,
      specifications: {
        volume: formData.volume,
        abv: formData.abv,
        origin: formData.origin,
      },
    };

    if (product) {
      await updateProduct({
        data: { id: product._id, ...productData },
        successCallback: () => {
          onSave?.();
          onOpenChange(false);
        },
      });
    }
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
                  onClick={handleSave}
                  disabled={loading}
                  className="h-9 rounded-lg bg-black px-4 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Update Product"}
                </button>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="mx-auto max-w-7xl px-6 py-6">
            <h1 className="text-xl font-semibold text-gray-900">
              {product ? "Edit Product" : "Product Details"}
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
                      name="name"
                      placeholder="Château Margaux"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    <FormSelect
                      label="Brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleSelectChange}
                      options={brandOptions}
                    />
                    <FormSelect
                      label="Category"
                      name="category"
                      value={formData.category}
                      onChange={handleSelectChange}
                      options={
                        categories.length > 0 ? categories : ["Loading..."]
                      }
                    />
                    <FormSelect
                      label="Sub-Category"
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleSelectChange}
                      options={
                        categories.length > 0 ? categories : ["Loading..."]
                      }
                    />
                    <FormSelect
                      label="Status"
                      name="status"
                      value={formData.status}
                      onChange={handleSelectChange}
                      options={STATUS_OPTIONS}
                    />
                    <FormSelect
                      label="Badge"
                      name="badge"
                      value={formData.badge}
                      onChange={handleSelectChange}
                      options={tags.length > 0 ? tags : LOADING_OPTIONS}
                    />
                  </div>

                  <div className="mt-4 mb-4">
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
                    name="description"
                    placeholder="Write product description..."
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </section>

                {/* Pricing & Inventory */}
                <section className="rounded-xl border bg-white p-5">
                  <h2 className="text-sm font-semibold text-gray-900">
                    Pricing & Inventory
                  </h2>

                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      label="Base Price ($)"
                      name="basePrice"
                      placeholder="4.99"
                      value={formData.basePrice}
                      onChange={handleInputChange}
                    />
                    <FormField
                      label="Cost Price ($)"
                      name="costPrice"
                      placeholder="2.99"
                      value={formData.costPrice}
                      onChange={handleInputChange}
                    />
                    <FormField
                      label="Available Quantity"
                      name="availableQuantity"
                      placeholder="200"
                      value={formData.availableQuantity}
                      onChange={handleInputChange}
                    />
                    <FormField
                      label="Low Stock Threshold"
                      name="lowStockThreshold"
                      placeholder="20"
                      value={formData.lowStockThreshold}
                      onChange={handleInputChange}
                    />
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
                      name="shippingWeight"
                      placeholder="0.65"
                      value={formData.shippingWeight}
                      onChange={handleInputChange}
                    />
                    <FormSelect
                      label="Shipping Class"
                      name="shippingClass"
                      value={formData.shippingClass}
                      onChange={handleSelectChange}
                      options={SHIPPING_CLASS_OPTIONS}
                    />
                    <FormField
                      label="Dimensions for Box"
                      name="dimensions"
                      placeholder="20 × 15 × 25 cm"
                      value={formData.dimensions}
                      onChange={handleInputChange}
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
                    <FormField
                      label="Volume (ml)"
                      name="volume"
                      placeholder="750ml"
                      value={formData.volume}
                      onChange={handleInputChange}
                    />
                    <FormField
                      label="AVB (%)"
                      name="abv"
                      placeholder="20%"
                      value={formData.abv}
                      onChange={handleInputChange}
                    />
                    <FormSelect
                      label="Origin"
                      name="origin"
                      value={formData.origin}
                      onChange={handleSelectChange}
                      options={originOptions}
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
