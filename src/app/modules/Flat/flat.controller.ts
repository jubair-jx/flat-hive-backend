import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pickFilterData from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import {
  flatFilterAbleFields,
  paginationFilteringfield,
} from "./flat.constant";
import { flatServices } from "./flat.services";

const createFlat = catchAsync(async (req, res) => {
  const result = await flatServices.createFlatIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Flat added successfully",
    data: result,
  });
});
const getAllFlats = catchAsync(async (req, res) => {
  const filters = pickFilterData(req.query, flatFilterAbleFields);

  const options = pickFilterData(req.query, paginationFilteringfield);
  const result = await flatServices.getAllFlatFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Flats retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});
const updateFlat = catchAsync(async (req, res) => {
  const { flatId } = req.params;
  const result = await flatServices.updateFlatIntoDB(flatId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Flat information updated successfully",
    data: result,
  });
});

export const flatControllers = {
  createFlat,
  getAllFlats,
  updateFlat,
};
