import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const ALCHEMY_URL = process.env.ALCHEMY_URL!;

export default async function getTotalBalance(addresses: string[]) {
  const batch = addresses.map((address, i) => ({
    jsonrpc: "2.0",
    id: i + 1,
    method: "eth_getBalance",
    params: [address, "latest"],
  }));
  const response = await axios.post(ALCHEMY_URL, batch);
  const totalBalance = response.data.reduce(
    (acc: number, cur: { jsonrpc: string; id: number; result: string }) => {
      return acc + parseInt(cur.result, 16);
    },
    0
  );
  return totalBalance;
}
