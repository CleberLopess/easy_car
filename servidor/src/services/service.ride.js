import {
  RepositoryList,
  RepositoryInsert,
  RepositoryDelete,
  RepositoryFinished,
  RepositoryListForDriver,
  RepositoryAccepted,
  RepositoryCancel,
} from "../repositories/repository.ride.js";
import { CurrentDate } from "../utils/date.js";

export const ServiceList = async (
  passenger_user_id,
  pickup_date,
  ride_id,
  driver_user_id,
  status,
  status_not
) => {
  const rides = await RepositoryList(
    passenger_user_id,
    pickup_date,
    ride_id,
    driver_user_id,
    status,
    status_not
  );

  return rides;
};

export const ServiceInsert = async (
  passenger_user_id,
  pickup_address,
  pickup_latitude,
  pickup_longitude,
  dropoff_address
) => {
  // Validação: O usuario so pode pedir uma carona por vez
  const searchRides = await ServiceList(
    passenger_user_id,
    CurrentDate({ format: "YYYY-MM-DD" }),
    null,
    null,
    null,
    "finished"
  );

  if (searchRides.length > 0) {
    throw "Vocẽ tem uma carona não finalizada no dia de hoje";
  }

  const ride = await RepositoryInsert(
    passenger_user_id,
    pickup_address,
    pickup_latitude,
    pickup_longitude,
    dropoff_address
  );

  return ride;
};

export const ServiceDelete = async (ride_id) => {
  const ride = await RepositoryDelete(ride_id);

  return ride;
};

export const ServiceFinished = async (ride_id, passenger_user_id) => {
  const ride = await RepositoryFinished(ride_id, passenger_user_id);

  return ride;
};

export const ServiceListForDriver = async (driver_user_id) => {
  const ride = await RepositoryListForDriver(driver_user_id);

  return ride;
};

export const ServiceAccepted = async (ride_id, driver_user_id) => {
  // Validação: O motorista so pode aceitar uma carona por vez
  const searchRides = await ServiceList(
    null,
    CurrentDate({ format: "YYYY-MM-DD" }),
    null,
    driver_user_id,
    "accepted",
    null
  );

  if (searchRides.length > 0) {
    throw (
      "Vocẽ tem uma carona aceita no dia de hoje para: " +
      searchRides[0].passenger_name +
      " em: " +
      searchRides[0].pickup_address
    );
  }

  const ride = await RepositoryAccepted(ride_id, driver_user_id);

  return ride;
};
export const ServiceCancel = async (ride_id) => {
  const ride = await RepositoryCancel(ride_id);

  return ride;
};
