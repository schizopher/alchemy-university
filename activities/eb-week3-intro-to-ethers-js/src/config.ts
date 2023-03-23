import { MockProvider } from "ethereum-waffle";

export const mockProvider = new MockProvider();
const wallets = mockProvider.getWallets();
export const wallet = wallets[0];

export const PRIVATE_KEY = wallet.privateKey;

export const INITIAL_BALANCE = "10000000000000000000000000000000000";
