import { Skeleton } from "@/components/ui/skeleton";
import { type ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function AdminGuard({ children }: { children: ReactNode }) {
  const [checked, setChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem("adminSession");
    setIsAdmin(session === "true");
    setChecked(true);
  }, []);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Skeleton className="h-12 w-48" />
      </div>
    );
  }

  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}
