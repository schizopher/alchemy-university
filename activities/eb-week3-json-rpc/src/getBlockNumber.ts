import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const ALCHEMY_URL = process.env.ALCHEMY_URL!;

export default async function getBlockNumber() {
  const response = await axios.post(ALCHEMY_URL, {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_blockNumber",
  });
  return response.data.result;
}
