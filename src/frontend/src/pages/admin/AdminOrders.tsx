import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered";

interface OrderItem {
  name: string;
  qty: string;
  price: string;
}

interface Order {
  id: string;
  buyer: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  amount: string;
  status: OrderStatus;
  items: OrderItem[];
  notes: string;
  createdAt: string;
}

const STATUS_COLORS: Record<OrderStatus, { bg: string; color: string }> = {
  Pending: { bg: "rgba(66,165,245,0.15)", color: "#1A237E" },
  Processing: { bg: "rgba(100,150,255,0.15)", color: "#6b9fff" },
  Shipped: { bg: "rgba(180,100,255,0.15)", color: "#c084fc" },
  Delivered: { bg: "rgba(100,220,150,0.15)", color: "#2e7d32" },
};

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-001",
    buyer: "Jean Dupont",
    email: "jean.dupont@email.fr",
    phone: "+33 6 12 34 56 78",
    country: "France",
    address: "15 Rue de la Paix, 75001 Paris, France",
    amount: "$2,400",
    status: "Delivered",
    items: [
      { name: "Kundan Necklace Set", qty: "50", price: "$28.00" },
      { name: "Pearl Drop Earrings", qty: "100", price: "$8.00" },
    ],
    notes: "Urgent delivery required. VIP client.",
    createdAt: "March 1, 2026",
  },
  {
    id: "ORD-002",
    buyer: "Fatima Al-Rashid",
    email: "fatima@alrashid.ae",
    phone: "+971 50 123 4567",
    country: "UAE",
    address: "Shop 12, Dubai Gold Souk, Deira, Dubai, UAE",
    amount: "$1,800",
    status: "Shipped",
    items: [
      {
        name: "Oxidised Silver Bangles (Set of 6)",
        qty: "60",
        price: "$15.00",
      },
      { name: "Minimal Necklace", qty: "60", price: "$15.00" },
    ],
    notes: "Prefer eco-friendly packaging.",
    createdAt: "March 5, 2026",
  },
  {
    id: "ORD-003",
    buyer: "Sarah Johnson",
    email: "sarah@boutique.us",
    phone: "+1 212 555 0198",
    country: "USA",
    address: "220 5th Avenue, Suite 400, New York, NY 10001, USA",
    amount: "$3,200",
    status: "Processing",
    items: [
      { name: "Bridal Choker Set", qty: "20", price: "$80.00" },
      { name: "Kundan Maang Tikka", qty: "40", price: "$20.00" },
      { name: "Temple Bangles (pair)", qty: "80", price: "$10.00" },
    ],
    notes: "For bridal season. Handle with care.",
    createdAt: "March 10, 2026",
  },
];

const EMPTY_ORDER = {
  buyer: "",
  email: "",
  phone: "",
  country: "",
  address: "",
  amount: "",
  status: "Pending" as OrderStatus,
  notes: "",
};

const EMPTY_ITEM: OrderItem = { name: "", qty: "", price: "" };

const BOX = {
  background: "#fff",
  border: "1px solid #e0e0e0",
  borderRadius: 12,
  padding: 20,
} as const;

