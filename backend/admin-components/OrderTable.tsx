"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { IOrder, OrderStatus } from "@/backend/models/Order";

interface OrderTableProps {
  initialOrders: any[];
}

export default function OrderTable({ initialOrders }: OrderTableProps) {
  const [orders, setOrders] = useState<any[]>(initialOrders);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});
  const [savingTrackingId, setSavingTrackingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Status counters
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
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) =>
            o.orderId === orderId || o._id === orderId
              ? { ...o, status: newStatus }
              : o
          )
        );
        if (selectedOrder && (selectedOrder.orderId === orderId || selectedOrder._id === orderId)) {
          setSelectedOrder((prev: any) => ({ ...prev, status: newStatus }));
        }
      } else {
        alert("Failed to update status on server.");
      }
    } catch (err) {
      console.error("Status update error:", err);
      alert("Network error updating status.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Handle tracking number update
  const handleSaveTracking = async (orderId: string) => {
    const code = trackingInputs[orderId];
    if (code === undefined) return;

    try {
      setSavingTrackingId(orderId);
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courierTrackingNumber: code }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) =>
            o.orderId === orderId || o._id === orderId
              ? { ...o, courierTrackingNumber: code }
              : o
          )
        );
      } else {
        alert("Failed to save tracking number.");
      }
    } catch (err) {
      console.error("Save tracking error:", err);
    } finally {
      setSavingTrackingId(null);
    }
  };

  // Handle delete order
  const handleDeleteOrder = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const id = deleteTarget.orderId || deleteTarget._id;
      const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
      if (res.ok) {
        setOrders((prev) => prev.filter((o) => o.orderId !== deleteTarget.orderId));
        setDeleteTarget(null);
        if (selectedOrder?.orderId === deleteTarget.orderId) {
          setSelectedOrder(null);
        }
      } else {
        alert("Failed to delete order");
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Direct WhatsApp Bridge
  const createWhatsAppLink = (order: any) => {
    let cleanPhone = order.phone.replace(/[^0-9]/g, "");
    if (cleanPhone.startsWith("0")) {
      cleanPhone = "92" + cleanPhone.slice(1);
    } else if (!cleanPhone.startsWith("92")) {
      cleanPhone = "92" + cleanPhone;
    }

    const itemsSummary = order.items
      ?.map((it: any) => `• ${it.name} (x${it.quantity}) - Rs. ${(it.price * it.quantity).toLocaleString()}`)
      .join("\n");

    const message = `*CUFFKINGS ATELIER — ORDER UPDATE*
Order ID: #${order.orderId}
Dear ${order.customerName},

Thank you for your order with Cuffkings.
*Order Status:* ${order.status.toUpperCase()}
${order.courierTrackingNumber ? `*Courier Tracking:* ${order.courierTrackingNumber}\n` : ""}
*Items Ordered:*
${itemsSummary}

*Total Payable:* Rs. ${order.total.toLocaleString()} (${order.paymentMethod || "Cash on Delivery"})
*Delivery Destination:* ${order.city}

If you have any questions or require custom assistance, our atelier team is at your disposal.`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  // Status Badge Helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider bg-amber-950/40 text-amber-300 border border-amber-800/40">
            Pending Confirmation
          </span>
        );
      case "confirmed":
        return (
          <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider bg-blue-950/40 text-blue-300 border border-blue-800/40">
            Confirmed & Packing
          </span>
        );
      case "dispatched":
        return (
          <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider bg-purple-950/40 text-purple-300 border border-purple-800/40">
            Dispatched via Courier
          </span>
        );
      case "delivered":
        return (
          <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider bg-emerald-950/40 text-emerald-300 border border-emerald-800/40">
            Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider bg-red-950/40 text-red-300 border border-red-800/40">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider bg-white/10 text-porcelain/60">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 border border-champagne-brass/20 p-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1">
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
              className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-all duration-150 flex items-center gap-1.5 ${
                selectedStatus === tab.id
                  ? "bg-champagne-brass text-obsidian font-medium shadow"
                  : "text-porcelain/70 hover:text-porcelain hover:bg-white/5"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedStatus === tab.id
                    ? "bg-obsidian/20 text-obsidian"
                    : "bg-white/10 text-porcelain/50"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full md:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Order #, customer, city..."
            className="w-full px-3.5 py-2 bg-obsidian border border-champagne-brass/20 text-porcelain text-xs focus:outline-none focus:border-champagne-brass placeholder-porcelain/40"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/5 border border-champagne-brass/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-champagne-brass/20 bg-black/40 text-champagne-brass uppercase tracking-widest font-sans">
                <th className="py-3.5 px-4 font-medium">Order Ref</th>
                <th className="py-3.5 px-4 font-medium">Customer & City</th>
                <th className="py-3.5 px-4 font-medium">Pieces Ordered</th>
                <th className="py-3.5 px-4 font-medium">Total (PKR)</th>
                <th className="py-3.5 px-4 font-medium">Status</th>
                <th className="py-3.5 px-4 font-medium">Courier Tracking</th>
                <th className="py-3.5 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-porcelain/80">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-porcelain/40">
                    <p className="text-sm font-display mb-1">No orders found</p>
                    <p className="text-xs">
                      {search ? "No orders match your search query." : "No orders in this status category."}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const currentTracking =
                    trackingInputs[order.orderId] !== undefined
                      ? trackingInputs[order.orderId]
                      : order.courierTrackingNumber || "";

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
                        <div className="text-[10px] text-porcelain/40 mt-0.5">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString("en-PK", {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Atelier Desk"}
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
                          <span>{order.phone}</span>
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
                              +{order.items.length - 3} more
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
                            className="bg-obsidian border border-champagne-brass/30 text-porcelain text-[11px] px-2 py-1 focus:outline-none focus:border-champagne-brass cursor-pointer"
                          >
                            <option value="pending">Pending Confirmation</option>
                            <option value="confirmed">Confirmed / Packing</option>
                            <option value="dispatched">Dispatched via Courier</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>

                      {/* Courier Tracking Input */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            placeholder="e.g. TCS-94812"
                            value={currentTracking}
                            onChange={(e) =>
                              setTrackingInputs((prev) => ({
                                ...prev,
                                [order.orderId]: e.target.value,
                              }))
                            }
                            className="w-28 px-2 py-1 bg-obsidian border border-white/10 text-porcelain text-[11px] font-mono focus:outline-none focus:border-champagne-brass"
                          />
                          {trackingInputs[order.orderId] !== undefined &&
                            trackingInputs[order.orderId] !== (order.courierTrackingNumber || "") && (
                              <button
                                onClick={() => handleSaveTracking(order.orderId)}
                                disabled={savingTrackingId === order.orderId}
                                className="px-2 py-1 bg-champagne-brass text-obsidian text-[10px] uppercase font-medium hover:bg-champagne-brass/80 transition-colors"
                              >
                                {savingTrackingId === order.orderId ? "..." : "Save"}
                              </button>
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
                          className="px-2 py-1 bg-white/5 border border-champagne-brass/20 text-champagne-brass hover:bg-champagne-brass/10 transition-colors text-[10px] uppercase tracking-wider"
                        >
                          Details
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteTarget(order)}
                          className="px-2 py-1 bg-deep-wine/20 border border-deep-wine/40 text-red-300 hover:bg-deep-wine/40 transition-colors text-[10px] uppercase tracking-wider"
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
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#121318] border border-champagne-brass/30 p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-champagne-brass/20 pb-4">
              <div>
                <h3 className="text-xl font-display text-porcelain flex items-center gap-2">
                  <span>Order Reference</span>
                  <span className="text-champagne-brass font-mono">#{selectedOrder.orderId}</span>
                </h3>
                <p className="text-xs text-porcelain/50 mt-0.5">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString("en-PK")}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-porcelain/60 hover:text-porcelain text-xl"
              >
                ✕
              </button>
            </div>

            {/* Status and Summary Header */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white/5 border border-white/5">
              <div>
                <span className="text-[10px] uppercase text-champagne-brass block">Status</span>
                <span className="text-xs font-medium text-porcelain capitalize mt-1 block">
                  {selectedOrder.status}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-champagne-brass block">Payment</span>
                <span className="text-xs text-porcelain mt-1 block">
                  {selectedOrder.paymentMethod || "COD"}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-champagne-brass block">Destination</span>
                <span className="text-xs text-porcelain mt-1 block font-medium">
                  {selectedOrder.city}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-champagne-brass block">Total</span>
                <span className="text-xs font-mono font-medium text-champagne-brass mt-1 block">
                  Rs. {selectedOrder.total?.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-champagne-brass font-sans">
                Customer Delivery Information
              </h4>
              <div className="p-4 bg-black/40 border border-white/10 space-y-2 text-xs text-porcelain/80">
                <div className="flex justify-between">
                  <span className="text-porcelain/40">Full Name:</span>
                  <span className="font-medium text-porcelain">{selectedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-porcelain/40">Phone / WhatsApp:</span>
                  <span className="font-mono text-champagne-brass">{selectedOrder.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-porcelain/40">City:</span>
                  <span className="text-porcelain">{selectedOrder.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-porcelain/40">Full Shipping Address:</span>
                  <span className="text-right max-w-sm text-porcelain">{selectedOrder.address}</span>
                </div>
                {selectedOrder.notes && (
                  <div className="flex justify-between pt-2 border-t border-white/5">
                    <span className="text-porcelain/40">Client Special Notes:</span>
                    <span className="text-right text-amber-200/90 italic max-w-sm">
                      &quot;{selectedOrder.notes}&quot;
                    </span>
                  </div>
                )}
                {selectedOrder.courierTrackingNumber && (
                  <div className="flex justify-between pt-2 border-t border-white/5">
                    <span className="text-porcelain/40">Courier Tracking Code:</span>
                    <span className="font-mono text-purple-300">
                      {selectedOrder.courierTrackingNumber}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Items Ordered List */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-champagne-brass font-sans">
                Bespoke Items ({selectedOrder.items?.length || 0})
              </h4>
              <div className="divide-y divide-white/5 border border-white/10 bg-black/40">
                {selectedOrder.items?.map((it: any, index: number) => (
                  <div key={index} className="p-3 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 bg-black/60 border border-white/10 shrink-0">
                        {it.image && (
                          <Image
                            src={it.image}
                            alt={it.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-porcelain">{it.name}</p>
                        <p className="text-[10px] text-porcelain/50">
                          Qty: {it.quantity} • Unit: Rs. {it.price?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-porcelain font-medium">
                      Rs. {(it.price * it.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}

                <div className="p-3 bg-white/5 space-y-1 text-xs">
                  <div className="flex justify-between text-porcelain/60">
                    <span>Subtotal</span>
                    <span className="font-mono">Rs. {selectedOrder.subtotal?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-porcelain/60">
                    <span>Express Nationwide Delivery</span>
                    <span className="font-mono">Rs. {selectedOrder.deliveryFee?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-porcelain font-medium pt-2 border-t border-white/10">
                    <span className="text-champagne-brass">Grand Total (COD)</span>
                    <span className="font-mono text-champagne-brass text-sm">
                      Rs. {selectedOrder.total?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-champagne-brass/20">
              <a
                href={createWhatsAppLink(selectedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-emerald-700 text-white text-xs uppercase tracking-widest font-medium hover:bg-emerald-600 transition-colors shadow"
              >
                Send WhatsApp Dispatch Notice ↗
              </a>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-white/10 text-porcelain text-xs uppercase tracking-wider hover:bg-white/20 transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#121318] border border-champagne-brass/30 p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-display text-porcelain">Remove Order from Registry</h3>
            <p className="text-xs text-porcelain/70 leading-relaxed">
              Are you sure you wish to delete order{" "}
              <strong className="text-champagne-brass">#{deleteTarget.orderId}</strong> for{" "}
              <strong>{deleteTarget.customerName}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs uppercase tracking-wider text-porcelain/60 hover:text-porcelain"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteOrder}
                disabled={isDeleting}
                className="px-4 py-2 bg-deep-wine text-white text-xs uppercase tracking-wider hover:bg-red-700 font-medium"
              >
                {isDeleting ? "Deleting..." : "Confirm Removal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
