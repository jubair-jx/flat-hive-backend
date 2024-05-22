import { Flat, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import { helperFunction } from "../../../helpers/calculate.pagination";
import { TpaginationItems } from "../../../interface/pagination.interface";
import prisma from "../../../shared/prisma";
import { flatSearchAbleFields } from "./flat.constant";

const createFlatIntoDB = async (body: Flat) => {
  const result = await prisma.flat.create({
    data: body,
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

const updateFlatIntoDB = async (id: string, body: any) => {
  const isExistFlat = await prisma.flat.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (!isExistFlat) {
    throw new AppError(httpStatus.NOT_FOUND, "This flat is not available");
  }

  const result = await prisma.flat.update({
    where: {
      id,
    },
    data: body,
  });

  return result;
};
export const flatServices = {
  createFlatIntoDB,
  getAllFlatFromDB,
  updateFlatIntoDB,
};