const inputStyle = {
  width: "100%",
  background: "#f5f7ff",
  border: "1px solid #c5cae9",
  borderRadius: 8,
  padding: "9px 12px",
  color: "#1A237E",
  fontSize: 13,
  outline: "none",
} as React.CSSProperties;

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem("gemora_orders");
      return saved ? (JSON.parse(saved) as Order[]) : MOCK_ORDERS;
    } catch {
      return MOCK_ORDERS;
    }
  });
  const [addOpen, setAddOpen] = useState(false);
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);
  const [form, setForm] = useState(EMPTY_ORDER);
  const [items, setItems] = useState<OrderItem[]>([{ ...EMPTY_ITEM }]);

  const saveOrders = (updated: Order[]) => {
    localStorage.setItem("gemora_orders", JSON.stringify(updated));
    setOrders(updated);
  };

  const updateOrderStatus = (id: string, newStatus: OrderStatus) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: newStatus } : o,
    );
    saveOrders(updated);
    if (detailOrder?.id === id) {
      setDetailOrder((prev) => (prev ? { ...prev, status: newStatus } : prev));
    }
  };

  const addItem = () => setItems((prev) => [...prev, { ...EMPTY_ITEM }]);
  const removeItem = (idx: number) =>
    setItems((prev) => prev.filter((_, i) => i !== idx));
  const updateItem = (idx: number, field: keyof OrderItem, val: string) =>
    setItems((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: val } : item)),
    );

  const addOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: Order = {
      id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
      ...form,
      items: items.filter((it) => it.name.trim()),
      createdAt: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
    const updated = [newOrder, ...orders];
    saveOrders(updated);
    setForm(EMPTY_ORDER);
    setItems([{ ...EMPTY_ITEM }]);
    setAddOpen(false);
  };

  return (
    <AdminLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2 style={{ color: "#1A237E", fontSize: 22, fontWeight: 700 }}>
          Export Orders
        </h2>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              style={{
                background: "#1A237E",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "8px 18px",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
              data-ocid="admin.orders.open_modal_button"
            >
              + Add Order
            </button>
          </DialogTrigger>
          <DialogContent
            style={{ maxWidth: 600, maxHeight: "90vh", overflowY: "auto" }}
          >
            <DialogHeader>
              <DialogTitle>Add Export Order</DialogTitle>
            </DialogHeader>
            <form onSubmit={addOrder} className="space-y-3 mt-2">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <div>
                  <Label>Buyer Name *</Label>
                  <input
                    style={inputStyle}
                    value={form.buyer}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, buyer: e.target.value }))
                    }
                    required
                    data-ocid="admin.orders.input"
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <input
                    style={inputStyle}
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <input
                    style={inputStyle}
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label>Country *</Label>
                  <input
                    style={inputStyle}
                    value={form.country}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, country: e.target.value }))
                    }
                    required
                  />
                </div>
                <div>
                  <Label>Amount</Label>
                  <input
                    style={inputStyle}
                    value={form.amount}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, amount: e.target.value }))
                    }
                    placeholder="$0.00"
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select
                    value={form.status}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, status: v as OrderStatus }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Address</Label>
                <textarea
                  style={{ ...inputStyle, minHeight: 60, resize: "vertical" }}
                  value={form.address}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, address: e.target.value }))
                  }
                  placeholder="Full shipping address"
                />
              </div>

              {/* Order Items */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Label>Order Items</Label>
                  <button
                    type="button"
                    onClick={addItem}
                    style={{
                      background: "#e8eaf6",
                      border: "1px solid #c5cae9",
                      color: "#1A237E",
                      borderRadius: 6,
                      padding: "4px 10px",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    + Add Item
                  </button>
                </div>
                {items.map((item, idx) => (
                  <div
                    key={String(idx)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 1fr auto",
                      gap: 6,
                      marginBottom: 6,
                    }}
                  >
                    <input
                      style={inputStyle}
                      placeholder="Item name"
                      value={item.name}
                      onChange={(e) => updateItem(idx, "name", e.target.value)}
                    />
                    <input
                      style={inputStyle}
                      placeholder="Qty"
                      value={item.qty}
                      onChange={(e) => updateItem(idx, "qty", e.target.value)}
                    />
                    <input
                      style={inputStyle}
                      placeholder="Price"
                      value={item.price}
                      onChange={(e) => updateItem(idx, "price", e.target.value)}
                    />
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        style={{
                          background: "crimson",
                          color: "#fff",
                          border: "none",
                          borderRadius: 6,
                          padding: "4px 8px",
                          fontSize: 14,
                          cursor: "pointer",
                        }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <Label>Notes</Label>
                <textarea
                  style={{ ...inputStyle, minHeight: 60, resize: "vertical" }}
                  value={form.notes}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, notes: e.target.value }))
                  }
                  placeholder="Special instructions, comments..."
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "#1A237E",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                }}
                data-ocid="admin.orders.submit_button"
              >
                Add Order
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div style={BOX}>
        <table
          style={{ width: "100%", borderCollapse: "collapse" }}
          data-ocid="admin.orders.table"
        >
          <thead>
            <tr>
              {[
                "Order ID",
                "Buyer",
                "Country",
                "Amount",
                "Status",
                "Date",
                "Update Status",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "8px 10px",
                    color: "#999",
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr
                key={order.id}
                style={{ borderBottom: "1px solid #f5f5f5" }}
                data-ocid={`admin.orders.item.${i + 1}`}
              >
                <td style={{ padding: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setDetailOrder(order)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#42A5F5",
                      fontFamily: "monospace",
                      fontSize: 13,
                      cursor: "pointer",
                      textDecoration: "underline",
                      padding: 0,
                    }}
                    data-ocid="admin.orders.open_modal_button"
                  >
                    {order.id}
                  </button>
                </td>
                <td
                  style={{
                    padding: "10px",
                    fontSize: 14,
                    color: "#222",
                    fontWeight: 500,
                  }}
                >
                  {order.buyer}
                </td>
                <td style={{ padding: "10px", fontSize: 13, color: "#666" }}>
                  {order.country}
                </td>
                <td
                  style={{
                    padding: "10px",
                    fontSize: 14,
                    color: "#1A237E",
                    fontWeight: 600,
                  }}
                >
                  {order.amount}
                </td>
                <td style={{ padding: "10px" }}>
                  <span
                    style={{
                      ...STATUS_COLORS[order.status],
                      fontSize: 12,
                      padding: "3px 10px",
                      borderRadius: 20,
                      fontWeight: 600,
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: "10px", fontSize: 12, color: "#999" }}>
                  {order.createdAt}
                </td>
                <td style={{ padding: "10px" }}>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value as OrderStatus)
                    }
                    style={{
                      background: "#f5f7ff",
                      border: "1px solid #c5cae9",
                      borderRadius: 6,
                      padding: "4px 8px",
                      color: "#1A237E",
                      fontSize: 12,
                      cursor: "pointer",
                      outline: "none",
                    }}
                    data-ocid={`admin.orders.select.${i + 1}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {detailOrder && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(13,21,84,0.6)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={(e) => e.target === e.currentTarget && setDetailOrder(null)}
          onKeyDown={(e) => e.key === "Escape" && setDetailOrder(null)}
          data-ocid="admin.orders.modal"
        >
          <div
            style={{
              background: "#fff",
              border: "1px solid #c5cae9",
              borderRadius: 16,
              padding: 28,
              maxWidth: 580,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 20,
              }}
            >
              <div>
                <p
                  style={{
                    color: "#999",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Order Details
                </p>
                <h3 style={{ color: "#1A237E", fontWeight: 700, fontSize: 20 }}>
                  {detailOrder.id}
                </h3>
                <p style={{ color: "#888", fontSize: 12, marginTop: 2 }}>
                  Placed on {detailOrder.createdAt}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Inline status update in modal */}
                <div>
                  <p style={{ color: "#999", fontSize: 10, marginBottom: 4 }}>
                    Update Status
                  </p>
                  <select
                    value={detailOrder.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as OrderStatus;
                      updateOrderStatus(detailOrder.id, newStatus);
                    }}
                    style={{
                      background: detailOrder.status
                        ? STATUS_COLORS[detailOrder.status].bg
                        : "#f5f7ff",
                      border: "1px solid #c5cae9",
                      borderRadius: 8,
                      padding: "5px 10px",
                      color: detailOrder.status
                        ? STATUS_COLORS[detailOrder.status].color
                        : "#1A237E",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      outline: "none",
                    }}
                    data-ocid="admin.orders.modal_select"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => setDetailOrder(null)}
                  style={{
                    background: "#f5f7ff",
                    border: "1px solid #c5cae9",
                    color: "#666",
                    borderRadius: 8,
                    padding: "6px 12px",
                    fontSize: 16,
                    cursor: "pointer",
                    alignSelf: "flex-end",
                  }}
                  data-ocid="admin.orders.close_button"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Buyer Info */}
            <div
              style={{
                background: "#f5f7ff",
                borderRadius: 10,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <p
                style={{
                  color: "#1A237E",
                  fontWeight: 600,
                  fontSize: 13,
                  marginBottom: 10,
                }}
              >
                👤 Buyer Information
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                <div>
                  <p style={{ color: "#999", fontSize: 11 }}>Name</p>
                  <p style={{ color: "#222", fontSize: 14 }}>
                    {detailOrder.buyer}
                  </p>
                </div>
                <div>
                  <p style={{ color: "#999", fontSize: 11 }}>Country</p>
                  <p style={{ color: "#222", fontSize: 14 }}>
                    {detailOrder.country}
                  </p>
                </div>
                <div>
                  <p style={{ color: "#999", fontSize: 11 }}>Email</p>
                  <p style={{ color: "#444", fontSize: 13 }}>
                    {detailOrder.email || "—"}
                  </p>
                </div>
                <div>
                  <p style={{ color: "#999", fontSize: 11 }}>Phone</p>
                  <p style={{ color: "#444", fontSize: 13 }}>
                    {detailOrder.phone || "—"}
                  </p>
                </div>
              </div>
              {detailOrder.address && (
                <div style={{ marginTop: 8 }}>
                  <p style={{ color: "#999", fontSize: 11 }}>
                    Shipping Address
                  </p>
                  <p style={{ color: "#444", fontSize: 13, lineHeight: 1.5 }}>
                    {detailOrder.address}
                  </p>
                </div>
              )}
            </div>

            {/* Order Items */}
            {detailOrder.items.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <p
                  style={{
                    color: "#1A237E",
                    fontWeight: 600,
                    fontSize: 13,
                    marginBottom: 10,
                  }}
                >
                  📦 Order Items
                </p>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Item", "Qty", "Unit Price"].map((h) => (
                        <th
                          key={h}
                          style={{
                            textAlign: "left",
                            padding: "6px 8px",
                            color: "#999",
                            fontSize: 11,
                            fontWeight: 600,
                            borderBottom: "1px solid #e0e0e0",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {detailOrder.items.map((item, _idx) => (
                      <tr
                        key={item.name + String(_idx)}
                        style={{ borderBottom: "1px solid #f5f5f5" }}
                      >
                        <td
                          style={{
                            padding: "8px",
                            fontSize: 13,
                            color: "#333",
                          }}
                        >
                          {item.name}
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            fontSize: 13,
                            color: "#666",
                          }}
                        >
                          {item.qty}
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            fontSize: 13,
                            color: "#1A237E",
                          }}
                        >
                          {item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Total + Notes */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #e0e0e0",
                paddingTop: 12,
              }}
            >
              <div>
                {detailOrder.notes && (
                  <p style={{ color: "#888", fontSize: 12 }}>
                    📝 {detailOrder.notes}
                  </p>
                )}
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ color: "#999", fontSize: 11 }}>Total Amount</p>
                <p style={{ color: "#1A237E", fontSize: 20, fontWeight: 700 }}>
                  {detailOrder.amount}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
