"use client";

import { useState } from "react";
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

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Supabase auth entegrasyonu buraya gelecek
    setTimeout(() => setLoading(false), 1500);
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
