import { NextApiRequest, NextApiResponse } from "next";
import alchemy from "~/lib/alchemy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  try {
    const hash = req.query.hash as string;
    const transaction = await alchemy.core.getTransaction(hash);
    res.status(200).json({ transaction });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
