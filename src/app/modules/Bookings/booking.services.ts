import { Status, User } from "@prisma/client";
import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import prisma from "../../../shared/prisma";

const bookingFlatIntoDB = async (body: any, userMail: any) => {
  const getSingleUser = (await prisma.user.findUnique({
    where: {
      email: userMail.email,
    },
  })) as User;

  const isExistFlat = await prisma.flat.findUniqueOrThrow({
    where: {
      id: body.flatId,
    },
  });

  if (!isExistFlat) {
    throw new AppError(httpStatus.NOT_FOUND, "This flat is not available");
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
