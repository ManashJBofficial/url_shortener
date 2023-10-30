import prisma from "../../lib/db";

const visitorDetails = async (visitor_data: any) => {
  // Check if a record with the given IP address and short URL exists in the database
  const existingVisitor = await prisma.visitorDetails.findFirst({
    where: {
      ip: visitor_data.ip,
      short_url_code: visitor_data.short_code,
    },
  });

  if (existingVisitor) {
    // If the record exists, update the visit_count
    const updatedVisitor = await prisma.visitorDetails.update({
      where: { id: existingVisitor.id },
      data: {
        visit_count: existingVisitor.visit_count + 1,
      },
    });
    console.log("Visitor updated:", updatedVisitor);
    return updatedVisitor;
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
    console.log("New visitor created:", newVisitor);
    return newVisitor;
  }
};

export { visitorDetails };
