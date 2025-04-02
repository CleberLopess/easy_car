export type rideType = {
  ride_id: number;
  passenger_user_id: number;
  passenger_name: string;
  passenger_phone: string;
  pickup_address: string;
  pickup_date: string;
  pickup_latitude: string;
  pickup_longitude: string;
  dropoff_address: string;
  status: "pending" | "accepted" | "finished" | "canceled"; // Exemplo de possíveis status
  driver_user_id: number;
  driver_name: string | null;
  driver_phone: string | null;
};

export type responseRidesType = {
  data: rideType[];
};

export type responseRideType = {
  data: rideType;
};
