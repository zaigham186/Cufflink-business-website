"use client";

import { useState } from "react";
import { Order } from "@/types/order";

interface DispatchDeskProps {
  initialOrders: Order[];
}

const COURIER_PROVIDERS = [
  "TCS Express",
  "Leopards Courier",
  "Trax Logistics",
  "PostEx",
  "Call Courier",
  "M&P Express",
  "Rider",
  "Self / Hand Delivery",
];

export default function DispatchDesk({ initialOrders }: DispatchDeskProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [activeTab, setActiveTab] = useState<"all" | "awaiting" | "transit" | "delivered">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [courierFilter, setCourierFilter] = useState("all");

  // Track edits per order
  const [trackingEdits, setTrackingEdits] = useState<{ [orderId: string]: string }>({});
  const [courierEdits, setCourierEdits] = useState<{ [orderId: string]: string }>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  // Modal / drawer state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Toast / error notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const counts = {
    all: orders.length,
    awaiting: orders.filter((o) => o.status === "pending" || o.status === "confirmed").length,
    transit: orders.filter((o) => o.status === "dispatched").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    // Tab filter
    if (activeTab === "awaiting" && order.status !== "pending" && order.status !== "confirmed") {
      return false;
    }
    if (activeTab === "transit" && order.status !== "dispatched") {
      return false;
    }
    if (activeTab === "delivered" && order.status !== "delivered") {
      return false;
    }

    // Courier filter
    if (courierFilter !== "all") {
      const currentCourier = courierEdits[order.orderId] ?? (order.courierProvider || "");
      if (currentCourier !== courierFilter) {
        return false;
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = order.orderId.toLowerCase().includes(q);
      const matchName = order.customerName.toLowerCase().includes(q);
      const matchCity = order.city.toLowerCase().includes(q);
      const matchPhone = order.phone.toLowerCase().includes(q);
      const matchTracking = (order.courierTrackingNumber || "").toLowerCase().includes(q);
      return matchId || matchName || matchCity || matchPhone || matchTracking;
    }

    return true;
  });

  const handleCourierChange = (orderId: string, val: string) => {
    setCourierEdits((prev) => ({ ...prev, [orderId]: val }));
  };

  const handleTrackingChange = (orderId: string, val: string) => {
    setTrackingEdits((prev) => ({ ...prev, [orderId]: val }));
  };

  const saveDispatchDetails = async (
    order: Order,
    newStatus?: "pending" | "confirmed" | "dispatched" | "delivered" | "cancelled"
  ) => {
    const orderKey = order._id || order.orderId;
    setSavingId(order.orderId);
    setActionError(null);

    const trackingNumber =
      trackingEdits[order.orderId] !== undefined
        ? trackingEdits[order.orderId]
        : order.courierTrackingNumber || "";

    const courierProvider =
      courierEdits[order.orderId] !== undefined
        ? courierEdits[order.orderId]
        : order.courierProvider || "";

    const payload: Record<string, any> = {
      courierTrackingNumber: trackingNumber,
      courierProvider: courierProvider,
    };

    if (newStatus) {
      payload.status = newStatus;
    }

    try {
      const res = await fetch(`/api/orders/${orderKey}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.order) {
        setOrders((prev) =>
          prev.map((o) => (o.orderId === order.orderId ? (data.order as Order) : o))
        );
        if (selectedOrder && selectedOrder.orderId === order.orderId) {
          setSelectedOrder(data.order as Order);
        }
        showToast(
          newStatus
            ? `Order #${order.orderId} updated to ${newStatus}.`
            : `Dispatch information saved for #${order.orderId}.`
        );
      } else {
        setActionError(data.error || "Failed to persist dispatch updates to database.");
      }
    } catch {
      setActionError("Network error while connecting to server. Please try again.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161a22] border border-emerald-500/50 text-emerald-300 px-4 py-3 rounded shadow-2xl flex items-center space-x-3 text-xs animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Action Error Banner */}
      {actionError && (
        <div className="p-3 bg-red-950/40 border border-red-800/60 text-red-200 text-xs flex justify-between items-center">
          <span>{actionError}</span>
          <button
            onClick={() => setActionError(null)}
            className="text-red-400 hover:text-red-200 ml-4 font-mono uppercase text-[10px]"
          >
            ✕ Dismiss
          </button>
        </div>
      )}

      {/* Tabs & Controls */}
      <div className="bg-[#101217] border border-white/10 p-4 space-y-4">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/5 pb-3">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-colors ${
              activeTab === "all"
                ? "bg-champagne-brass/15 text-champagne-brass border-b-2 border-champagne-brass font-medium"
                : "text-porcelain/60 hover:text-porcelain"
            }`}
          >
            All Orders ({counts.all})
          </button>
          <button
            onClick={() => setActiveTab("awaiting")}
            className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-colors ${
              activeTab === "awaiting"
                ? "bg-amber-500/15 text-amber-300 border-b-2 border-amber-400 font-medium"
                : "text-porcelain/60 hover:text-porcelain"
            }`}
          >
            Awaiting Dispatch ({counts.awaiting})
          </button>
          <button
            onClick={() => setActiveTab("transit")}
            className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-colors ${
              activeTab === "transit"
                ? "bg-purple-500/15 text-purple-300 border-b-2 border-purple-400 font-medium"
                : "text-porcelain/60 hover:text-porcelain"
            }`}
          >
            In Transit ({counts.transit})
          </button>
          <button
            onClick={() => setActiveTab("delivered")}
            className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-colors ${
              activeTab === "delivered"
                ? "bg-emerald-500/15 text-emerald-300 border-b-2 border-emerald-400 font-medium"
                : "text-porcelain/60 hover:text-porcelain"
            }`}
          >
            Delivered ({counts.delivered})
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8">
            <input
              type="text"
              placeholder="Search by Order ID, customer, phone, city, or tracking code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d0e12] border border-white/10 px-3 py-2 text-xs text-porcelain placeholder:text-porcelain/40 focus:outline-none focus:border-champagne-brass/50"
            />
          </div>
          <div className="sm:col-span-4">
            <select
              value={courierFilter}
              onChange={(e) => setCourierFilter(e.target.value)}
              aria-label="Filter by courier service"
              className="w-full bg-[#0d0e12] border border-white/10 px-3 py-2 text-xs text-porcelain focus:outline-none focus:border-champagne-brass/50"
            >
              <option value="all">All Courier Services</option>
              {COURIER_PROVIDERS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Dispatches Table */}
      {filteredOrders.length === 0 ? (
        <div className="bg-[#101217] border border-white/10 p-12 text-center space-y-3">
          <p className="text-sm text-porcelain/70 font-sans">
            {orders.length === 0
              ? "No genuine orders have been placed in the database yet."
              : "No orders match the selected dispatch filter or search criteria."}
          </p>
          <p className="text-xs text-porcelain/40 max-w-md mx-auto">
            {orders.length === 0
              ? "When clients place orders via the storefront checkout, genuine records are saved to MongoDB and appear here with complete courier fulfillment options."
              : "Try clearing your search query or selecting a different status tab."}
          </p>
        </div>
      ) : (
        <div className="bg-[#101217] border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#0d0e12] text-porcelain/60 uppercase tracking-wider font-sans text-[11px]">
                  <th className="py-3 px-4 font-medium">Order ID</th>
                  <th className="py-3 px-4 font-medium">Customer & Destination</th>
                  <th className="py-3 px-4 font-medium">Items & Value</th>
                  <th className="py-3 px-4 font-medium">Fulfillment Status</th>
                  <th className="py-3 px-4 font-medium min-w-[200px]">Courier Service</th>
                  <th className="py-3 px-4 font-medium min-w-[200px]">Tracking Number</th>
                  <th className="py-3 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-porcelain/80">
                {filteredOrders.map((order) => {
                  const currentCourier =
                    courierEdits[order.orderId] !== undefined
                      ? courierEdits[order.orderId]
                      : order.courierProvider || "";

                  const currentTracking =
                    trackingEdits[order.orderId] !== undefined
                      ? trackingEdits[order.orderId]
                      : order.courierTrackingNumber || "";

                  const isModified =
                    currentCourier !== (order.courierProvider || "") ||
                    currentTracking !== (order.courierTrackingNumber || "");

                  const isSaving = savingId === order.orderId;

                  return (
                    <tr key={order.orderId} className="hover:bg-white/[0.02] transition-colors">
                      {/* Order ID */}
                      <td className="py-3.5 px-4 font-mono">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-champagne-brass hover:underline font-medium block"
                        >
                          #{order.orderId}
                        </button>
                        <span className="text-[10px] text-porcelain/40 block mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString("en-PK", {
                            day: "2-digit",
                            month: "short",
                          })}
                        </span>
                      </td>

                      {/* Customer & Destination */}
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-porcelain block">
                          {order.customerName}
                        </span>
                        <span className="text-[11px] text-porcelain/60 block">
                          {order.city} • {order.phone}
                        </span>
                        <span
                          className="text-[10px] text-porcelain/40 block truncate max-w-[220px]"
                          title={order.address}
                        >
                          {order.address}
                        </span>
                      </td>

                      {/* Items & Value */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-porcelain font-medium block">
                          Rs. {order.total.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-porcelain/50 block truncate max-w-[180px]">
                          {order.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {order.status === "dispatched" ? (
                          <div className="space-y-1">
                            <span className="inline-block px-2 py-0.5 text-[10px] uppercase font-sans tracking-wider bg-purple-950/50 text-purple-300 border border-purple-800/50">
                              In Transit
                            </span>
                            {order.dispatchedAt && (
                              <span className="block text-[10px] text-porcelain/40 font-mono">
                                Dispatched:{" "}
                                {new Date(order.dispatchedAt).toLocaleDateString("en-PK", {
                                  day: "2-digit",
                                  month: "short",
                                })}
                              </span>
                            )}
                          </div>
                        ) : order.status === "delivered" ? (
                          <div className="space-y-1">
                            <span className="inline-block px-2 py-0.5 text-[10px] uppercase font-sans tracking-wider bg-emerald-950/50 text-emerald-300 border border-emerald-800/50">
                              Delivered
                            </span>
                            {order.deliveredAt && (
                              <span className="block text-[10px] text-porcelain/40 font-mono">
                                Delivered:{" "}
                                {new Date(order.deliveredAt).toLocaleDateString("en-PK", {
                                  day: "2-digit",
                                  month: "short",
                                })}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="inline-block px-2 py-0.5 text-[10px] uppercase font-sans tracking-wider bg-amber-950/50 text-amber-300 border border-amber-800/50">
                            Not Dispatched
                          </span>
                        )}
                      </td>

                      {/* Courier Provider */}
                      <td className="py-3.5 px-4">
                        <select
                          value={currentCourier}
                          onChange={(e) => handleCourierChange(order.orderId, e.target.value)}
                          aria-label={`Courier service for order #${order.orderId}`}
                          className="w-full bg-[#0d0e12] border border-white/10 px-2.5 py-1.5 text-xs text-porcelain focus:outline-none focus:border-champagne-brass/50"
                        >
                          <option value="">Unassigned</option>
                          {COURIER_PROVIDERS.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Tracking Number */}
                      <td className="py-3.5 px-4">
                        <input
                          type="text"
                          placeholder="e.g. TCS-74892100"
                          value={currentTracking}
                          onChange={(e) => handleTrackingChange(order.orderId, e.target.value)}
                          className="w-full bg-[#0d0e12] border border-white/10 px-2.5 py-1.5 text-xs font-mono text-porcelain placeholder:text-porcelain/30 focus:outline-none focus:border-champagne-brass/50"
                        />
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {isModified && (
                            <button
                              onClick={() => saveDispatchDetails(order)}
                              disabled={isSaving}
                              className="px-2.5 py-1 bg-champagne-brass/20 text-champagne-brass border border-champagne-brass/40 text-[11px] uppercase tracking-wider hover:bg-champagne-brass/30 transition-colors disabled:opacity-50"
                            >
                              {isSaving ? "Saving..." : "Save"}
                            </button>
                          )}

                          {order.status !== "dispatched" && order.status !== "delivered" && (
                            <button
                              onClick={() => saveDispatchDetails(order, "dispatched")}
                              disabled={isSaving}
                              title="Mark as Dispatched and set timestamp"
                              className="px-2.5 py-1 bg-purple-950/60 text-purple-200 border border-purple-800/50 text-[11px] uppercase tracking-wider hover:bg-purple-900/60 transition-colors disabled:opacity-50"
                            >
                              Dispatch →
                            </button>
                          )}

                          {order.status === "dispatched" && (
                            <button
                              onClick={() => saveDispatchDetails(order, "delivered")}
                              disabled={isSaving}
                              title="Confirm delivery completion"
                              className="px-2.5 py-1 bg-emerald-950/60 text-emerald-200 border border-emerald-800/50 text-[11px] uppercase tracking-wider hover:bg-emerald-900/60 transition-colors disabled:opacity-50"
                            >
                              Delivered ✓
                            </button>
                          )}

                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="px-2 py-1 bg-white/5 text-porcelain/70 border border-white/10 text-[11px] hover:text-porcelain hover:bg-white/10 transition-colors"
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Details Drawer / Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#101217] border border-champagne-brass/30 max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-sans tracking-widest text-champagne-brass block">
                  Fulfillment & Dispatch Dossier
                </span>
                <h3 className="text-xl font-display text-porcelain mt-1">
                  Order #{selectedOrder.orderId}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-porcelain/60 hover:text-porcelain text-xl leading-none p-1"
              >
                ✕
              </button>
            </div>

            {/* Recipient Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#0d0e12] border border-white/5 text-xs">
              <div>
                <span className="text-porcelain/40 uppercase text-[10px] block">Customer</span>
                <span className="text-porcelain font-medium mt-0.5 block">
                  {selectedOrder.customerName}
                </span>
              </div>
              <div>
                <span className="text-porcelain/40 uppercase text-[10px] block">Phone / WhatsApp</span>
                <span className="text-porcelain font-mono mt-0.5 block">{selectedOrder.phone}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-porcelain/40 uppercase text-[10px] block">
                  Destination Address
                </span>
                <span className="text-porcelain mt-0.5 block">
                  {selectedOrder.address}, {selectedOrder.city}
                </span>
              </div>
              {selectedOrder.notes && (
                <div className="sm:col-span-2 pt-2 border-t border-white/5">
                  <span className="text-porcelain/40 uppercase text-[10px] block">Customer Notes</span>
                  <span className="text-porcelain/80 mt-0.5 block italic">{selectedOrder.notes}</span>
                </div>
              )}
            </div>

            {/* Ordered Items */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-porcelain/60 font-sans block">
                Items to Pack & Dispatch ({selectedOrder.items.length})
              </span>
              <div className="border border-white/5 divide-y divide-white/5">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-medium text-porcelain">{item.name}</span>
                      <span className="text-porcelain/50 block text-[11px]">
                        Qty: {item.quantity} • {item.material || "Brass Alloy"}
                      </span>
                    </div>
                    <div className="font-mono text-porcelain">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-2 text-xs">
                <span className="text-porcelain/60">Total Order Amount (COD):</span>
                <span className="font-mono text-champagne-brass font-medium text-sm">
                  Rs. {selectedOrder.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Timestamps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 bg-white/[0.02] border border-white/5 text-[11px] font-mono text-porcelain/50">
              <div>
                <span className="block text-porcelain/40 text-[9px] uppercase">Placed At</span>
                {new Date(selectedOrder.createdAt).toLocaleString("en-PK")}
              </div>
              <div>
                <span className="block text-porcelain/40 text-[9px] uppercase">Dispatched At</span>
                {selectedOrder.dispatchedAt
                  ? new Date(selectedOrder.dispatchedAt).toLocaleString("en-PK")
                  : "Not yet dispatched"}
              </div>
              <div>
                <span className="block text-porcelain/40 text-[9px] uppercase">Delivered At</span>
                {selectedOrder.deliveredAt
                  ? new Date(selectedOrder.deliveredAt).toLocaleString("en-PK")
                  : "Pending delivery"}
              </div>
            </div>

            {/* Close button */}
            <div className="flex justify-end pt-2 border-t border-white/10">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-porcelain text-xs uppercase tracking-wider transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
