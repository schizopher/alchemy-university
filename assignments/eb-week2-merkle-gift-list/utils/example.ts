import { utf8ToBytes } from "ethereum-cryptography/utils";

import MerkleTree from "./MerkleTree";
import niceList from "./niceList.json";
import verifyProof from "./verifyProof";

// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);

// get the root
const root = merkleTree.getRoot();

// find the proof that norman block is in the list
const name = "Norman Block";
const index = niceList.findIndex((n) => n === name);
const proof = merkleTree.getProof(index);

// verify proof against the Merkle Root
console.log(verifyProof(proof, Buffer.from(name), root)); // true, Norman Block is in the list!

// TRY IT OUT: what happens if you try a name not in the list, or a fake proof?
