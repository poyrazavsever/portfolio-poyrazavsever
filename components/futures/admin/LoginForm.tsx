"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  Logo,
  Typography,
} from "poyraz-ui/atoms";
import { Github } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { signInWithGithub } = useAuth();

  const handleGithubLogin = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      await signInWithGithub("/admin/projects");
    } catch {
      setErrorMsg("Giriş yapılırken bir hata oluştu.");
      setLoading(false);
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

        <CardContent className="space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-600 rounded-md border border-red-200 text-sm">
              {errorMsg}
            </div>
          )}

          <Button
            size="lg"
            className="w-full gap-2"
            onClick={handleGithubLogin}
            loading={loading}
            disabled={loading}
          >
            <Github className="w-5 h-5" />
            GitHub ile Devam Et
          </Button>
        </CardContent>

        <CardFooter>
          <Typography variant="muted" className="text-center w-full">
            Sadece yetkili kullanıcılar erişebilir.
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
