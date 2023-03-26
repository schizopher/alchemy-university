import { utils, providers } from "ethers";
import Ganache from "ganache-core";

export const PRIVATE_KEY =
  "0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d";
export const INITIAL_BALANCE = utils.parseEther("10");

// create our test account from the private key, initialize it with 10 ether
export const accounts = [
  {
    balance: INITIAL_BALANCE.toHexString(),
    secretKey: PRIVATE_KEY,
  },
];

export let ganacheProvider = Ganache.provider({ accounts });
export let provider = new providers.Web3Provider(ganacheProvider);
