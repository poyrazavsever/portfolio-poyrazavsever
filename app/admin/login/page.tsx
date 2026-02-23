import { PatternDots } from "poyraz-ui/atoms";
import { LoginForm } from "@/components/futures/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <PatternDots overlay opacity={0.05} size={24} color="#94a3b8" />
      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
