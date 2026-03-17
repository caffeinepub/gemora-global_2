import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { useActor } from "../../hooks/useActor";

export default function AdminDashboard() {
  const { actor } = useActor();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => actor!.getDashboardStats(),
    enabled: !!actor,
  });

  const statCards = [
    {
      label: "Total Inquiries",
      value: stats ? String(stats.totalInquiries) : "-",
      to: "/admin/inquiries",
    },
    {
      label: "New Inquiries",
      value: stats ? String(stats.newInquiries) : "-",
      to: "/admin/inquiries",
    },
    {
      label: "Total Products",
      value: stats ? String(stats.totalProducts) : "-",
      to: "/admin/products",
    },
    {
      label: "Total Visits",
      value: stats ? String(stats.totalVisits) : "-",
      to: null,
    },
  ];

  return (
    <AdminLayout>
      <h1 className="font-serif text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <Card key={card.label} className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold text-primary">
                  {card.value}
                </div>
              )}
              {card.to && (
                <Link
                  to={card.to}
                  className="text-xs text-muted-foreground hover:text-primary"
                >
                  View &rarr;
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { label: "Manage Products", to: "/admin/products" },
          { label: "Manage Categories", to: "/admin/categories" },
          { label: "View Inquiries", to: "/admin/inquiries" },
          { label: "Manage Gallery", to: "/admin/gallery" },
          { label: "Edit Content", to: "/admin/content" },
          { label: "Testimonials", to: "/admin/testimonials" },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 text-sm font-medium transition-colors"
          >
            {item.label} &rarr;
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}
