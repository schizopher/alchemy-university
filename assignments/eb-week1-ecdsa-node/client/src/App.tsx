import React, { useState } from "react";
import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";

function App() {
  const [balance, setBalance] = useState<number>(0);
  const [address, setAddress] = useState<string>("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} />
    </div>
  );
}

export default App;
