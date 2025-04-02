import { execute } from "../database/sqlite.js";
import { CurrentDate } from "../utils/date.js";

export const RepositoryList = async (
  passenger_user_id,
  pickup_date,
  ride_id,
  driver_user_id,
  status,
  status_not
) => {
  let filtros = [];
  let whereClauses = [];

  let sql = `
  SELECT r.*, u.name as passenger_name, u.phone as passenger_phone, 
         ud.name as driver_name, ud.phone as driver_phone
  FROM rides r
  JOIN users u ON (u.user_id = r.passenger_user_id)
  LEFT JOIN users ud ON (ud.user_id = r.driver_user_id)
  WHERE 1=1`; // Melhor que `r.ride_id > 0` para evitar erro ao remover filtro

  if (passenger_user_id) {
    whereClauses.push(`r.passenger_user_id = ?`);
    filtros.push(passenger_user_id);
  }
  if (pickup_date) {
    whereClauses.push(`r.pickup_date = ?`);
    filtros.push(pickup_date);
  }
  if (ride_id) {
    whereClauses.push(`r.ride_id = ?`);
    filtros.push(ride_id);
  }
  if (driver_user_id) {
    whereClauses.push(`r.driver_user_id = ?`);
    filtros.push(driver_user_id);
  }
  if (status) {
    whereClauses.push(`r.status = ?`);
    filtros.push(status);
  }
  if (status_not) {
    whereClauses.push(`r.status != ?`);
    filtros.push(status_not);
  }

  // Adiciona os filtros na query final
  if (whereClauses.length > 0) {
    sql += " AND " + whereClauses.join(" AND ");
  }

  // Executa a query de forma segura
  const rides = await execute(sql, filtros);

  return rides;
};

export const RepositoryInsert = async (
  passenger_user_id,
  pickup_address,
  pickup_latitude,
  pickup_longitude,
  dropoff_address
) => {
  const sql = `INSERT INTO rides (passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address, pickup_date, status) VALUES (?, ?, ?, ?, ?, ?, 'pending') returning ride_id`;

  const params = [
    passenger_user_id,
    pickup_address,
    pickup_latitude,
    pickup_longitude,
    dropoff_address,
    CurrentDate({ format: "YYYY-MM-DD" }),
  ];
  const ride = await execute(sql, params);

  return ride[0];
};

export const RepositoryDelete = async (ride_id) => {
  const sql = `DELETE FROM rides WHERE ride_id = ?`;

  await execute(sql, [ride_id]);

  return { ride_id };
};

export const RepositoryFinished = async (ride_id, passenger_user_id) => {
  const sql = `UPDATE rides SET status = 'finished' WHERE ride_id = ? AND passenger_user_id = ?`;

  await execute(sql, [ride_id, passenger_user_id]);

  return { ride_id }; // Retorna o id da corrida atualizada
};

export const RepositoryListForDriver = async (driver_user_id) => {
  let sql = `
  SELECT r.*, u.name as passenger_name, u.phone as passenger_phone
  FROM rides r
  JOIN users u ON u.user_id = r.passenger_user_id
  WHERE r.pickup_date = CURRENT_DATE
  AND r.driver_user_id = ?
  
  UNION
  
  SELECT r.*, u.name as passenger_name, u.phone as passenger_phone
  FROM rides r
  JOIN users u ON u.user_id = r.passenger_user_id
  WHERE r.pickup_date = CURRENT_DATE
  AND r.driver_user_id IS NULL`;

  const rides = await execute(sql, [driver_user_id]);

  return rides;
};

export const RepositoryAccepted = async (ride_id, driver_user_id) => {
  const sql = `UPDATE rides SET status = 'accepted', driver_user_id = ? WHERE ride_id = ?`;

  await execute(sql, [driver_user_id, ride_id]);

  return { ride_id };
};

export const RepositoryCancel = async (ride_id) => {
  const sql = `UPDATE rides SET status = 'pending', driver_user_id = null WHERE ride_id = ?`;

  await execute(sql, [ride_id]);

  return { ride_id };
};
