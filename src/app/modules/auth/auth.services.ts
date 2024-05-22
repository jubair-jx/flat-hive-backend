import * as bcrypt from "bcrypt";
import httpStatus from "http-status";
import config from "../../../config";
import AppError from "../../../errors/AppError";
import generateToken from "../../../helpers/generateToken";
import prisma from "../../../shared/prisma";
import { TLogin } from "./auth.interface";
const loginIntoDB = async (payload: TLogin) => {
  const isExistUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload?.email,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload?.password,
    isExistUser.password
  );

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, "Your Password is incorrect,");
  }
  const accessToken = generateToken(
    { email: isExistUser.email },
    config.jwt.jwt_secret_key as string,
    config.jwt.jwt_expires_in as string
  );
  const refreshToken = generateToken(
    { email: isExistUser.email },
    config.jwt.refresh_token_key as string,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    isExistUser,
    accessToken,
    refreshToken,
  };
};

export const authServices = {
  loginIntoDB,
};
