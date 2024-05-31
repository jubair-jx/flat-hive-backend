import { Flat, Prisma } from "@prisma/client";
import { helperFunction } from "../../../helpers/calculate.pagination";
import { TAuthUser } from "../../../interface/common";
import { TpaginationItems } from "../../../interface/pagination.interface";
import prisma from "../../../shared/prisma";
import { flatSearchAbleFields } from "./flat.constant";

const createFlatIntoDB = async (body: Flat) => {
  const result = await prisma.flat.create({
    data: {
      ...body,
      flatPhoto: body?.flatPhoto || [],
    },
  });

  return result;
};
const getAllFlatFromDB = async (params: any, options: TpaginationItems) => {
  const { searchTerm, availability, ...filterData } = params;
  const { limit, sortBy, sortOrder, skip, page } =
    helperFunction.calculatePaginationFiltering(options);

  const andCondition: Prisma.FlatWhereInput[] = [];
  //This condition for only search any items
  if (params?.searchTerm) {
    andCondition.push({
      OR: flatSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  // Condition for other filters
  if (availability !== undefined) {
    const availabilityBool = availability.toLowerCase() === "true";

    andCondition.push({
      availability: availabilityBool,
    });
  }

  //This condition for specific field, for example location, description, utilitiesDescription, etc
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.FlatWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.flat.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  const totalCount = await prisma.flat.count({
    where: whereCondition,
  });

  return {
    meta: {
      page,
      limit,
      totalCount,
    },

    data: result,
  };
};

const updateFlatIntoDB = async (id: string, body: Flat) => {
  const isExistFlat = await prisma.flat.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.flat.update({
    where: {
      id,
    },
    data: body,
  });

  return result;
};
const getMyFlatPostFromDB = async (user: TAuthUser) => {
  const result = await prisma.users.findUnique({
    where: {
      email: user?.email,
    },
    select: {
      flats: true,
      id: true,
      email: true,
      needPasswordChange: true,
      role: true,
      status: true,
    },
  });
  return result;
};
const deleteFlatById = async (id: string) => {
  const isExistFlat = await prisma.flat.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.$transaction(async (tx) => {
    await tx.booking.deleteMany({
      where: {
        flat: {
          id,
        },
      },
    });
    const deleteFlat = await tx.flat.delete({
      where: {
        id,
      },
      include: {},
    });
    return deleteFlat;
  });
  return result;
};
export const flatServices = {
  createFlatIntoDB,
  getAllFlatFromDB,
  updateFlatIntoDB,
  getMyFlatPostFromDB,
  deleteFlatById,
};
