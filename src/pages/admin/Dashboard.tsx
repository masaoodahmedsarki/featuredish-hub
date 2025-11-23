import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { UtensilsCrossed, ShoppingCart, Calendar, Settings } from "lucide-react";

export default function AdminDashboard() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-destructive">Access Denied</h1>
        <p className="text-muted-foreground mt-2">You need admin privileges to access this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/admin/menu">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <UtensilsCrossed className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Menu Items</CardTitle>
              <CardDescription>Manage restaurant menu</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/admin/orders">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <ShoppingCart className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Orders</CardTitle>
              <CardDescription>View and manage orders</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/admin/reservations">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Calendar className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Reservations</CardTitle>
              <CardDescription>Manage table bookings</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/admin/categories">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Settings className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Categories</CardTitle>
              <CardDescription>Manage menu categories</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
