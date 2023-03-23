import { Wallet } from "ethers";

const PROVIDED_PRIVATE_KEY =
  "0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d";
const PROVIDED_MNEMONIC =
  "plate lawn minor crouch bubble evidence palace fringe bamboo laptop dutch ice";

const wallet1 = new Wallet(PROVIDED_PRIVATE_KEY);
const wallet2 = Wallet.fromMnemonic(PROVIDED_MNEMONIC);

export { wallet1, wallet2 };
