import axios from "axios";
import niceList from "../utils/niceList.json";
import MerkleTree from "../utils/MerkleTree";

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const merkleTree = new MerkleTree(niceList);
  const index = Math.floor(Math.random() * niceList.length);
  const name = niceList[index];
  console.log({ name });
  const proof = merkleTree.getProof(index);
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof,
  });
  console.log({ gift });
}

main();
