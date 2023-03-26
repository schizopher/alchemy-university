import { NextApiRequest, NextApiResponse } from "next";
import alchemy from "~/lib/alchemy";
import { GetBlocksResponse, ErrorResponse } from "~/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetBlocksResponse | ErrorResponse>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  try {
    const latestBlock = await alchemy.core.getBlockNumber();
    const blockPromises = [...Array(10)].map((_, i) =>
      alchemy.core.getBlockWithTransactions(latestBlock - i)
    );
    const blocks = await Promise.all(blockPromises);
    res.status(200).json({ blocks });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
