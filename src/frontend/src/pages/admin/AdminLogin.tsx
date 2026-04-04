import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Gemora@2024";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem("adminSession", "true");
      navigate("/admin");
    } else {
      toast.error("Invalid username or password.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at 20% 50%, #1A237E 0%, #0d1554 60%, #000a2e 100%)",
      }}
    >
      <div className="relative w-full max-w-md px-4">
        <div className="text-center mb-8">
          <img
            src="/assets/uploads/logo-removebg-preview-1.png"
            alt="Gemora Global"
            style={{ height: "72px", width: "auto", objectFit: "contain" }}
            className="mx-auto mb-4"
          />
          <p className="text-sky-400/60 text-sm tracking-widest uppercase">
            Admin Portal
          </p>
        </div>
        <div
          className="rounded-2xl p-8"
          style={{
            background:
              "linear-gradient(135deg, rgba(26,35,126,0.9) 0%, rgba(13,21,84,0.95) 100%)",
            border: "1px solid rgba(66,165,245,0.25)",
            boxShadow:
              "0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(66,165,245,0.1)",
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
          <p className="text-sky-400/50 text-sm mb-8">
            Sign in to manage your store
          </p>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label className="text-sky-200/70 text-sm mb-2 block">
                Username
              </Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                autoComplete="username"
                className="bg-black/30 border-sky-400/20 text-white placeholder:text-white/30 focus:border-sky-400/60 h-11"
              />
            </div>
            <div>
              <Label className="text-sky-200/70 text-sm mb-2 block">
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
                  className="bg-black/30 border-sky-400/20 text-white placeholder:text-white/30 focus:border-sky-400/60 h-11 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-400/40 hover:text-sky-400/80 text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold mt-2"
              style={{
                background: "linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)",
                color: "#fff",
              }}
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
