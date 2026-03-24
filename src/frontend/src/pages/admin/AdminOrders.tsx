import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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

interface Order {
  id: string;
  buyer: string;
  country: string;
  amount: string;
  status: OrderStatus;
}

const STATUS_COLORS: Record<OrderStatus, { bg: string; color: string }> = {
  Pending: { bg: "rgba(255,200,0,0.15)", color: "gold" },
  Processing: { bg: "rgba(100,150,255,0.15)", color: "#6b9fff" },
  Shipped: { bg: "rgba(180,100,255,0.15)", color: "#c084fc" },
  Delivered: { bg: "rgba(100,220,150,0.15)", color: "#6fcf97" },
};

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-001",
    buyer: "Jean Dupont",
    country: "France",
    amount: "$2,400",
    status: "Delivered",
  },
  {
    id: "ORD-002",
    buyer: "Fatima Al-Rashid",
    country: "UAE",
    amount: "$1,800",
    status: "Shipped",
  },
  {
    id: "ORD-003",
    buyer: "Sarah Johnson",
    country: "USA",
    amount: "$3,200",
    status: "Processing",
  },
];

const EMPTY = {
  buyer: "",
  country: "",
  amount: "",
  status: "Pending" as OrderStatus,
};

const BOX = {
  background: "#111",
  border: "1px solid #222",
  borderRadius: 12,
  padding: 20,
} as const;

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const addOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: Order = {
      id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
      ...form,
    };
    setOrders((prev) => [...prev, newOrder]);
    setForm(EMPTY);
    setOpen(false);
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
        <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>
          Export Orders
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              style={{
                background: "gold",
                color: "#111",
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Export Order</DialogTitle>
            </DialogHeader>
            <form onSubmit={addOrder} className="space-y-3 mt-2">
              <div>
                <Label>Buyer Name</Label>
                <Input
                  value={form.buyer}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, buyer: e.target.value }))
                  }
                  required
                  data-ocid="admin.orders.input"
                />
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  value={form.country}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, country: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <Label>Amount</Label>
                <Input
                  value={form.amount}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, amount: e.target.value }))
                  }
                  placeholder="$0.00"
                  required
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
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground"
                data-ocid="admin.orders.submit_button"
              >
                Add Order
              </Button>
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
              {["Order ID", "Buyer", "Country", "Amount", "Status"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "8px 10px",
                    color: "#666",
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    borderBottom: "1px solid #222",
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
                style={{ borderBottom: "1px solid #1a1a1a" }}
                data-ocid={`admin.orders.item.${i + 1}`}
              >
                <td
                  style={{
                    padding: "10px",
                    fontSize: 13,
                    color: "#aaa",
                    fontFamily: "monospace",
                  }}
                >
                  {order.id}
                </td>
                <td
                  style={{
                    padding: "10px",
                    fontSize: 14,
                    color: "#ddd",
                    fontWeight: 500,
                  }}
                >
                  {order.buyer}
                </td>
                <td style={{ padding: "10px", fontSize: 13, color: "#aaa" }}>
                  {order.country}
                </td>
                <td
                  style={{
                    padding: "10px",
                    fontSize: 14,
                    color: "gold",
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
