/**
 * Stores visitor details for a given short URL visit in the database.
 *
 * Checks if a record already exists for the IP and short code.
 * If it does, updates the visit count if the browser/device match,
 * or creates a new record if they differ.
 * If no existing record, creates a new visitor details record.
 *
 * Exported to allow access from the server route.
 */
import prisma from "../../lib/db";

const visitorDetails = async (visitor_data: any) => {
  // Check if a record with the given IP address and short URL exists in the database
  const existingVisitor = await prisma.visitorDetails.findFirst({
    where: {
      ip: visitor_data.ip as string,
      short_url_code: visitor_data.short_code as string,
    },
  });

  if (existingVisitor) {
    // If the record exists, check if the browser or device has changed
    if (
      existingVisitor.browser !== visitor_data.browser.replace(/"/g, "") ||
      existingVisitor.device !== visitor_data.os.replace(/"/g, "")
    ) {
      // If the browser or device has changed, create a new record
      const newVisitor = await prisma.visitorDetails.create({
        data: {
          visit_count: 1,
          ip: visitor_data.ip as string,
          browser: visitor_data.browser.replace(/"/g, ""),
          device: visitor_data.os.replace(/"/g, ""),
          location: visitor_data.country,
          long_url: visitor_data.long_url,
          short_url_code: visitor_data.short_code as string,
        },
      });

      return newVisitor;
    } else {
      // If the browser and device haven't changed, update the existing record
      const updatedVisitor = await prisma.visitorDetails.update({
        where: { id: existingVisitor.id },
        data: {
          visit_count: existingVisitor.visit_count + 1,
          last_updated_at: new Date(),
        },
      });
      return updatedVisitor;
    }
  } else {
    // If the record doesn't exist, create a new one
    const newVisitor = await prisma.visitorDetails.create({
      data: {
        visit_count: 1,
        ip: visitor_data.ip as string,
        browser: visitor_data.browser.replace(/"/g, ""),
        device: visitor_data.os.replace(/"/g, ""),
        location: visitor_data.country,
        long_url: visitor_data.long_url,
        short_url_code: visitor_data.short_code as string,
      },
    });
    return newVisitor;
  }
};

export { visitorDetails };
