import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { authServices } from "./auth.services";

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginIntoDB(req.body);

  const { isExistUser, accessToken, refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      id: isExistUser?.id,
      name: isExistUser?.name,
      email: isExistUser?.email,
      token: accessToken,
    },
  });
});

export const authControllers = {
  loginUser,
};
