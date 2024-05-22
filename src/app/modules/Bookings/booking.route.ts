import { Router } from "express";
import auth from "../../middlewares/auth";
import { bookingsControlller } from "./booking.controller";

const bookingRoutes = Router();

bookingRoutes.post("/", auth(), bookingsControlller.bookingFlat);
bookingRoutes.get("/", auth(), bookingsControlller.getAllFlats);
bookingRoutes.put(
  "/:bookingId",
  auth(),
  bookingsControlller.UpdateFlatBookingStatus
);

export default bookingRoutes;
