"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { OrderStatus } from "@/types/order";

interface OrderTableProps {
  initialOrders: any[];
}

const COURIER_OPTIONS = [
  "TCS Express",
  "Leopards Courier",
  "Trax Logistics",
  "Call Courier",
  "PostEx",
  "M&P Express",
  "Rider Delivery",
  "Workshop Direct Delivery",
];

export default function OrderTable({ initialOrders }: OrderTableProps) {
  const [orders, setOrders] = useState<any[]>(initialOrders);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});
  const [providerInputs, setProviderInputs] = useState<Record<string, string>>({});
  const [savingTrackingId, setSavingTrackingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Status counts
  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    dispatched: orders.filter((o) => o.status === "dispatched").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    const q = search.toLowerCase().trim();
    const matchesSearch =
      q === "" ||
      order.orderId?.toLowerCase().includes(q) ||
      order.customerName?.toLowerCase().includes(q) ||
      order.phone?.toLowerCase().includes(q) ||
      order.city?.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  // Handle status update
  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      setUpdatingId(orderId);
      setActionError(null);
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        const updated = data.order;
        setOrders((prev) =>
          prev.map((o) =>
            o.orderId === orderId || o._id === orderId
              ? { ...o, ...updated, status: newStatus }
              : o
          )
        );
        if (selectedOrder && (selectedOrder.orderId === orderId || selectedOrder._id === orderId)) {
          setSelectedOrder((prev: any) => ({ ...prev, ...updated, status: newStatus }));
        }
        showToast("Order status updated successfully.");
      } else {
        const data = await res.json().catch(() => ({}));
        setActionError(data.error || "Unable to save status change. Please try again.");
      }
    } catch {
      setActionError("Network error updating order status.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Handle tracking & provider update
  const handleSaveDispatchInfo = async (orderId: string) => {
    const tracking = trackingInputs[orderId];
    const provider = providerInputs[orderId];

    try {
      setSavingTrackingId(orderId);
      setActionError(null);

      const body: Record<string, any> = {};
      if (tracking !== undefined) body.courierTrackingNumber = tracking;
      if (provider !== undefined) body.courierProvider = provider;

      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        const updated = data.order;
        setOrders((prev) =>
          prev.map((o) =>
            o.orderId === orderId || o._id === orderId
              ? { ...o, ...updated }
              : o
          )
        );
        if (selectedOrder && (selectedOrder.orderId === orderId || selectedOrder._id === orderId)) {
          setSelectedOrder((prev: any) => ({ ...prev, ...updated }));
        }
        showToast("Dispatch information saved successfully.");
      } else {
        const data = await res.json().catch(() => ({}));
        setActionError(data.error || "Unable to save dispatch details.");
      }
    } catch {
      setActionError("Network error updating dispatch information.");
    } finally {
      setSavingTrackingId(null);
    }
  };

  // Handle delete order
  const handleDeleteOrder = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      setActionError(null);
      const res = await fetch(`/api/orders/${deleteTarget.orderId || deleteTarget._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.filter(
            (o) =>
              o.orderId !== deleteTarget.orderId && o._id !== deleteTarget._id
          )
        );
        if (selectedOrder?.orderId === deleteTarget.orderId) {
          setSelectedOrder(null);
        }
        setDeleteTarget(null);
        showToast("Order removed from registry.");
      } else {
        const data = await res.json().catch(() => ({}));
        setActionError(data.error || "Unable to delete order.");
      }
    } catch {
      setActionError("Network error deleting order.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Direct WhatsApp Bridge
  const createWhatsAppLink = (order: any) => {
    let cleanPhone = (order.phone || "").replace(/[^0-9]/g, "");
    if (cleanPhone.startsWith("0")) {
      cleanPhone = "92" + cleanPhone.slice(1);
    } else if (!cleanPhone.startsWith("92")) {
      cleanPhone = "92" + cleanPhone;
    }

    const itemsSummary = order.items
      ?.map((it: any) => `• ${it.name} (x${it.quantity}) - Rs. ${(it.price * it.quantity).toLocaleString()}`)
      .join("\n");

    const message = `*CUFFKINGS ATELIER — ORDER STATUS*
Order ID: #${order.orderId}
Dear ${order.customerName},

*Status:* ${(order.status || "PENDING").toUpperCase()}
${order.courierProvider ? `*Courier:* ${order.courierProvider}\n` : ""}${order.courierTrackingNumber ? `*Tracking Number:* ${order.courierTrackingNumber}\n` : ""}
*Items Ordered:*
${itemsSummary}

*Payable Total:* Rs. ${order.total?.toLocaleString()} (${order.paymentMethod || "Cash on Delivery"})
*Delivery Destination:* ${order.address}, ${order.city}

Thank you for choosing CuffKings. Our Peshawar workshop is at your service.`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-amber-950/60 text-amber-300 border border-amber-800/60">
            Pending
          </span>
        );
      case "confirmed":
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-blue-950/60 text-blue-300 border border-blue-800/60">
            Confirmed
          </span>
        );
      case "dispatched":
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-purple-950/60 text-purple-300 border border-purple-800/60">
            Dispatched
          </span>
        );
      case "delivered":
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
            Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-rose-950/60 text-rose-300 border border-rose-800/60">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-white/10 text-porcelain/60">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="p-3 bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between shadow-lg">
          <span className="font-medium">✓ {toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-emerald-400 hover:text-emerald-200 text-sm ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {actionError && (
        <div className="p-3 bg-rose-950/70 border border-rose-600/60 text-rose-200 text-xs flex items-center justify-between shadow-lg">
          <span>✕ {actionError}</span>
          <button
            onClick={() => setActionError(null)}
            className="text-rose-400 hover:text-rose-200 text-sm ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 bg-[#101217] border border-white/10 p-3 sm:p-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: "all", label: "All Orders", count: counts.all },
            { id: "pending", label: "Pending", count: counts.pending },
            { id: "confirmed", label: "Confirmed", count: counts.confirmed },
            { id: "dispatched", label: "Dispatched", count: counts.dispatched },
            { id: "delivered", label: "Delivered", count: counts.delivered },
            { id: "cancelled", label: "Cancelled", count: counts.cancelled },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-all duration-150 flex items-center gap-1.5 shrink-0 whitespace-nowrap border ${
                selectedStatus === tab.id
                  ? "bg-champagne-brass text-obsidian border-champagne-brass font-medium shadow"
                  : "border-white/10 text-porcelain/70 hover:text-porcelain hover:bg-white/5"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  selectedStatus === tab.id
                    ? "bg-obsidian/20 text-obsidian"
                    : "bg-white/10 text-porcelain/60"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full md:w-72 shrink-0">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Order #, customer, phone..."
            className="w-full px-3.5 py-2 bg-black/40 border border-white/10 text-porcelain text-xs focus:outline-none focus:border-champagne-brass placeholder-porcelain/40"
          />
        </div>
      </div>

      {/* MOBILE ORDER CARDS (< 768px) */}
      <div className="block md:hidden space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="p-8 text-center text-porcelain/50 bg-[#101217] border border-white/10 text-xs space-y-1">
            <p className="font-medium text-porcelain">No orders match the selected criteria.</p>
            <p className="text-[11px] text-porcelain/40">Genuine customer orders from WhatsApp checkout will appear here.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const currentTracking =
              trackingInputs[order.orderId] !== undefined
                ? trackingInputs[order.orderId]
                : order.courierTrackingNumber || "";

            const currentProvider =
              providerInputs[order.orderId] !== undefined
                ? providerInputs[order.orderId]
                : order.courierProvider || "";

            return (
              <div
                key={order._id || order.orderId}
                className="bg-[#101217] border border-white/10 p-3.5 space-y-3"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-medium text-champagne-brass text-xs">
                        #{order.orderId}
                      </span>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-[10px] text-porcelain/40 font-mono mt-0.5">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("en-PK", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Registered Order"}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-semibold text-porcelain text-xs">
                      Rs. {order.total?.toLocaleString()}
                    </span>
                    <span className="block text-[10px] text-porcelain/40">
                      {order.paymentMethod || "COD"}
                    </span>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="bg-black/30 p-2.5 border border-white/5 text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-porcelain">{order.customerName}</span>
                    <span className="text-[11px] text-porcelain/60 font-mono">{order.city}</span>
                  </div>
                  <div className="text-[11px] font-mono text-champagne-brass">
                    {order.phone}
                  </div>
                  <div className="text-[10px] text-porcelain/50 truncate">
                    {order.address}
                  </div>
                </div>

                {/* Items */}
                <div className="flex items-center space-x-2">
                  {order.items?.slice(0, 3).map((it: any, i: number) => (
                    <div
                      key={i}
                      className="relative w-9 h-9 rounded border border-white/10 overflow-hidden bg-black/40 shrink-0"
                    >
                      {it.image ? (
                        <Image
                          src={it.image}
                          alt={it.name}
                          fill
                          sizes="36px"
                          className="object-cover"
                          unoptimized={it.image.startsWith("http") || it.image.startsWith("data:")}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[9px] text-porcelain/30">
                          CK
                        </div>
                      )}
                    </div>
                  ))}
                  <p className="text-[11px] text-porcelain/60 truncate flex-1 font-sans">
                    {order.items?.map((it: any) => `${it.quantity}x ${it.name}`).join(", ")}
                  </p>
                </div>

                {/* Status & Courier */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/5">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-porcelain/50 mb-1">
                      Status
                    </label>
                    <select
                      value={order.status}
                      disabled={updatingId === order.orderId}
                      onChange={(e) =>
                        handleStatusChange(order.orderId, e.target.value as OrderStatus)
                      }
                      className="w-full bg-obsidian border border-white/15 text-porcelain text-xs px-2.5 py-1.5 focus:outline-none focus:border-champagne-brass"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="dispatched">Dispatched</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-porcelain/50 mb-1">
                      Courier & Tracking
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        placeholder="Tracking code"
                        value={currentTracking}
                        onChange={(e) =>
                          setTrackingInputs((prev) => ({
                            ...prev,
                            [order.orderId]: e.target.value,
                          }))
                        }
                        className="flex-1 px-2.5 py-1.5 bg-obsidian border border-white/15 text-porcelain text-xs font-mono"
                      />
                      {(trackingInputs[order.orderId] !== undefined || providerInputs[order.orderId] !== undefined) && (
                        <button
                          onClick={() => handleSaveDispatchInfo(order.orderId)}
                          disabled={savingTrackingId === order.orderId}
                          className="px-2.5 py-1.5 bg-champagne-brass text-obsidian text-xs uppercase font-medium"
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile Actions Toolbar */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                  <a
                    href={createWhatsAppLink(order)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-2.5 py-1.5 bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 hover:bg-emerald-900/60 transition-colors text-[11px] uppercase tracking-wider font-medium"
                  >
                    WhatsApp ↗
                  </a>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-2.5 py-1.5 bg-white/5 border border-white/15 text-porcelain hover:bg-white/10 text-[11px] uppercase tracking-wider font-medium"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => setDeleteTarget(order)}
                      className="px-2.5 py-1.5 bg-rose-950/40 border border-rose-800/40 text-rose-300 hover:bg-rose-900/60 text-[11px] uppercase tracking-wider font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* DESKTOP/TABLET TABLE VIEW (>= 768px) */}
      <div className="hidden md:block bg-[#101217] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead>
              <tr className="border-b border-white/10 bg-black/40 text-champagne-brass uppercase tracking-widest font-sans">
                <th className="py-3.5 px-4 font-medium">Order Ref</th>
                <th className="py-3.5 px-4 font-medium">Customer & Destination</th>
                <th className="py-3.5 px-4 font-medium">Items</th>
                <th className="py-3.5 px-4 font-medium">Amount</th>
                <th className="py-3.5 px-4 font-medium">Order Status</th>
                <th className="py-3.5 px-4 font-medium">Courier Tracking</th>
                <th className="py-3.5 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-porcelain/80">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-porcelain/40">
                    <p className="text-sm font-display mb-1 text-porcelain/70">No orders recorded</p>
                    <p className="text-xs">
                      {search
                        ? "No orders match your search query."
                        : "No orders in this status category. Live customer orders from WhatsApp checkout will appear here."}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const currentTracking =
                    trackingInputs[order.orderId] !== undefined
                      ? trackingInputs[order.orderId]
                      : order.courierTrackingNumber || "";

                  const currentProvider =
                    providerInputs[order.orderId] !== undefined
                      ? providerInputs[order.orderId]
                      : order.courierProvider || "";

                  const hasDispatchPendingSave =
                    (trackingInputs[order.orderId] !== undefined && trackingInputs[order.orderId] !== (order.courierTrackingNumber || "")) ||
                    (providerInputs[order.orderId] !== undefined && providerInputs[order.orderId] !== (order.courierProvider || ""));

                  return (
                    <tr
                      key={order._id || order.orderId}
                      className="hover:bg-white/5 transition-colors"
                    >
                      {/* Order Ref */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-mono font-medium text-porcelain flex items-center gap-1.5">
                          <span className="text-champagne-brass">#</span>
                          {order.orderId}
                        </div>
                        <div className="text-[10px] text-porcelain/40 mt-0.5 font-mono">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString("en-PK", {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Registered"}
                        </div>
                      </td>

                      {/* Customer Info */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-porcelain">
                          {order.customerName}
                        </div>
                        <div className="text-[11px] text-porcelain/60 flex items-center gap-1 font-mono">
                          <span>{order.city}</span>
                          <span>•</span>
                          <span className="text-champagne-brass">{order.phone}</span>
                        </div>
                      </td>

                      {/* Pieces Ordered */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-2">
                          {order.items?.slice(0, 3).map((it: any, i: number) => (
                            <div
                              key={i}
                              className="relative w-8 h-8 rounded border border-white/10 overflow-hidden bg-black/40 shrink-0"
                              title={`${it.name} (x${it.quantity})`}
                            >
                              {it.image ? (
                                <Image
                                  src={it.image}
                                  alt={it.name}
                                  fill
                                  sizes="32px"
                                  className="object-cover"
                                  unoptimized={it.image.startsWith("http") || it.image.startsWith("data:")}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[9px] text-porcelain/30">
                                  CK
                                </div>
                              )}
                            </div>
                          ))}
                          {order.items?.length > 3 && (
                            <span className="text-[10px] text-porcelain/50 font-mono">
                              +{order.items.length - 3}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-porcelain/50 mt-1 truncate max-w-[180px]">
                          {order.items?.map((it: any) => `${it.quantity}x ${it.name}`).join(", ")}
                        </p>
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-mono font-medium text-porcelain text-xs">
                          Rs. {order.total?.toLocaleString()}
                        </span>
                        <div className="text-[10px] text-porcelain/40">
                          {order.paymentMethod || "COD"}
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <select
                            value={order.status}
                            disabled={updatingId === order.orderId}
                            onChange={(e) =>
                              handleStatusChange(order.orderId, e.target.value as OrderStatus)
                            }
                            className="bg-obsidian border border-white/15 text-porcelain text-[11px] px-2 py-1 focus:outline-none focus:border-champagne-brass cursor-pointer"
                          >
                            <option value="pending">Pending Confirmation</option>
                            <option value="confirmed">Confirmed / Packing</option>
                            <option value="dispatched">Dispatched via Courier</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>

                      {/* Courier Tracking */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              placeholder="Tracking #"
                              value={currentTracking}
                              onChange={(e) =>
                                setTrackingInputs((prev) => ({
                                  ...prev,
                                  [order.orderId]: e.target.value,
                                }))
                              }
                              className="w-28 px-2 py-1 bg-obsidian border border-white/10 text-porcelain text-[11px] font-mono focus:outline-none focus:border-champagne-brass"
                            />
                            {hasDispatchPendingSave && (
                              <button
                                onClick={() => handleSaveDispatchInfo(order.orderId)}
                                disabled={savingTrackingId === order.orderId}
                                className="px-2 py-1 bg-champagne-brass text-obsidian text-[10px] uppercase font-medium hover:bg-champagne-brass/80 transition-colors"
                              >
                                {savingTrackingId === order.orderId ? "..." : "Save"}
                              </button>
                            )}
                          </div>
                          {order.courierProvider && (
                            <span className="text-[10px] text-porcelain/40 block font-mono">
                              via {order.courierProvider}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                        {/* WhatsApp Bridge */}
                        <a
                          href={createWhatsAppLink(order)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Message customer via WhatsApp"
                          className="inline-flex items-center px-2 py-1 bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 hover:bg-emerald-900/60 transition-colors text-[10px] uppercase tracking-wider font-medium"
                        >
                          WhatsApp ↗
                        </a>

                        {/* View Details */}
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-2 py-1 bg-white/5 border border-white/15 text-porcelain hover:bg-white/10 transition-colors text-[10px] uppercase tracking-wider"
                        >
                          Details
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteTarget(order)}
                          className="px-2 py-1 bg-rose-950/40 border border-rose-800/40 text-rose-300 hover:bg-rose-900/60 transition-colors text-[10px] uppercase tracking-wider"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Drawer / Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#121318] border border-white/15 p-4 sm:p-6 lg:p-8 max-w-2xl w-full max-h-[92vh] overflow-y-auto space-y-5 sm:space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-display text-porcelain flex items-center gap-2">
                  <span>Order Reference</span>
                  <span className="text-champagne-brass font-mono">#{selectedOrder.orderId}</span>
                </h3>
                <p className="text-xs text-porcelain/50 mt-0.5">
                  Placed on {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString("en-PK") : "N/A"}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="text-porcelain/60 hover:text-porcelain p-1 text-lg"
              >
                ✕
              </button>
            </div>

            {/* Customer & Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-black/30 border border-white/5 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-champagne-brass font-sans block">
                  Customer Information
                </span>
                <p className="font-medium text-porcelain text-sm">{selectedOrder.customerName}</p>
                <p className="font-mono text-champagne-brass">{selectedOrder.phone}</p>
                <p className="text-porcelain/60">Payment: {selectedOrder.paymentMethod || "Cash on Delivery (COD)"}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-champagne-brass font-sans block">
                  Delivery Destination
                </span>
                <p className="text-porcelain">{selectedOrder.address}</p>
                <p className="font-medium text-porcelain font-mono">{selectedOrder.city}</p>
                {selectedOrder.notes && (
                  <p className="text-amber-200/80 italic pt-1 border-t border-white/5">
                    &ldquo;{selectedOrder.notes}&rdquo;
                  </p>
                )}
              </div>
            </div>

            {/* Dispatch & Courier Configuration in Modal */}
            <div className="p-4 bg-black/40 border border-white/5 space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-champagne-brass font-sans block">
                Fulfillment & Dispatch Details
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[10px] text-porcelain/60 mb-1">Courier Service</label>
                  <select
                    value={
                      providerInputs[selectedOrder.orderId] !== undefined
                        ? providerInputs[selectedOrder.orderId]
                        : selectedOrder.courierProvider || ""
                    }
                    onChange={(e) =>
                      setProviderInputs((prev) => ({
                        ...prev,
                        [selectedOrder.orderId]: e.target.value,
                      }))
                    }
                    className="w-full bg-obsidian border border-white/10 text-porcelain px-2.5 py-1.5 focus:border-champagne-brass"
                  >
                    <option value="">Select Courier...</option>
                    {COURIER_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-porcelain/60 mb-1">Tracking Code</label>
                  <input
                    type="text"
                    value={
                      trackingInputs[selectedOrder.orderId] !== undefined
                        ? trackingInputs[selectedOrder.orderId]
                        : selectedOrder.courierTrackingNumber || ""
                    }
                    onChange={(e) =>
                      setTrackingInputs((prev) => ({
                        ...prev,
                        [selectedOrder.orderId]: e.target.value,
                      }))
                    }
                    placeholder="e.g. TCS-924185012PK"
                    className="w-full bg-obsidian border border-white/10 text-porcelain px-2.5 py-1.5 font-mono focus:border-champagne-brass"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => handleSaveDispatchInfo(selectedOrder.orderId)}
                  disabled={savingTrackingId === selectedOrder.orderId}
                  className="px-4 py-1.5 bg-champagne-brass text-obsidian text-xs uppercase font-medium hover:bg-champagne-brass/90"
                >
                  {savingTrackingId === selectedOrder.orderId ? "Saving..." : "Update Dispatch Details"}
                </button>
              </div>
            </div>

            {/* Ordered Pieces */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-champagne-brass font-sans block">
                Ordered Pieces ({selectedOrder.items?.length || 0})
              </span>
              <div className="divide-y divide-white/5 border border-white/5">
                {selectedOrder.items?.map((item: any, idx: number) => (
                  <div key={idx} className="p-3 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 relative bg-black border border-white/10 shrink-0 overflow-hidden">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            unoptimized={item.image.startsWith("http") || item.image.startsWith("data:")}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-porcelain/30">
                            CK
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-porcelain">{item.name}</p>
                        {item.material && (
                          <p className="text-[10px] text-porcelain/50">{item.material}</p>
                        )}
                        <p className="text-[11px] text-porcelain/60 font-mono mt-0.5">
                          Qty: {item.quantity} × Rs. {item.price?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono font-medium text-champagne-brass text-sm">
                      Rs. {((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-4 bg-black/40 border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between text-porcelain/60">
                <span>Subtotal</span>
                <span className="font-mono">Rs. {selectedOrder.subtotal?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-porcelain/60">
                <span>Courier Nationwide Delivery Fee</span>
                <span className="font-mono">Rs. {selectedOrder.deliveryFee?.toLocaleString() ?? 180}</span>
              </div>
              <div className="flex justify-between text-porcelain font-medium pt-2 border-t border-white/10 text-sm">
                <span>Total Payable</span>
                <span className="font-mono text-champagne-brass">Rs. {selectedOrder.total?.toLocaleString()}</span>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-white/10">
              <a
                href={createWhatsAppLink(selectedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-emerald-950/60 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-900/60 text-center text-xs uppercase tracking-wider font-medium"
              >
                Send WhatsApp Status Update ↗
              </a>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 bg-white/10 text-porcelain hover:bg-white/15 text-xs uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121318] border border-rose-800/60 p-5 sm:p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-display text-porcelain">Confirm Order Deletion</h3>
            <p className="text-xs text-porcelain/70 leading-relaxed">
              Are you sure you want to permanently delete order{" "}
              <strong className="text-champagne-brass font-mono">#{deleteTarget.orderId}</strong> for{" "}
              <strong className="text-porcelain">{deleteTarget.customerName}</strong>?
            </p>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-end gap-2.5 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 border border-white/20 text-porcelain text-xs uppercase tracking-wider hover:bg-white/5 transition-colors text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteOrder}
                disabled={isDeleting}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs uppercase tracking-wider font-medium transition-colors disabled:opacity-50 text-center"
              >
                {isDeleting ? "Deleting..." : "Permanently Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
