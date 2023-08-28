"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../lib/db";

export const submitForm = async (data: any) => {
  try {
    // const createdUrl = await prisma.shortenedURL.create({
    //   data: data,
    // });
    // console.log("createdUrl(6)", createdUrl);

    console.log("data type", typeof data);
    console.log("data", data);
    revalidatePath("/");
    return { status: 200, message: "success" };
  } catch (error) {
    return { status: 500, message: "Server error. please try again !" };
  }
};
