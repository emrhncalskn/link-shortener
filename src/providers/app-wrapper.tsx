import QueryProvider from "@/lib/react-query";
import { Toaster } from "sonner";

export default function AppWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      {children}
      <Toaster richColors />
    </QueryProvider>
  );
}
