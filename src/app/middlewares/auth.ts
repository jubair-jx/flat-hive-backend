import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import catchAsync from "../../shared/catchAsync";
import prisma from "../../shared/prisma";

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        config.jwt.jwt_secret_key as string
      ) as JwtPayload;
    } catch (err) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }

    const { email } = decoded;

    const isExistUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!isExistUser) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User Not found");
    }
    // req.user = decoded as JwtPayload & { email: string };

    next();
  });
};

export default auth;
