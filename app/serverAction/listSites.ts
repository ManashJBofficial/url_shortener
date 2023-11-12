"use server";
import prisma from "../../lib/db";

interface ListSitesResult {
  data: {
    id: string;
    long_url: string;
    short_code: string;
    userIdNo: string;
    created_at: Date;
  }[];
  total: number;
}

const listSites = async (
  authUserId: string,
  page: number,
  pageSize: number
) => {
  const offset = (page - 1) * pageSize;

  // Use Prisma to fetch data with limit, offset, and ordering by createdAt
  const siteList = await prisma.shortenedURLPrivate.findMany({
    where: { userIdNo: authUserId as string },
    take: pageSize,
    skip: offset,
    orderBy: {
      created_at: "asc",
    },
  });

  // Get the total count without applying pagination
  const totalItemsCount = await prisma.shortenedURLPrivate.count({
    where: { userIdNo: authUserId as string },
  });

  // Adding the total count to each item in the result
  const resultWithTotal: ListSitesResult = {
    data: siteList,
    total: totalItemsCount,
  };

  return resultWithTotal;
};

export { listSites };
