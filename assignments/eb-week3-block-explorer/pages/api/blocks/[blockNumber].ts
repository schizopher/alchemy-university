import { NextApiRequest, NextApiResponse } from "next";
import alchemy from "~/lib/alchemy";
import { ErrorResponse, GetBlockResponse } from "~/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetBlockResponse | ErrorResponse>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  try {
    const blockNumber = Number(req.query.blockNumber as string);
    const block = await alchemy.core.getBlockWithTransactions(blockNumber);
    res.status(200).json({ block });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
