import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum RoutesEnums {
  Home = "Home",
  Passenger = "Passenger",
  Ride = "Ride",
  RideDetail = "RideDetail",
}

type RootStackParamList = {
  [RoutesEnums.Home]: undefined;
  [RoutesEnums.Passenger]: undefined;
  [RoutesEnums.Ride]: undefined;
  [RoutesEnums.RideDetail]: { id: number };
};

export type ScreenRideDetail = NativeStackScreenProps<
  RootStackParamList,
  RoutesEnums.RideDetail
>;
