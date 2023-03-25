import Escrow from "@alchemy-university/eb-week5-escrow-hardhat-backend/artifacts/contracts/Escrow.sol/Escrow.json";
import { BigNumber, Contract } from "ethers";
import { useEffect, useState } from "react";
import { useProvider, useSigner } from "wagmi";

export default function useEscrowContract(address: string) {
  const provider = useProvider();
  const { data: signer, isLoading, isError } = useSigner();
  const contract = new Contract(address, Escrow.abi);

  const [arbiter, setArbiter] = useState<string>("");
  const [beneficiary, setBeneficiary] = useState<string>("");
  const [balance, setBalance] = useState<BigNumber | null>(null);
  const [isArbiter, setIsArbiter] = useState<boolean>(false);

  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    if (!provider) return;
    const _contract = contract.connect(provider);
    _contract.callStatic.arbiter().then(setArbiter);
    _contract.callStatic.beneficiary().then(setBeneficiary);
    provider.getBalance(address).then(setBalance);
  }, [address, provider, refresh]);

  useEffect(() => {
    if (!signer) return;
    signer.getAddress().then((address) => setIsArbiter(address === arbiter));
  }, [arbiter, signer]);

  const approve = async () => {
    if (isLoading || isError || !signer) return;
    const _contract = contract.connect(signer);
    const tx = await _contract.functions.approve();
    await tx.wait();
    setRefresh((prev) => !prev);
  };

  return { approve, arbiter, beneficiary, balance, isArbiter };
}
