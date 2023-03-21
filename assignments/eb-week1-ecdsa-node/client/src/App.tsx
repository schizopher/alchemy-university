import React, { useState } from "react";
import Transfer from "./Transfer";
import "./App.scss";

import Wallet from "./components/Wallet";
import useClientWallet from "./hooks/useClientWallet";

function App() {
  const [balance, setBalance] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const clientWallet = useClientWallet();

  return (
    <div className="app">
      <Wallet clientWallet={clientWallet} />
      <Transfer setBalance={setBalance} address={address} />
    </div>
  );
}

export default App;
