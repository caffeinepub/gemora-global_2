import { Skeleton } from "@/components/ui/skeleton";
import { type ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useActor } from "../hooks/useActor";

export default function AdminGuard({ children }: { children: ReactNode }) {
  const { actor, isFetching } = useActor();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (!actor) return;
    actor
      .isCallerAdmin()
      .then(setIsAdmin)
      .catch(() => setIsAdmin(false));
  }, [actor]);

  if (isFetching || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Skeleton className="h-12 w-48" />
      </div>
    );
  }

  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}
