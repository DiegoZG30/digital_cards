"use client";

import { AdminLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Crown, Star, Clock, TrendingUp, Eye, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// Pricing constants
const PLAN_PRICES = {
  standard: 29,
  pro: 49,
} as const;

interface DashboardStats {
  totalUsers: number;
  proUsers: number;
  standardUsers: number;
  trialUsers: number;
  paidProUsers: number;
  paidStandardUsers: number;
  publishedCards: number;
  totalMRR: number;
  proMRR: number;
  standardMRR: number;
  recentSignups: Array<{
    id: string;
    email: string;
    created_at: string;
    plan: string;
  }>;
}

function StatCard({
  title,
  value,
  icon: Icon,
  color = "primary",
  subtitle,
  isLoading,
}: {
  title: string;
  value: number | string;
  icon: React.ElementType;
  color?: "primary" | "success" | "warning" | "info";
  subtitle?: string;
  isLoading?: boolean;
}) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    success: "bg-green-500/10 text-green-500",
    warning: "bg-amber-500/10 text-amber-500",
    info: "bg-blue-500/10 text-blue-500",
  };

  return (
    <Card className="bg-card border-border card-hover">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  const [realtimeStats, setRealtimeStats] = useState<DashboardStats | null>(null);

  // Fetch initial stats
  const { data: stats, isLoading, refetch } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async (): Promise<DashboardStats> => {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
  });

  const displayStats = realtimeStats || stats;

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "pro":
        return <Badge className="bg-primary text-primary-foreground">Pro</Badge>;
      case "standard":
        return <Badge variant="secondary">Standard</Badge>;
      default:
        return <Badge variant="outline">{plan}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Ahora mismo";
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    return `Hace ${diffDays}d`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Metricas en tiempo real de la plataforma
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            En vivo
          </div>
        </div>

        {/* Revenue Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="MRR Total"
            value={`$${displayStats?.totalMRR || 0}`}
            icon={DollarSign}
            color="success"
            subtitle={`${(displayStats?.paidProUsers || 0) + (displayStats?.paidStandardUsers || 0)} usuarios pagando`}
            isLoading={isLoading}
          />
          <StatCard
            title="Ingresos Pro"
            value={`$${displayStats?.proMRR || 0}`}
            icon={Crown}
            color="success"
            subtitle={`${displayStats?.paidProUsers || 0} usuarios x $${PLAN_PRICES.pro}`}
            isLoading={isLoading}
          />
          <StatCard
            title="Ingresos Standard"
            value={`$${displayStats?.standardMRR || 0}`}
            icon={Star}
            color="info"
            subtitle={`${displayStats?.paidStandardUsers || 0} usuarios x $${PLAN_PRICES.standard}`}
            isLoading={isLoading}
          />
        </div>

        {/* Main Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <StatCard
            title="Total Cuentas"
            value={displayStats?.totalUsers || 0}
            icon={Users}
            color="primary"
            subtitle="Usuarios registrados"
            isLoading={isLoading}
          />
          <StatCard
            title="Plan Pro"
            value={displayStats?.proUsers || 0}
            icon={Crown}
            color="success"
            subtitle={`${displayStats?.paidProUsers || 0} pagando`}
            isLoading={isLoading}
          />
          <StatCard
            title="Plan Standard"
            value={displayStats?.standardUsers || 0}
            icon={Star}
            color="info"
            subtitle={`${displayStats?.paidStandardUsers || 0} pagando`}
            isLoading={isLoading}
          />
          <StatCard
            title="En Prueba"
            value={displayStats?.trialUsers || 0}
            icon={Clock}
            color="warning"
            subtitle="Trial activo"
            isLoading={isLoading}
          />
          <StatCard
            title="Tarjetas Publicadas"
            value={displayStats?.publishedCards || 0}
            icon={Eye}
            color="primary"
            subtitle="Perfiles publicos"
            isLoading={isLoading}
          />
        </div>

        {/* Plan Distribution */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Distribucion de Planes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Pro Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pro</span>
                      <span className="font-medium">{displayStats?.proUsers || 0}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${displayStats?.totalUsers ? (displayStats.proUsers / displayStats.totalUsers) * 100 : 0}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Standard Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Standard</span>
                      <span className="font-medium">{displayStats?.standardUsers || 0}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${displayStats?.totalUsers ? (displayStats.standardUsers / displayStats.totalUsers) * 100 : 0}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Trial Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">En Prueba</span>
                      <span className="font-medium">{displayStats?.trialUsers || 0}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${displayStats?.totalUsers ? (displayStats.trialUsers / displayStats.totalUsers) * 100 : 0}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Signups */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Users className="h-5 w-5" />
                Registros Recientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  ))}
                </div>
              ) : displayStats?.recentSignups && displayStats.recentSignups.length > 0 ? (
                <div className="space-y-3">
                  {displayStats.recentSignups.slice(0, 5).map((signup) => (
                    <div
                      key={signup.id}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                          {signup.id.slice(0, 8)}...
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(signup.created_at)}
                        </span>
                      </div>
                      {getPlanBadge(signup.plan)}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No hay registros recientes
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
