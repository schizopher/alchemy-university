import { Alchemy, Network, AssetTransfersCategory } from "alchemy-sdk";
import * as dotenv from "dotenv";
dotenv.config();

const ALCHEMY_URL = process.env.ALCHEMY_URL!;
const alchemy = new Alchemy({ url: ALCHEMY_URL, network: Network.ETH_MAINNET });

export default async function totalErc20Transfers(
  fromBlock: string,
  toBlock: string
) {
  const res = await alchemy.core.getAssetTransfers({
    fromBlock,
    toBlock,
    fromAddress: "0x28c6c06298d514db089934071355e5743bf21d60", // <-- TODO: fill this in
    category: [AssetTransfersCategory.ERC20], // <-- TODO: fill this in
  });

  // inspect the response to see all the transfers
  // console.log(res);

  // TODO: return the total number of ERC20 transfers
  return res.transfers.length;
}
