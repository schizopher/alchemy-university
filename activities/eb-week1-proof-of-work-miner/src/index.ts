import { sha256 } from "ethereum-cryptography/sha256";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";

interface Transaction {
  to: string;
  sender: string;
}

interface Block {
  id: number;
  nonce: number;
  hash: Uint8Array;
  transactions: Transaction[];
}

export const TARGET_DIFFICULTY =
  BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
export const MAX_TRANSACTIONS = 10;
export let mempool: Transaction[] = [];
export let blocks: Block[] = [];

export function addTransaction(transaction: Transaction) {
  mempool.push(transaction);
}

export function resetMempool() {
  mempool = [];
}

export function resetBlocks() {
  blocks = [];
}

export function mine() {
  const newBlock: any = {
    id: blocks.length,
    transactions: [],
  };
  while (mempool.length && newBlock.transactions.length < MAX_TRANSACTIONS) {
    const transaction = mempool.pop();
    if (transaction) newBlock.transactions?.push(transaction);
  }
  let nonce = 0;
  while (true) {
    newBlock.nonce = nonce;
    const newBlockHash = sha256(utf8ToBytes(JSON.stringify(newBlock)));
    if (TARGET_DIFFICULTY > BigInt(`0x${toHex(newBlockHash)}`)) {
      newBlock.hash = newBlockHash;
      break;
    }
    nonce += 1;
  }
  blocks.push(newBlock);
}
