import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandelar from "./app/middlewares/globalError";
import notFoundRoute from "./app/middlewares/notFound";
import router from "./routes/routes";
const app: Application = express();
//cors for browser support
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//root routes
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Flat Sharing Server is running now" });
});

//main api endpoint
app.use("/api", router);

// global error handler
app.use(globalErrorHandelar);
//not found routes
app.use(notFoundRoute);

export default app;
