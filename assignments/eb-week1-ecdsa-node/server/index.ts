import { recoverPublicKey } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import express from "express";
import cors from "cors";

const app = express();
const port = 3042;

app.use(cors());
app.use(express.json());

const balances: { [key: string]: number } = {
  "0xe0e0b9a1f1f90489be3e0b1d67065be0a5e4c29b": 100,
  "0x8f6aa5708ffd1f2de339e5748dac4f06f3ad7a79": 50,
  "0x36e8e7b179b41791bd99c90a13d1c7d1564d6143": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { transaction, signature, recoveryBit } = req.body;
  const { amount, recipient } = transaction;

  const message = JSON.stringify(transaction);
  const hash = keccak256(utf8ToBytes(message));

  const senderpk = recoverPublicKey(hash, signature, recoveryBit);
  const sender = `0x${toHex(keccak256(senderpk.slice(1)).slice(-20))}`;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address: string) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
