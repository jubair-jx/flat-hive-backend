import { User } from "@prisma/client";
import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import prisma from "../../../shared/prisma";

const getAllProfilesFromDB = async () => {
  const result = await prisma.userProfile.findMany({
    select: {
      id: true,
      user: true,
      bio: true,
      profession: true,
      address: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const updateUserProfileIntoDB = async (userData: any, body: any) => {
  const getSingleUser = (await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  })) as User;

  const isExistUser = await prisma.user.findUnique({
    where: {
      id: getSingleUser.id,
    },
  });

  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not available");
  }

  const result = await prisma.userProfile.update({
    where: {
      id: getSingleUser.id,
    },
    data: body,
  });
  return result;
};

export const profileServices = {
  getAllProfilesFromDB,
  updateUserProfileIntoDB,
};
