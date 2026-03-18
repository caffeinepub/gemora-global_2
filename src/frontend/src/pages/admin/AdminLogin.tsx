import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createActorWithConfig } from "../../config";

const BOKEH = [
  { w: 60, h: 60, l: 10, t: 20 },
  { w: 90, h: 90, l: 22, t: 45 },
  { w: 120, h: 120, l: 34, t: 20 },
  { w: 150, h: 150, l: 46, t: 45 },
  { w: 180, h: 180, l: 58, t: 20 },
  { w: 210, h: 210, l: 70, t: 45 },
  { w: 240, h: 240, l: 82, t: 20 },
];

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const actor = await createActorWithConfig();
      const valid = await actor.verifyAdminLogin(username, password);
      if (valid) {
        sessionStorage.setItem("adminSession", "true");
        navigate("/admin");
      } else {
        toast.error("Invalid username or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Connection error. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at 20% 50%, #2a1a0a 0%, #0d0804 60%, #000000 100%)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {BOKEH.map((b) => (
          <div
            key={`bokeh-${b.l}`}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${b.w}px`,
              height: `${b.h}px`,
              background: "radial-gradient(circle, #c9a84c, transparent)",
              left: `${b.l}%`,
              top: `${b.t}%`,
              filter: "blur(20px)",
            }}
          />
        ))}
      </div>
      <div className="relative w-full max-w-md px-4">
        <div className="text-center mb-8">
          <img
            src="/assets/uploads/logo-removebg-preview-1.png"
            alt="Gemora Global"
            style={{ height: "72px", width: "auto", objectFit: "contain" }}
            className="mx-auto mb-4"
          />
          <p className="text-amber-400/60 text-sm tracking-widest uppercase">
            Admin Portal
          </p>
        </div>
        <div
          className="rounded-2xl p-8"
          style={{
            background:
              "linear-gradient(135deg, rgba(42,26,10,0.9) 0%, rgba(20,12,4,0.95) 100%)",
            border: "1px solid rgba(201,168,76,0.25)",
            boxShadow:
              "0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,168,76,0.1)",
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
          <p className="text-amber-400/50 text-sm mb-8">
            Sign in to manage your store
          </p>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label className="text-amber-200/70 text-sm mb-2 block">
                Username
              </Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                autoComplete="username"
                data-ocid="admin.input"
                className="bg-black/30 border-amber-400/20 text-white placeholder:text-white/30 focus:border-amber-400/60 h-11"
              />
            </div>
            <div>
              <Label className="text-amber-200/70 text-sm mb-2 block">
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                  data-ocid="admin.input"
                  className="bg-black/30 border-amber-400/20 text-white placeholder:text-white/30 focus:border-amber-400/60 h-11 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400/40 hover:text-amber-400/80 text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-semibold mt-2"
              style={{
                background: "linear-gradient(135deg, #c9a84c 0%, #a07830 100%)",
                color: "#0d0804",
              }}
              data-ocid="admin.submit_button"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
