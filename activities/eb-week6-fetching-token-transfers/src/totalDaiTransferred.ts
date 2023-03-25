import { Alchemy, Network } from "alchemy-sdk";
import * as dotenv from "dotenv";
dotenv.config();

import { firstTopic, secondTopic } from "./topics";

const ALCHEMY_URL = process.env.ALCHEMY_URL!;
const topics = [firstTopic(), secondTopic()].map((x) => "0x" + x);
const alchemy = new Alchemy({ url: ALCHEMY_URL, network: Network.ETH_MAINNET });

export default async function totalDaiTransferred(
  fromBlock: string,
  toBlock: string
) {
  let total = BigInt(0);

  const logs = await alchemy.core.getLogs({
    address: "0x6b175474e89094c44da98b954eedeac495271d0f", // <-- TODO #1: fill in the dai address here
    fromBlock,
    toBlock,
    topics,
  });

  for (const log of logs) {
    total += BigInt(log.data);
  }

  // take a look at the first log in the response
  // console.log(logs[0]);

  // <-- TODO #2: return the total dai transferred during this timeframe
  return total;
}

module.exports = totalDaiTransferred;
