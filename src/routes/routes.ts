import { Router } from "express";
import bookingRoutes from "../app/modules/Bookings/booking.route";
import flatRoutes from "../app/modules/Flat/flat.route";
import profileRoutes from "../app/modules/Profile/profile.route";
import authRoutes from "../app/modules/auth/auth.route";
import userRoutes from "../app/modules/users/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/register",
    route: userRoutes,
  },
  {
    path: "/login",
    route: authRoutes,
  },
  {
    path: "/flats",
    route: flatRoutes,
  },
  {
    path: "/booking-applications",
    route: bookingRoutes,
  },
  {
    path: "/booking-requests",
    route: bookingRoutes,
  },
  {
    path: "/profile",
    route: profileRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
