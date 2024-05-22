import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userServices } from "./user.services";

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: {
      id: result.createUser.id,
      name: result.createUser.name,
      email: result.createUser.email,
      createdAt: result.createUser.createdAt,
      updatedAt: result.createUser.updatedAt,
    },
  });
});

export const userControllers = {
  createUser,
};
