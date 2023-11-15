import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(403).json({ error: "Unauthenticated user!" });
  } else {
    res.status(200).json({ message: "Success", session });
  }
};

export default handler;
