import React from "react";
import "./App.scss";

import Transfer from "./components/Transfer";
import Wallet from "./components/Wallet";
import useClientWallet from "./hooks/useClientWallet";

function App() {
  const clientWallet = useClientWallet();
  return (
    <div className="app">
      <Wallet clientWallet={clientWallet} />
      <Transfer clientWallet={clientWallet} />
    </div>
  );
}

export default App;
