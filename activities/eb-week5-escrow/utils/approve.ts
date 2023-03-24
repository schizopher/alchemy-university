import { Contract, Signer } from "ethers";

/**
 * Approves the Escrow, signed by the arbiter
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @param {ethers.types.Signer} arbiterSigner - the arbiter EOA
 *
 * @return {promise} a promise of the approve transaction
 */
export default function approve(contract: Contract, arbiterSigner: Signer) {
  return contract.connect(arbiterSigner).approve();
}
