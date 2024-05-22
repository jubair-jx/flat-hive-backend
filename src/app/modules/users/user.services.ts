import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
type TInputData = {
  name: string;
  email: string;
  password: string;
  bio?: string;
  profession?: string;
  address?: string;
};

const createUserIntoDB = async (body: TInputData) => {
  const { name, email, password, bio, profession, address } = body;

  const hashPassword = await bcrypt.hash(password, 12);

  const userData = {
    name,
    email,
    password: hashPassword,
  };

  const result = await prisma.$transaction(async (tsClient) => {
    const createUser = await tsClient.user.create({
      data: userData,
    });

    const createUserProfile = await tsClient.userProfile.create({
      data: {
        user: {
          connect: {
            id: createUser.id,
          },
        },
        bio,
        profession,
        address,
      },
    });
    return { createUserProfile, createUser };
  });

  return result;
};

export const userServices = {
  createUserIntoDB,
};
