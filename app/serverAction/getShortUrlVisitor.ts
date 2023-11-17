"use server";
import prisma from "../../lib/db";

const getShortUrlVisitor = async (short_url_code: string) => {
  const details = await prisma.visitorDetails.findMany({
    where: {
      AND: [
        {
          short_url_code: short_url_code,
        },
      ],
    },
  });

  let locations: string[] = [];
  let devices: string[] = [];
  let browsers: string[] = [];

  details.forEach((detail) => {
    locations.push(detail.location);
    devices.push(detail.device);
    browsers.push(detail.browser);
  });

  // Find common devices and locations
  const commonDevices = Array.from(new Set(details.map((item) => item.device)));
  const commonLocations = Array.from(
    new Set(details.map((item) => item.location))
  );

  // Calculate total visit count for the given short code
  const totalVisitCount = details.reduce((total, item) => {
    if (item.short_url_code === short_url_code) {
      return total + item.visit_count;
    }
    return total;
  }, 0);

  return {
    visit_count: totalVisitCount,
    devices: commonDevices,
    locations: commonLocations,
    browsers: browsers,
  };
};

export { getShortUrlVisitor };
