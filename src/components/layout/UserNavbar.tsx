"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  CreditCard,
  CreditCard as CardIcon,
  BarChart3,
  LogOut,
  ChevronDown,
  Shield,
  LayoutDashboard,
  Users,
  Palette,
  Mail,
  Webhook,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface UserNavbarProps {
  user?: {
    fullName: string;
    profileImage?: string;
    plan: "standard" | "pro";
  };
}

export function UserNavbar({ user }: UserNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut, isAdmin } = useAuth();

  // Demo user for preview
  const currentUser = user || {
    fullName: "Usuario Demo",
    plan: "pro" as const,
  };

  const isPro = currentUser.plan === "pro";

  const initials = currentUser.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const isActive = (path: string) => pathname === path;

  const adminLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Usuarios", icon: Users },
    { href: "/admin/templates", label: "Templates", icon: Palette },
    { href: "/admin/invitations", label: "Invitaciones", icon: Mail },
    { href: "/admin/webhooks", label: "Webhooks", icon: Webhook },
    { href: "/admin/settings", label: "Configuracion", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
      toast.success("Sesion cerrada correctamente");
    } catch (error) {
      console.error("Error al cerrar sesion:", error);
      toast.error("Error al cerrar sesion");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="p-1.5 bg-primary rounded-lg">
            <CreditCard className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient-gold">Biztec</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Button
            variant={isActive("/my-card") ? "secondary" : "ghost"}
            asChild
            className={cn(
              isActive("/my-card") && "text-primary"
            )}
          >
            <Link href="/my-card">
              <CardIcon className="mr-2 h-4 w-4" />
              Mi Tarjeta
            </Link>
          </Button>

          {isPro && (
            <Button
              variant={isActive("/my-analytics") ? "secondary" : "ghost"}
              asChild
              className={cn(
                isActive("/my-analytics") && "text-primary"
              )}
            >
              <Link href="/my-analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Mis Metricas
              </Link>
            </Button>
          )}

          {isAdmin && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={pathname?.startsWith("/admin") ? "secondary" : "ghost"}
                  className={cn(
                    "gap-1 border border-transparent",
                    pathname?.startsWith("/admin")
                      ? "text-amber-500 border-amber-500/30 bg-amber-500/10"
                      : "text-amber-500/80 hover:text-amber-500 hover:border-amber-500/20"
                  )}
                >
                  <Shield className="h-4 w-4" />
                  Admin
                  <ChevronDown className="h-3 w-3 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52 border-amber-500/20">
                <DropdownMenuLabel className="text-amber-500 text-xs uppercase tracking-wider">
                  Administracion
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {adminLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "cursor-pointer",
                        pathname === link.href && "bg-amber-500/10 text-amber-500"
                      )}
                    >
                      <link.icon className="mr-2 h-4 w-4" />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.profileImage} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium">
                {currentUser.fullName.split(" ")[0]}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{currentUser.fullName}</p>
              <p className="text-xs text-muted-foreground">
                Plan {isPro ? "Pro" : "Standard"}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="md:hidden">
              <Link href="/my-card">
                <CardIcon className="mr-2 h-4 w-4" />
                Mi Tarjeta
              </Link>
            </DropdownMenuItem>
            {isPro && (
              <DropdownMenuItem asChild className="md:hidden">
                <Link href="/my-analytics">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Mis Metricas
                </Link>
              </DropdownMenuItem>
            )}
            {isAdmin && (
              <>
                <DropdownMenuSeparator className="md:hidden" />
                <DropdownMenuLabel className="md:hidden text-amber-500 text-xs uppercase tracking-wider">
                  Admin
                </DropdownMenuLabel>
                {adminLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild className="md:hidden">
                    <Link
                      href={link.href}
                      className={cn(
                        "cursor-pointer",
                        pathname === link.href && "bg-amber-500/10 text-amber-500"
                      )}
                    >
                      <link.icon className="mr-2 h-4 w-4" />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </>
            )}
            <DropdownMenuSeparator className="md:hidden" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
