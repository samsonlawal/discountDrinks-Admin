import React, { useEffect } from "react";
import { ChevronLeft, Package, Calendar, User, Truck, PoundSterling, Activity, Loader2 } from "lucide-react";
import { useGetOrderById, useUpdateOrderStatus } from "@/hooks/api/orders";
import { showSuccessToast } from "@/utils/toaster";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const { updateStatus, loading: updating } = useUpdateOrderStatus();

  const timelineSteps = [
    { label: "Payment Received", status: "pending" },
    { label: "Preparing Order", status: "processing" },
    { label: "Dispatched", status: "dispatched" },
    { label: "On its way", status: "shipped" },
    { label: "Delivered", status: "delivered" },
  ];

  const status = order?.status?.toLowerCase() || "pending";
  const currentIndex = timelineSteps.findIndex(s => s.status === status);
  const nextStep = currentIndex < timelineSteps.length - 1 ? timelineSteps[currentIndex + 1] : null;

  const handleAdvanceStatus = async () => {
    if (!nextStep || !order?._id) return;
    const res = await updateStatus({ id: order._id, status: nextStep.status });
    if (res) {
      showSuccessToast({ message: `Order advanced to: ${nextStep.label}` });
      fetchOrder(order._id);
    }
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (!order?._id) return;
    const res = await updateStatus({ id: order._id, status: newStatus });
    if (res) {
      const label = timelineSteps.find(s => s.status === newStatus)?.label || newStatus;
      showSuccessToast({ message: `Status updated to: ${label}` });
      fetchOrder(order._id);
    }
  };

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
        <div className="mx-auto max-w-6xl px-10 py-8 ">

            {/* <div className="flex items-center gap-4">
              <h1 className="text-lg font-medium text-gray-900">
                ORDER DETAILS

              </h1>
            </div> */}
          <div className="flex flex-col items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <h1 className="text-md font-medium text-gray-900">
                {/* ORDER ID: #{orderSummary?.orderId?.substring(0, 8) || "-"}... */}
                ORDER ID: #{orderSummary?.orderId || "-"}

              </h1>
              {order && (
                <span
                  className={`px-2.5 py-0.5 rounded-sm text-xs capitalize ${
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
                    <PoundSterling className="w-4 h-4 text-gray-400" />
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
                        £{(order.totalAmount || 0).toFixed(2)}
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


                {/* Customer Information */}                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 items-start">
                  {/* Left Column - Details Stack */}
                  <div className="lg:col-span-3 space-y-4">
                    
                    {/* Customer Information Box */}
                    <div className="bg-white border border-gray-100 rounded-sm overflow-hidden">
                      <div className="px-4 py-2 border-b bg-gray-50 border-gray-100 flex items-center gap-2">
                        <User size={16} strokeWidth={1.5} className="text-gray-400" />
                        <h3 className="text-[12px] font-medium text-gray-900 uppercase tracking-widest">Customer Details</h3>
                      </div>
                      <div className="p-6">
                        <div className="space-y-3">
                          <div className="flex flex-row items-center justify-start gap-1">
                            <p className="text-sm text-gray-500 w-[80px]">Name:</p>{" "}
                            <p className="text-sm text-gray-900">
                              {order.user?.name || "Guest"}
                            </p>
                          </div>
                          <div className="flex flex-row items-center justify-start gap-1">
                            <p className="text-sm text-gray-500 w-[80px]">Email:</p>{" "}
                            <p className="text-sm text-gray-900">
                              {order.user?.email || "-"}
                            </p>
                          </div>
                          <div className="flex flex-row items-center justify-start gap-1">
                            <p className="text-sm text-gray-500 w-[80px]">Phone:</p>{" "}
                            <p className="text-sm text-gray-900">
                              {order.user?.phone || "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Details Box */}
                    <div className="bg-white border border-gray-100 rounded-sm overflow-hidden">
                      <div className="px-4 py-2 border-b bg-gray-50 border-gray-100 flex items-center gap-2">
                        <PoundSterling size={16} strokeWidth={1.5} className="text-gray-400" />
                        <h3 className="text-[12px] font-medium text-gray-900 uppercase tracking-widest">Payment Details</h3>
                      </div>
                      <div className="p-6">
                        <div className="space-y-3">
                          <div className="flex flex-row items-center justify-start gap-1">
                            <p className="text-sm text-gray-500 w-[120px]">Payment Method:</p>{" "}
                            <p className="text-sm text-gray-900 capitalize">
                              {order?.paymentMethod || "-"}
                            </p>
                          </div>
                          <div className="flex flex-row items-center justify-start gap-1">
                            <p className="text-sm text-gray-500 w-[120px]">Transaction ID:</p>{" "}
                            <p className="text-sm text-gray-900">
                              {order?.paymentDetails?.transactionId || "-"}
                            </p>
                          </div>
                          <div className="flex flex-row items-center justify-start gap-1">
                            <p className="text-sm text-gray-500 w-[120px]">Payment Status:</p>{" "}
                            <span className={`text-xs px-2 py-0.5 rounded-sm capitalize ${
                              order?.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {order?.paymentStatus || "Pending"}
                            </span>
                          </div>
                          <div className="flex flex-row items-center justify-start gap-1 ">
                            <p className="text-sm text-gray-500 w-[120px]">Tax:</p>{" "}
                            <p className="text-sm text-gray-900">
                              £{Number(order?.tax || 0).toFixed(2)}
                            </p>
                          </div>
                          <div className="flex flex-row items-center justify-start gap-1">
                            <p className="text-sm text-gray-500 w-[120px]">Total Amount:</p>{" "}
                            <p className="text-sm text-gray-900 text-lg">
                              £{Number(order?.totalAmount || 0).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address Box */}
                    <div className="bg-white border border-gray-100 rounded-sm overflow-hidden">
                      <div className="px-4 py-2 border-b bg-gray-50 border-gray-100 flex items-center gap-2">
                        <Truck size={16} strokeWidth={1.5} className="text-gray-400" />
                        <h3 className="text-[12px] font-medium text-gray-900 uppercase tracking-widest">Shipping Information</h3>
                      </div>
                      <div className="p-6">
                        <div className="space-y-4">
                          {order.shippingAddress?.addressLine1 ? (
                            <div className="flex flex-row justify-start gap-2">
                              <p className="text-sm text-gray-500 w-[120px] shrink-0">Address:</p>
                              <div className="text-sm text-gray-900 leading-relaxed">
                                {order.shippingAddress.addressLine1}
                                {order.shippingAddress.addressLine2 && <><br />{order.shippingAddress.addressLine2}</>}
                                <br />{order.shippingAddress.city}, {order.shippingAddress.postCode}
                                <br />{order.shippingAddress.country}
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-row items-center gap-2">
                              <p className="text-sm text-gray-500 w-[120px]">Method:</p>
                              <p className="text-sm text-gray-900 capitalize">
                                {order.deliveryMethod || "collect"}
                              </p>
                            </div>
                          )}
                          <div className="flex flex-row items-center justify-start gap-1">
                            <p className="text-sm text-gray-500 w-[120px]">Shipping Fee:</p>{" "}
                            <p className="text-sm text-gray-900">
                              £{Number(order?.shippingCost || 0).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Order Management Box */}
                  <div className="lg:col-span-3">
                    <div className="bg-white border border-gray-100 rounded-sm overflow-hidden sticky top-0">
                      <div className="px-5 py-3 border-b bg-gray-50 border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Activity size={18} strokeWidth={1.5} className="text-gray-400" />
                          <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest">Order Management</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          {updating && <Loader2 className="w-3 h-3 animate-spin text-gray-400" />}
                          <Select
                            disabled={updating}
                            value={status}
                            onValueChange={handleUpdateStatus}
                          >
                            <SelectTrigger className="h-8 w-max min-w-[140px] border-gray-200 text-[10px] font-bold uppercase tracking-widest bg-white">
                              <SelectValue placeholder="Update Status" />
                            </SelectTrigger>
                            <SelectContent>
                              {timelineSteps.map((step) => (
                                <SelectItem 
                                  key={step.status} 
                                  value={step.status}
                                  className="text-[10px] font-bold uppercase tracking-widest"
                                >
                                  {step.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="p-10">
                        <div className="flex flex-col gap-0 relative">
                          {timelineSteps.map((step, index) => {
                            const isPastOrActive = index <= currentIndex;
                            const isSegmentActive = index < currentIndex;

                            return (
                              <div key={index} className="flex items-start gap-5 relative min-h-[70px] last:min-h-0 group">
                                {index < timelineSteps.length - 1 && (
                                  <div className="absolute top-2.5 left-2.5 w-0.5 h-[calc(100%-10px)] z-0">
                                    <div className="h-full w-full bg-gray-50" />
                                    <div 
                                      className="absolute top-0 left-0 w-full bg-black transition-all duration-1000 ease-out" 
                                      style={{ height: isSegmentActive ? '100%': '0%' }}
                                    />
                                  </div>
                                )}

                                <div className={`flex items-center justify-center w-5 h-5 rounded-full transition-all duration-500 relative z-10 flex-shrink-0 ${
                                  isPastOrActive ? "bg-black" : "bg-white border-2 border-gray-100"
                                }`}>
                                  <div className={`w-1.5 h-1.5 rounded-full ${isPastOrActive ? "hidden" : "bg-gray-100"}`} />
                                </div>

                                <div className="flex flex-col pt-0.5">
                                  <span className={`text-xs font-medium uppercase tracking-tight transition-colors duration-500 ${
                                    isPastOrActive ? "text-gray-900" : "text-gray-400"
                                  }`}>
                                    {step.label}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        {!nextStep && status === 'delivered' && (
                          <div className="mt-8 p-3 bg-gray-50 rounded border border-gray-100 flex items-center justify-center gap-2">
                            <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Order Completed</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

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
                              <td className="px-4 py-3 text-gray-500 text-right">£{price.toFixed(2)}</td>
                              <td className="px-4 py-3 text-gray-500 text-center">{item.quantity}</td>
                              <td className="px-4 py-3 text-gray-900 font-medium text-right">
                                £{(item.quantity * price).toFixed(2)}
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
                            £{(order.totalAmount || 0).toFixed(2)}
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
