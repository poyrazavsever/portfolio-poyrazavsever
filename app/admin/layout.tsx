import { TooltipProvider } from "poyraz-ui";
import { Toaster } from "poyraz-ui/molecules";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
      {children}
      <Toaster />
    </TooltipProvider>
  );
}
