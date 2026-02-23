"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  Input,
  Label,
  Logo,
  Typography,
  PasswordInput,
} from "poyraz-ui/atoms";
import { Icon } from "@iconify/react";
import { useSupabase } from "@/lib/supabase/hooks";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { supabase } = useSupabase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push("/admin/projects");
      router.refresh(); // Refresh the router to update server components with the new session
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      {/* Logo */}
      <div className="flex justify-center">
        <Logo width={64} height={64} />
      </div>

      {/* Login Card */}
      <Card variant="bordered">
        <CardHeader className="text-center space-y-2">
          <Typography variant="h2">
            Admin{" "}
            <Typography
              variant="h2"
              component="span"
              secondaryFont
              className="text-red-600"
            >
              Panel
            </Typography>
          </Typography>
          <Typography variant="muted">
            İçeriklerinizi yönetmek için giriş yapın.
          </Typography>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-600 rounded-md border border-red-200 text-sm">
                {errorMsg}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@poyrazavsever.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <PasswordInput
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              Giriş Yap
              <Icon icon="mdi:arrow-right" className="ml-2 w-4 h-4" />
            </Button>

            <Typography variant="muted" className="text-center">
              Sadece yetkili kullanıcılar erişebilir.
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
