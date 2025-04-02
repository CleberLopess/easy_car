import {
  ServiceList,
  ServiceInsert,
  ServiceDelete,
  ServiceFinished,
  ServiceListForDriver,
  ServiceAccepted,
  ServiceCancel,
} from "../services/service.ride.js";

export const ControllerList = async (req, res) => {
  try {
    const {
      passenger_user_id,
      pickup_date,
      ride_id,
      driver_user_id,
      status,
      status_not,
    } = req.query;

    const rides = await ServiceList(
      passenger_user_id,
      pickup_date,
      ride_id,
      driver_user_id,
      status,
      status_not
    );
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const ControllerInsert = async (req, res) => {
  try {
    const {
      passenger_user_id,
      pickup_address,
      dropoff_address,
      pickup_latitude,
      pickup_longitude,
    } = req.body;

    const rides = await ServiceInsert(
      passenger_user_id,
      pickup_address,
      pickup_latitude,
      pickup_longitude,
      dropoff_address
    );
    res.status(201).json(rides);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const ControllerDelete = async (req, res) => {
  try {
    const { ride_id } = req.params;

    const rides = await ServiceDelete(ride_id);
    res.status(200).json({ rides });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const ControllerFinished = async (req, res) => {
  try {
    const { ride_id } = req.params;
    const { passenger_user_id } = req.body;

    const ride = await ServiceFinished(ride_id, passenger_user_id);
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const ControllerListForDriver = async (req, res) => {
  try {
    const { driver_user_id } = req.params;

    const rides = await ServiceListForDriver(driver_user_id);
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const ControllerListRideDetails = async (req, res) => {
  try {
    const { ride_id } = req.params;

    const ride = await ServiceList(null, null, ride_id, null, null);
    res.status(200).json(ride[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const ControllerAccepted = async (req, res) => {
  try {
    const { ride_id } = req.params;
    const { driver_user_id } = req.body;

    const ride = await ServiceAccepted(ride_id, driver_user_id);
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const ControllerCancel = async (req, res) => {
  try {
    const { ride_id } = req.params;

    const ride = await ServiceCancel(ride_id);
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json(error);
  }
};
