import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import verifyToken from "../../../helpers/verifyToken";
import { TAuthUser } from "../../../interface/common";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { profileServices } from "./profile.services";

const getAllProfiles = catchAsync(async (req, res) => {
  const result = await profileServices.getAllProfilesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const token = req.headers.authorization as string;
  const userCheck = verifyToken(token, config.jwt.jwt_secret_key as string);
  const result = await profileServices.updateUserProfileIntoDB(
    userCheck,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});
const getMyUserProfile = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user;
    const result = await profileServices.getMyProfileFromDB(user as TAuthUser);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile fetched successfully",
      data: result,
    });
  }
);
export const profileControllers = {
  getAllProfiles,
  updateProfile,
  getMyUserProfile,
};
