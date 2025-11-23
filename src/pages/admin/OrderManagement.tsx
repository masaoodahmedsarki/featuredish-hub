import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  total_amount: number;
  status: string;
  created_at: string;
  delivery_address: string | null;
  notes: string | null;
}

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
    
    const channel = supabase
      .channel('orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchOrders();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      toast.error("Failed to load orders");
    } else {
      setOrders(data || []);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled") => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);
    
    if (error) {
      toast.error("Failed to update order status");
    } else {
      toast.success("Order status updated");
      fetchOrders();
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      preparing: "bg-purple-100 text-purple-800",
      ready: "bg-green-100 text-green-800",
      completed: "bg-gray-100 text-gray-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order Management</h1>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold">{order.customer_name}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleString()}
                  </div>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm"><strong>Email:</strong> {order.customer_email}</p>
                  {order.customer_phone && (
                    <p className="text-sm"><strong>Phone:</strong> {order.customer_phone}</p>
                  )}
                  {order.delivery_address && (
                    <p className="text-sm"><strong>Address:</strong> {order.delivery_address}</p>
                  )}
                  {order.notes && (
                    <p className="text-sm"><strong>Notes:</strong> {order.notes}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-bold">Total: ${order.total_amount.toFixed(2)}</p>
                  <Select
                    value={order.status}
                    onValueChange={(value) => updateOrderStatus(order.id, value as "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="preparing">Preparing</SelectItem>
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
