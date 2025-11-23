import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface Reservation {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  number_of_guests: number;
  reservation_date: string;
  reservation_time: string;
  status: string;
  special_requests: string | null;
  created_at: string;
}

export default function ReservationManagement() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetchReservations();
    
    const channel = supabase
      .channel('reservations')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reservations' }, () => {
        fetchReservations();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchReservations = async () => {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("reservation_date", { ascending: true })
      .order("reservation_time", { ascending: true });
    
    if (error) {
      toast.error("Failed to load reservations");
    } else {
      setReservations(data || []);
    }
  };

  const updateReservationStatus = async (reservationId: string, newStatus: "pending" | "confirmed" | "cancelled") => {
    const { error } = await supabase
      .from("reservations")
      .update({ status: newStatus })
      .eq("id", reservationId);
    
    if (error) {
      toast.error("Failed to update reservation status");
    } else {
      toast.success("Reservation status updated");
      fetchReservations();
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Reservation Management</h1>
      
      <div className="space-y-4">
        {reservations.map((reservation) => (
          <Card key={reservation.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold">{reservation.customer_name}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(reservation.reservation_date).toLocaleDateString()} at {reservation.reservation_time}
                  </div>
                </div>
                <Badge className={getStatusColor(reservation.status)}>
                  {reservation.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm"><strong>Email:</strong> {reservation.customer_email}</p>
                  <p className="text-sm"><strong>Phone:</strong> {reservation.customer_phone}</p>
                  <p className="text-sm"><strong>Guests:</strong> {reservation.number_of_guests}</p>
                  {reservation.special_requests && (
                    <p className="text-sm"><strong>Special Requests:</strong> {reservation.special_requests}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Select
                    value={reservation.status}
                    onValueChange={(value) => updateReservationStatus(reservation.id, value as "pending" | "confirmed" | "cancelled")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
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
