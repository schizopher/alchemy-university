import niceList from "./niceList.json";
import MerkleTree from "./MerkleTree";

export default function generateRoot() {
  const tree = new MerkleTree(niceList);
  console.log(tree.getRoot());
}

generateRoot();
