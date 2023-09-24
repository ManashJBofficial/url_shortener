"use server";
import prisma from "../../lib/db";

const listSites = async (authUserId: string) => {
  const siteList = await prisma.shortenedURLPrivate.findMany({
    where: { userIdNo: authUserId as string },
  });
  // console.log("siteList", siteList);
  return siteList;
};

export { listSites };
