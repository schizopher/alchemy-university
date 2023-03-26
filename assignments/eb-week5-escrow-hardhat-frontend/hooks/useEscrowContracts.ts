import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useSigner } from "wagmi";
import Escrow from "@alchemy-university/eb-week5-escrow-hardhat-backend/artifacts/contracts/Escrow.sol/Escrow.json";

interface useEscrowContracts {
  escrows: string[];
  createEscrowContract: (
    arbiter: string,
    beneficiary: string,
    value: string
  ) => Promise<void>;
}

const LOCAL_STORAGE_KEY = "escrow-contracts";

export default function useEscrowContracts(): useEscrowContracts {
  const { data: signer, isLoading, isError } = useSigner();
  const [escrows, setEscrows] = useState<string[]>([]);

  const createEscrowContract = async (
    arbiter: string,
    beneficiary: string,
    valueInEther: string
  ) => {
    if (isLoading || isError) return;
    const EscrowFactory = new ethers.ContractFactory(
      Escrow.abi,
      Escrow.bytecode,
      signer
    );
    const value = ethers.utils.parseEther(valueInEther);
    const escrowContract = await EscrowFactory.deploy(arbiter, beneficiary, {
      value,
    });
    setEscrows((prev) => [...prev, escrowContract.address]);
  };

  useEffect(() => {
    const escrows = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (escrows) setEscrows(JSON.parse(escrows));
  }, []);

  useEffect(() => {
    if (escrows && escrows.length > 0)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(escrows));
  }, [escrows]);

  return { escrows, createEscrowContract };
}
