import React, { useEffect } from "react";
import { ChevronLeft, Package, Calendar, User, Truck, DollarSign } from "lucide-react";
import { useGetOrderById } from "@/hooks/api/orders";

interface ViewOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderSummary: any;
}

export default function ViewOrderDialog({
  open,
  onOpenChange,
  orderSummary,
}: ViewOrderDialogProps) {
  const { order, fetchOrder, loading } = useGetOrderById();

  useEffect(() => {
    if (open && orderSummary?.id) {
      fetchOrder(orderSummary.id);
    }
  }, [open, orderSummary]);

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
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close dialog overlay"
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 bg-black/40 cursor-default"
      />

      {/* Sidebar spacer - 240px to match sidebar width */}
      <div className="w-[240px] shrink-0 hidden md:block relative z-10" />

      {/* Dialog Panel */}
      <div className="flex-1 h-full overflow-auto bg-white relative z-10 shadow-xl border-l border-gray-200">
        {/* Top Header */}
        <div className="sticky top-0 z-20 border-b bg-white">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Orders
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto max-w-5xl px-10 py-8">

            {/* <div className="flex items-center gap-4">
              <h1 className="text-lg font-medium text-gray-900">
                ORDER DETAILS

              </h1>
            </div> */}
          <div className="flex flex-col items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <h1 className="text-md font-medium text-gray-900">
                {/* ORDER ID: #{orderSummary?.orderId?.substring(0, 8) || "-"}... */}
                ORDER ID: #{orderSummary?.orderId || "-"}

              </h1>
              {order && (
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                    order.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "processing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status || "Pending"}
                </span>
              )}
            </div>
                                  <p className="text-sm text-gray-700">
                        {order?.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}
                      </p>
          </div>

          <div className="bg-white rounded-xl py-6 overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <span className="text-gray-500">Loading order details...</span>
              </div>
            ) : order ? (
              <div className="space-y-10">
                {/* Order Information Section */}
                {/* <section>
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2 border-b pb-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    Order Details
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Date Ordered</p>
                      <p className="font-medium text-gray-900">
                        {order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-medium text-gray-900">
                        ${(order.totalAmount || 0).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Delivery Method</p>
                      <p className="font-medium text-gray-900 capitalize">
                        {(order.deliveryMethod || "collect").replace("_", " ")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment Status</p>
                      <p className="font-medium text-gray-900 capitalize">
                        {order.paymentDetails?.status || "-"}
                      </p>
                    </div>
                  </div>
                </section> */}


                {/* Customer Information */}
                <section className="grid grid-cols-1 md:grid-cols-2 space-y-8 mb-18 gap-8">
                  <div className="flex flex-row gap-2">
                    <div className="p-2 bg-gray-100 rounded-md h-fit">
                      <User className="w-4 h-4 text-gray-400 " />
                    </div>

                  <div>
                    <h2 className="text-sm font-medium text-gray-900 uppercase tracking-wider flex items-center gap-2 pb-2">
                      Customer Details
                    </h2>
                    <div className="space-y-2">
                      <div className="flex flex-row items-center justify-start gap-1">
                        <p className="text-sm text-gray-500 w-[70px]">Name:</p>{" "}
                        <p className="text-sm text-gray-900">
                          {order.user?.name || "Guest"}
                        </p>
                      </div>
                      <div className="flex flex-row items-center justify-start gap-1">
                        <p className="text-sm text-gray-500 w-[70px]">Email:</p>{" "}
                        <p className="text-sm text-gray-900">
                          {order.user?.email || "-"}
                        </p>
                      </div>
                      <div className="flex flex-row items-center justify-start gap-1">
                        <p className="text-sm text-gray-500 w-[70px]">Phone:</p>{" "}
                        <p className="text-sm text-gray-900">
                          {order.user?.phone || "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                  </div>


                  {/* Payment Details */}
                  <div className="flex flex-row gap-2">
                    <div className="p-2 bg-gray-100 rounded-md h-fit">
                      <User className="w-4 h-4 text-gray-400 " />
                    </div>

                  <div>
                    <h2 className="text-sm font-medium text-gray-900 uppercase tracking-wider flex items-center gap-2 pb-2">
                      Payment Details
                    </h2>
                    <div className="space-y-2">
                      <div className="flex flex-row items-center justify-start gap-1">
                        <p className="text-sm text-gray-500 w-[110px]">Payment Method:</p>{" "}
                        <p className="text-sm text-gray-900 capitalize">
                          {order?.paymentMethod}
                        </p>
                      </div>
                      <div className="flex flex-row items-center justify-start gap-1">
                        <p className="text-sm text-gray-500 w-[110px]">Transaction ID:</p>{" "}
                        <p className="text-sm text-gray-900 capitalize">
                          136GF9GHY
                        </p>
                      </div>
                      <div className="flex flex-row items-center justify-start gap-1">
                        <p className="text-sm text-gray-500 w-[110px]">Payment Status:</p>{" "}
                        <p className="text-sm text-gray-900 capitalize">
                          {order?.paymentStatus}
                        </p>
                      </div>

                      <div className="flex flex-row items-center justify-start gap-1">
                        <p className="text-sm text-gray-500 w-[110px]">Tax:</p>{" "}
                        <p className="text-sm text-gray-900 capitalize">
                          ${order?.tax}
                        </p>
                      </div>

                      <div className="flex flex-row items-center justify-start gap-1">
                        <p className="text-sm text-gray-500 w-[110px]">Total Amount:</p>{" "}
                        <p className="text-sm text-gray-900 capitalize">
                          ${order?.totalAmount}
                        </p>
                      </div>
                      
                    </div>
                  </div>
                  </div>


                  {/* Shipping Address */}
                  <div className="flex flex-row gap-2">
                    <div className="p-2 bg-gray-100 rounded-md h-fit">
                      <Truck className="w-4 h-4 text-gray-400 " />
                    </div>
                  <div>
                    <h2 className="text-sm font-medium text-gray-900 uppercase tracking-wider flex items-center gap-2 pb-2">
                      Shipping Information
                    </h2>
                    <div className="space-y-3">
                      {order.shippingAddress.addressLine1 || order.shippingAddress.addressLine2 ? (
                        <div className="flex flex-row justify-start">
                          <p className="text-sm text-gray-500 w-[140px]">Shipping Address:</p>
                          <p className="text-sm text-gray-900 whitespace-pre-line mt-1">
                            {order.shippingAddress.addressLine1}{"\n"} {order.shippingAddress.city}, {order.shippingAddress.state},
                            {order.shippingAddress.postCode}, {order.shippingAddress.country}
                          </p>
                        </div>
                        
                      ) : (
                        <div>
                          <p className="text-sm text-gray-500">Method</p>
                          <p className="text-sm text-gray-900 mt-1">Collect in store</p>
                        </div>
                      )}
                        <div className="flex flex-row items-center justify-start gap-1">
                        <p className="text-sm text-gray-500 w-[140px]">Shipping Fee:</p>{" "}
                        <p className="text-sm text-gray-900 capitalize">
                          ${order?.shippingCost}
                        </p>
                      </div>
                    </div>
                  </div>
                  </div>

                </section>

                {/* Order Items */}
                <section>
                  <h2 className="text-sm font-medium text-gray-900 uppercase tracking-wider pb-2 flex items-center gap-2">
                    {/* <Package className="w-4 h-4 text-gray-400" /> */}
                    Order Items
                  </h2>
                  <div className="border rounded-lg overflow-hidden border-gray-200">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-gray-500 text-xs tracking-wider uppercase">
                          <th className="px-4 py-3 font-medium border-b border-gray-200">Product</th>
                          <th className="px-4 py-3 font-medium border-b border-gray-200 text-right">Price</th>
                          <th className="px-4 py-3 font-medium border-b border-gray-200 text-center">Qty</th>
                          <th className="px-4 py-3 font-medium border-b border-gray-200 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-sm">
                        {(order.items || []).map((item: any, idx: number) => {
                          const price = item.priceAtPurchase || item.price || 0;
                          return (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 text-gray-900 font-medium flex flex-row gap-2 items-center">
                                <img src={item?.image} alt={item?.name} className="w-6"/>
                                {item?.name || "Unknown Product"}
                              </td>
                              <td className="px-4 py-3 text-gray-500 text-right">${price.toFixed(2)}</td>
                              <td className="px-4 py-3 text-gray-500 text-center">{item.quantity}</td>
                              <td className="px-4 py-3 text-gray-900 font-medium text-right">
                                ${(item.quantity * price).toFixed(2)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr className="bg-gray-50 border-t border-gray-200">
                          <td colSpan={3} className="px-4 py-4 text-right font-medium text-gray-700">
                            Subtotal
                          </td>
                          <td className="px-4 py-4 text-right font-bold text-gray-900">
                            ${(order.totalAmount || 0).toFixed(2)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </section>
              </div>
            ) : (
              <div className="flex justify-center items-center py-12">
                <span className="text-red-500">Failed to load order details.</span>
              </div>
            )}
          </div>
          <div className="h-20" />
        </div>
      </div>
    </div>
  );
}
