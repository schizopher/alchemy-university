import { NextApiRequest, NextApiResponse } from "next";
import alchemy from "~/lib/alchemy";
import { ErrorResponse, GetLatestBlockResponse } from "~/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetLatestBlockResponse | ErrorResponse>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  try {
    const latestBlock = await alchemy.core.getBlockNumber();
    res.status(200).json({ latestBlock });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
