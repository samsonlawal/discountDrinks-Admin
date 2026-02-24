import React, { useEffect } from "react";
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
            
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                {isActive ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{product.name || "-"}</h1>
              <p className="text-gray-500 mt-1">{product.brand || "No Brand"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* LEFT SIDE - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Information */}
              <section className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5 flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-400" />
                  Product Information
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                  <div>
                    <span className="block text-xs font-medium text-gray-500 mb-1">Category</span>
                    <span className="text-sm text-gray-900">{product.category || "-"}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-500 mb-1">Sub-Category</span>
                    <span className="text-sm text-gray-900">{product.subCategory || "-"}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-500 mb-1">Badge</span>
                    <span className="text-sm text-gray-900">{product.badge || "-"}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="block text-xs font-medium text-gray-500 mb-2">Description</span>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {product.description || "No description available."}
                  </p>
                </div>
                
                {product.tags && product.tags.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <span className="block text-xs font-medium text-gray-500 mb-2">Tags</span>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag: string, index: number) => (
                        <span key={index} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200">
                          <Tag className="w-3 h-3 text-gray-400" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Pricing & Inventory */}
              <section className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  Pricing & Inventory
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4">
                  <div>
                    <span className="block text-xs font-medium text-gray-500 mb-1">Base Price</span>
                    <span className="text-lg text-gray-900">${product.basePrice || "0.00"}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-500 mb-1">Cost Price</span>
                    <span className="text-sm text-gray-600">${product.costPrice || "0.00"}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-500 mb-1">Stock</span>
                    <span className={`text-sm ${
                      (product.availableQuantity || 0) <= (product.lowStockThreshold || 0)
                        ? 'text-red-600'
                        : 'text-green-600'
                    }`}>
                      {product.availableQuantity || 0} units
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-500 mb-1">Low Stock Alert</span>
                    <span className="text-sm text-gray-600">At {product.lowStockThreshold || 10} units</span>
                  </div>
                </div>
              </section>

              {/* Shipping & Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="rounded-xl border bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5 flex items-center gap-2">
                    <Weight className="w-4 h-4 text-gray-400" />
                    Shipping
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                      <span className="text-sm text-gray-500">Weight</span>
                      <span className="text-sm text-gray-900">{product.shippingWeight || 0} kg</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                      <span className="text-sm text-gray-500">Class</span>
                      <span className="text-sm text-gray-900 capitalize">{product.shippingClass || "-"}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-sm text-gray-500">Dimensions</span>
                      <span className="text-sm text-gray-900">{product.dimensions || "-"}</span>
                    </div>
                  </div>
                </section>

                <section className="rounded-xl border bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">
                    Specifications
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                      <span className="text-sm text-gray-500">Volume</span>
                      <span className="text-sm text-gray-900">{product.specifications?.volume || "-"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                      <span className="text-sm text-gray-500">ABV</span>
                      <span className="text-sm text-gray-900">{product.specifications?.abv || "-"}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-sm text-gray-500">Origin</span>
                      <span className="text-sm text-gray-900">{product.specifications?.origin || "-"}</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* RIGHT SIDE - Images */}
            <div className="space-y-6">
              <section className="rounded-xl border bg-white p-6 shadow-sm sticky top-24">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">
                  Images
                </h2>

                {product.images && product.images.length > 0 ? (
                  <div className="space-y-3">
                    {/* Main Image */}
                    <div className="aspect-square rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Thumbnails */}
                    {product.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {product.images.slice(1).map((img: string, idx: number) => (
                          <div key={idx} className="aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                            <img
                              src={img}
                              alt={`${product.name} - ${idx + 2}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
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
