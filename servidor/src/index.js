import express from "express";
import cors from "cors";
import {
  ControllerList,
  ControllerInsert,
  ControllerDelete,
  ControllerFinished,
  ControllerListForDriver,
  ControllerListRideDetails,
  ControllerAccepted,
  ControllerCancel,
} from "./controllers/controller.ride.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas...
app.get("/rides", ControllerList);
app.post("/rides", ControllerInsert);
app.delete("/rides/:ride_id", ControllerDelete);
app.get("/rides/:ride_id", ControllerListRideDetails);

app.put("/rides/:ride_id/finish", ControllerFinished);
app.get("/rides/drivers/:driver_user_id", ControllerListForDriver);
app.put("/rides/:ride_id/accept", ControllerAccepted);
app.put("/rides/:ride_id/cancel", ControllerCancel);

app.listen(3001, () => {
  console.log("App running port: 3001");
});
