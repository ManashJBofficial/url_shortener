"use server";
import prisma from "../../lib/db";

const visitorDetails = async (visitor_data: any) => {
  const visitor = await prisma.visitorDetails.create({
    data: {
      visit_count: 1,
      ip: visitor_data.ip,
      browser: visitor_data.browser.replace(/"/g, ""),
      device: visitor_data.os.replace(/"/g, ""),
      location: visitor_data.country,
      long_url: visitor_data.long_url,
      short_url: visitor_data.short_code,
    },
  });
  console.log("visitor++", visitor);
  return visitor;
};

export { visitorDetails };
