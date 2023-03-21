import { useState, useEffect } from "react";
import { getPublicKey, sign, utils } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

import server from "../server";
import { Transaction, Wallet } from "../types";
import { DEFAULT_WALLETS } from "../constants";

const LOCAL_STORAGE_KEY = "edcsa-node-wallets";

export interface useClientWalletProps {
  wallets: Wallet[];
  wallet: Wallet | null;
  address: string;
  balance: number;
  revalidate: () => void;
  createNewWallet: () => void;
  setWallet: (wallet: Wallet | null) => void;
  signTransaction: (
    transaction: Transaction
  ) => Promise<readonly [string, number] | null>;
}

export default function useClientWallet(): useClientWalletProps {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const [balance, setBalance] = useState<number>(0);
  const address = wallet?.address || "";

  const [refresh, setRefresh] = useState<boolean>(false);
  const revalidate = () => setRefresh((prev) => !prev);

  const createNewWallet = () => {
    const sk = utils.randomPrivateKey();
    const pk = getPublicKey(sk);
    const address = toHex(keccak256(pk.slice(1)).slice(-20));
    const newWallet = { pk: toHex(pk), sk: toHex(sk), address: `0x${address}` };
    setWallets((wallets) => [...wallets, newWallet]);
    setWallet(newWallet);
  };

  const signTransaction = async (transaction: Transaction) => {
    if (!wallet) return null;
    const message = JSON.stringify(transaction);
    const hash = keccak256(utf8ToBytes(message));
    const [signature, recoveryBit] = await sign(hash, wallet!.sk, {
      recovered: true,
    });
    return [toHex(signature), recoveryBit] as const;
  };

  useEffect(() => {
    const wallets = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (wallets) {
      const parsedWallets = JSON.parse(wallets);
      setWallets(parsedWallets);
      setWallet(parsedWallets[0]);
    } else {
      setWallets(DEFAULT_WALLETS);
      setWallet(DEFAULT_WALLETS[0]);
    }
  }, []);

  useEffect(() => {
    if (wallets && wallets.length > 0)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(wallets));
  }, [wallets]);

  useEffect(() => {
    if (wallet) {
      server
        .get(`/balance/${wallet.address}`)
        .then((res) => setBalance(res.data.balance));
    }
  }, [wallet, refresh]);

  return {
    wallets,
    setWallet,
    wallet,
    balance,
    address,
    createNewWallet,
    signTransaction,
    revalidate,
  };
}
