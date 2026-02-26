import React, { useEffect, useState } from "react";
import { ChevronLeft, Package, Tag, DollarSign, Weight, CheckCircle, XCircle } from "lucide-react";

interface ViewProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: any;
}

export default function ViewProductDialog({
  open,
  onOpenChange,
  product,
}: ViewProductDialogProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

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

  if (!open || !product) return null;

  const isActive = product.status?.toLowerCase() === "active" || product.isActive;

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
              Back to Products
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto max-w-7xl px-10 py-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-medium text-gray-900">{product.name || "-"}</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 px-2">
            {/* LEFT SIDE - Details */}
            <div className="lg:col-span-3 space-y-10">
              {/* Product Information */}
              <section className="bg-transparent">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-400" />
                  Product Information
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="w-32 text-sm text-gray-500">Product ID</span>
                    <span className="text-sm text-gray-900">{product._id || "-"}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-32 text-sm text-gray-500">Brand Name</span>
                    <span className="text-sm text-gray-900">{product.brand || "-"}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-32 text-sm text-gray-500">Category</span>
                    <span className="text-sm text-gray-900">{product.category || "-"}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-32 text-sm text-gray-500">Sub-Category</span>
                    <span className="text-sm text-gray-900">{product.subCategory || "-"}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-32 text-sm text-gray-500">Badge</span>
                    <span className="text-sm text-gray-900">{product.badge || "-"}</span>
                  </div>
                </div>

                <div className="mt-2.5">
                  <div className="flex items-start gap-4">
                    <span className="w-32 shrink-0 text-sm text-gray-500 mt-0.5">Description</span>
                    <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">
                      {product.description || "No description available."}
                    </p>
                  </div>
                </div>
                
                {product.tags && product.tags.length > 0 && (
                  <div className="mt-2.5">
                    <div className="flex items-start gap-4">
                      <span className="w-32 shrink-0 text-sm text-gray-500 mt-0.5">Tags</span>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag: string, index: number) => (
                          <span key={index} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Pricing & Inventory */}
              <section className="bg-transparent">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  Pricing & Inventory
                </h2>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-4">
                    <span className="w-32 text-sm text-gray-500">Base Price</span>
                    <span className="text-sm text-gray-900">${product.basePrice || "0.00"}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-32 text-sm text-gray-500">Cost Price</span>
                    <span className="text-sm text-gray-900">${product.costPrice || "0.00"}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-32 text-sm text-gray-500">Stock</span>
                    <span className={`text-sm ${
                      (product.availableQuantity || 0) <= (product.lowStockThreshold || 0)
                        ? 'text-red-500'
                        : 'text-green-600'
                    }`}>
                      {product.availableQuantity || 0} units
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-32 text-sm text-gray-500">Low Stock Alert</span>
                    <span className="text-sm text-gray-900">At {product.lowStockThreshold || 10} units</span>
                  </div>
                </div>
              </section>

              {/* Shipping & Specs */}
              <div className="grid grid-cols-1 gap-10">
                <section className="bg-transparent">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Weight className="w-4 h-4 text-gray-400" />
                    Shipping
                  </h2>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-4">
                      <span className="w-32 text-sm text-gray-500">Weight</span>
                      <span className="text-sm text-gray-900">{product.shippingWeight || 0} kg</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-32 text-sm text-gray-500">Class</span>
                      <span className="text-sm text-gray-900 capitalize">{product.shippingClass || "-"}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-32 text-sm text-gray-500">Dimensions</span>
                      <span className="text-sm text-gray-900">{product.dimensions || "-"}</span>
                    </div>
                  </div>
                </section>

                <section className="bg-transparent">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                    Specifications
                  </h2>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-4">
                      <span className="w-32 text-sm text-gray-500">Volume</span>
                      <span className="text-sm text-gray-900">{product.specifications?.volume || "-"}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-32 text-sm text-gray-500">ABV</span>
                      <span className="text-sm text-gray-900">{product.specifications?.abv || "-"}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-32 text-sm text-gray-500">Origin</span>
                      <span className="text-sm text-gray-900">{product.specifications?.origin || "-"}</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* RIGHT SIDE - Images */}
            <div className="lg:col-span-2 space-y-6">
              <section className="bg-transparent sticky top-24">
                <div className="w-4/5 mx-auto">
                <h2 className="text-sm-bold text-gray-900 uppercase tracking-wider mb-5">
                  Images
                </h2>
                </div>

                {product.images && product.images.length > 0 ? (
                  <div className="space-y-3 w-4/5 mx-auto">
                    {/* Main Image */}
                    <div className="aspect-square rounded-xl border border-gray-200 overflow-hidden bg-white p-4">
                      <img
                        src={product.images[selectedImageIdx]}
                        alt={`${product.name} - Image ${selectedImageIdx + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <div className="text-xs text-center text-gray-500 font-medium">
                      Image {selectedImageIdx + 1} of {product.images.length}
                    </div>

                    {/* 5 Thumbnail Boxes */}
                    <div className="grid grid-cols-5 gap-2">
                      {Array.from({ length: 5 }).map((_, idx) => {
                        const hasImage = idx < product.images.length;
                        const isSelected = selectedImageIdx === idx;
                        
                        return (
                          <div 
                            key={idx} 
                            onClick={() => hasImage && setSelectedImageIdx(idx)}
                            className={`aspect-square rounded-lg border overflow-hidden ${
                              hasImage ? 'bg-white cursor-pointer hover:border-gray-300' : 'bg-gray-100 border-dashed border-gray-200 cursor-default'
                            } ${
                              isSelected ? 'border-gray-900 ring-1 ring-gray-900' : 'border-gray-200'
                            }`}
                          >
                            {hasImage && (
                              <img
                                src={product.images[idx]}
                                alt={`Thumbnail ${idx + 1}`}
                                className={`w-full h-full object-cover transition-opacity ${isSelected ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center flex-col text-gray-400">
                    <Package className="w-12 h-12 mb-2 opacity-20" />
                    <span className="text-sm font-medium">No images</span>
                  </div>
                )}
              </section>
            </div>
          </div>

          <div className="h-10" />
        </div>
      </div>
    </div>
  );
}
