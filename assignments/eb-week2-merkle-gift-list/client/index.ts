import axios from "axios";
import niceList from "../utils/niceList.json";
import MerkleTree from "../utils/MerkleTree";

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
  });

  console.log({ gift });
}

main();
