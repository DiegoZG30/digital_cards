import { ReactNode } from "react";
import { UserNavbar } from "./UserNavbar";

interface UserLayoutProps {
  children: ReactNode;
}

export function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <UserNavbar />
      <main>{children}</main>
    </div>
  );
}
