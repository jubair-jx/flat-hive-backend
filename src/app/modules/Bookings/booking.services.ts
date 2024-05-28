import { Status, Users } from "@prisma/client";
import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import prisma from "../../../shared/prisma";

const bookingFlatIntoDB = async (body: any, userMail: any) => {
  const getSingleUser = (await prisma.users.findUnique({
    where: {
      email: userMail.email,
    },
  })) as Users;
  if (!getSingleUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const isExitsFlat = await prisma.flat.findUnique({
    where: {
      id: body.flatId,
    },
  });
  if (!isExitsFlat) {
    throw new AppError(httpStatus.NOT_FOUND, "Flat not found");
  }

  const result = await prisma.booking.create({
    data: {
      userId: getSingleUser.id,
      flatId: body.flatId,
    },
  });
  return result;
};

const getAllBookingFlatFromDB = async () => {
  const result = await prisma.booking.findMany();
  return result;
};

const updateFlatBookingStatusIntoDB = async (
  id: string,
  fromStatus: { status: Status }
) => {
  const { status } = fromStatus;
  const isExistBookingFlat = await prisma.booking.findUnique({
    where: {
      id,
    },
  });
  if (!isExistBookingFlat) {
    throw new AppError(httpStatus.NOT_FOUND, "This flat is not available");
  }
  const changeFlatBookingStatus = await prisma.booking.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
  return changeFlatBookingStatus;
};

export const bookingServices = {
  bookingFlatIntoDB,
  getAllBookingFlatFromDB,
  updateFlatBookingStatusIntoDB,
};
