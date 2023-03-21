import React, { ChangeEvent, FormEvent, useState } from "react";
import { useClientWalletProps } from "../hooks/useClientWallet";
import server from "../server";
import { Transaction } from "../types";

interface TransferProps {
  clientWallet: useClientWalletProps;
}

const Transfer: React.FC<TransferProps> = ({ clientWallet }) => {
  const { signTransaction, revalidate } = clientWallet;
  const [sendAmount, setSendAmount] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");

  const setValue =
    (setter: (value: string) => void) => (evt: ChangeEvent<HTMLInputElement>) =>
      setter(evt.target.value);

  async function transfer(evt: FormEvent) {
    evt.preventDefault();
    try {
      const transaction: Transaction = {
        recipient,
        amount: parseInt(sendAmount),
      };
      const signed = await signTransaction(transaction);
      if (!signed) return alert("Error: No wallet connected!");
      const [signature, recoveryBit] = signed;
      await server.post("/send", {
        transaction,
        signature,
        recoveryBit,
      });
      revalidate();
    } catch (e: any) {
      console.log(e);
      alert(e.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>
      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>
      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      <input type="submit" className="button" value="Transfer" />
    </form>
  );
};

export default Transfer;
