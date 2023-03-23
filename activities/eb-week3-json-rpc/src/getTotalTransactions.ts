import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const ALCHEMY_URL = process.env.ALCHEMY_URL!;

export default async function getTotalTransactions(blockNumber: string) {
  const response = await axios.post(ALCHEMY_URL, {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBlockByNumber",
    params: [blockNumber, true],
  });
  return response.data.result.transactions.length;
}
