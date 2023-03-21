import React, { ChangeEvent, FormEvent, useState } from "react";
import server from "./server";

interface TransferProps {
  address: string;
  setBalance: (balance: number) => void;
}

const Transfer: React.FC<TransferProps> = ({ address, setBalance }) => {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue =
    (setter: (value: string) => void) => (evt: ChangeEvent<HTMLInputElement>) =>
      setter(evt.target.value);

  async function transfer(evt: FormEvent) {
    evt.preventDefault();
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
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
