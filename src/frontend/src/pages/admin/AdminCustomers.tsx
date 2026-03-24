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

type LeadStatus = "Hot Lead" | "Cold Lead";

interface Customer {
  name: string;
  country: string;
  email: string;
  whatsapp: string;
  businessType: string;
  leadStatus: LeadStatus;
}

const MOCK_CUSTOMERS: Customer[] = [
  {
    name: "Jean-Pierre Martin",
    country: "France",
    email: "jp@boutiqueparis.fr",
    whatsapp: "+33612345678",
    businessType: "Boutique Retailer",
    leadStatus: "Hot Lead",
  },
  {
    name: "Fatima Al-Mansoori",
    country: "UAE",
    email: "fatima@goldensouq.ae",
    whatsapp: "+971501234567",
    businessType: "Wholesale Distributor",
    leadStatus: "Hot Lead",
  },
  {
    name: "Emma Thompson",
    country: "UK",
    email: "emma@luxjewels.co.uk",
    whatsapp: "+447700900123",
    businessType: "Online Retailer",
    leadStatus: "Cold Lead",
  },
];

const EMPTY: Customer = {
  name: "",
  country: "",
  email: "",
  whatsapp: "",
  businessType: "",
  leadStatus: "Cold Lead",
};

const BOX = {
  background: "#111",
  border: "1px solid #222",
  borderRadius: 12,
  padding: 20,
} as const;

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Customer>(EMPTY);

  const addCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomers((prev) => [...prev, form]);
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
          Customers / Buyers
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
              data-ocid="admin.customers.open_modal_button"
            >
              + Add Customer
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Customer / Buyer</DialogTitle>
            </DialogHeader>
            <form onSubmit={addCustomer} className="space-y-3 mt-2">
              <div>
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  required
                  data-ocid="admin.customers.input"
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
                <Label>Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>WhatsApp</Label>
                <Input
                  value={form.whatsapp}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, whatsapp: e.target.value }))
                  }
                  placeholder="+1234567890"
                />
              </div>
              <div>
                <Label>Business Type</Label>
                <Input
                  value={form.businessType}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, businessType: e.target.value }))
                  }
                  placeholder="e.g. Wholesale Distributor"
                />
              </div>
              <div>
                <Label>Lead Status</Label>
                <Select
                  value={form.leadStatus}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, leadStatus: v as LeadStatus }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hot Lead">🔥 Hot Lead</SelectItem>
                    <SelectItem value="Cold Lead">❄️ Cold Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground"
                data-ocid="admin.customers.submit_button"
              >
                Add Customer
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div style={BOX}>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}
            data-ocid="admin.customers.table"
          >
            <thead>
              <tr>
                {[
                  "Name",
                  "Country",
                  "Email",
                  "WhatsApp",
                  "Business Type",
                  "Lead Status",
                ].map((h) => (
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
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => (
                <tr
                  key={`${c.email}-${c.name}`}
                  style={{ borderBottom: "1px solid #1a1a1a" }}
                  data-ocid={`admin.customers.item.${i + 1}`}
                >
                  <td
                    style={{
                      padding: "10px",
                      fontSize: 14,
                      color: "#ddd",
                      fontWeight: 500,
                    }}
                  >
                    {c.name}
                  </td>
                  <td style={{ padding: "10px", fontSize: 13, color: "#aaa" }}>
                    {c.country}
                  </td>
                  <td style={{ padding: "10px", fontSize: 12, color: "#888" }}>
                    {c.email}
                  </td>
                  <td style={{ padding: "10px", fontSize: 12, color: "#888" }}>
                    {c.whatsapp}
                  </td>
                  <td style={{ padding: "10px", fontSize: 12, color: "#aaa" }}>
                    {c.businessType}
                  </td>
                  <td style={{ padding: "10px" }}>
                    <span
                      style={{
                        background:
                          c.leadStatus === "Hot Lead"
                            ? "rgba(255,80,80,0.15)"
                            : "rgba(100,150,255,0.15)",
                        color:
                          c.leadStatus === "Hot Lead" ? "#ff6b6b" : "#6b9fff",
                        fontSize: 12,
                        padding: "3px 10px",
                        borderRadius: 20,
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.leadStatus === "Hot Lead" ? "🔥" : "❄️"} {c.leadStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
