import React, { ChangeEvent } from "react";

import { useClientWalletProps } from "../hooks/useClientWallet";

interface WalletProps {
  clientWallet: useClientWalletProps;
}

const Wallet: React.FC<WalletProps> = ({ clientWallet }) => {
  const { wallets, address, balance, setWallet, createNewWallet } =
    clientWallet;

  const onSelectWallet = (e: ChangeEvent<HTMLSelectElement>) => {
    const address = e.target.value;
    const wallet = wallets.find((wallet) => wallet.address === address);
    if (wallet) setWallet(wallet);
    else setWallet(null);
  };

  return (
    <div className="container wallet">
      <div className="wallet__top">
        <h1>Your Wallet</h1>
        <button className="button" onClick={createNewWallet}>
          Create New Wallet
        </button>
      </div>
      <label>
        Wallet Address
        <select onChange={onSelectWallet} value={address}>
          {clientWallet.wallets.map((wallet) => (
            <option value={wallet.address} key={wallet.address}>
              {wallet.address}
            </option>
          ))}
        </select>
      </label>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
};

export default Wallet;
