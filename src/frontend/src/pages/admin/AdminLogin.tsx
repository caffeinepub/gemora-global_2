import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useActor } from "../../hooks/useActor";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";

export default function AdminLogin() {
  const { login, isLoggingIn } = useInternetIdentity();
  const { actor } = useActor();
  const navigate = useNavigate();

  useEffect(() => {
    if (actor) {
      actor
        .isCallerAdmin()
        .then((isAdmin) => {
          if (isAdmin) navigate("/admin");
        })
        .catch(() => {});
    }
  }, [actor, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-sm border-border">
        <CardHeader className="text-center">
          <div className="font-serif text-2xl font-bold text-primary mb-1">
            GEMORA GLOBAL
          </div>
          <CardTitle className="text-base font-normal text-muted-foreground">
            Admin Panel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Login with Internet Identity to access the admin dashboard.
          </p>
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => login()}
            disabled={isLoggingIn}
            data-ocid="admin.login_button"
          >
            {isLoggingIn ? "Connecting..." : "Login with Internet Identity"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
