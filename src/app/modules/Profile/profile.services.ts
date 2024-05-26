import { UserRole, UserStatus, Users } from "@prisma/client";
import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import { TAuthUser } from "../../../interface/common";
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
  const getSingleUser = (await prisma.users.findUnique({
    where: {
      email: userData.email,
    },
  })) as Users;

  const isExistUser = await prisma.users.findUnique({
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

const getMyProfileFromDB = async (user: TAuthUser) => {
  const userInfo = await prisma.userProfile.findFirstOrThrow({
    where: {
      user: {
        email: user?.email,
        status: UserStatus.ACTIVE,
      },
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          needPasswordChange: true,
          role: true,
          status: true,
        },
      },
    },
  });
  let userData;
  if (userInfo?.user?.role === UserRole.SUPER_ADMIN) {
    userData = await prisma.admin.findUnique({
      where: {
        email: userInfo?.user?.email,
      },
    });
  } else if (userInfo?.user?.role === UserRole.ADMIN) {
    userData = await prisma.admin.findUnique({
      where: {
        email: userInfo?.user?.email,
      },
    });
  } else if (userInfo?.user?.role === UserRole.USER) {
    userData = await prisma.normalUser.findUnique({
      where: {
        email: userInfo?.user?.email,
      },
    });
  }
  return {
    ...userData,
    ...userInfo,
  };
};

export const profileServices = {
  getAllProfilesFromDB,
  updateUserProfileIntoDB,
  getMyProfileFromDB,
};
