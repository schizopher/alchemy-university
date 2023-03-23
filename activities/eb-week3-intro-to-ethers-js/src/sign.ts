import { utils } from "ethers";
import { wallet1 } from "./wallets";

const PROVIDED_RECIPIENT_ADDRESS = "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92";

export const signaturePromise = wallet1.signTransaction({
  value: utils.parseUnits("1", "ether"),
  to: PROVIDED_RECIPIENT_ADDRESS,
  gasLimit: 21000,
});
