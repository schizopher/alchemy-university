import React from "react";
import { utils } from "ethers";
import useEscrowContract from "../hooks/useEscrowContract";

interface EscrowContractCardProps {
  address: string;
}

const EscrowContractCard: React.FC<EscrowContractCardProps> = ({ address }) => {
  const { arbiter, beneficiary, balance, isArbiter, approve } =
    useEscrowContract(address);
  return (
    <div className="flex flex-col gap-4 rounded bg-gray-100 p-8">
      <h3 className="text-xl font-semibold">{address}</h3>
      <div>
        <p>Arbiter: {arbiter}</p>
        <p>Beneficiary: {beneficiary}</p>
        <p>Balance: {utils.formatUnits(balance?.toString() || "0", "ether")}</p>
      </div>
      <button
        className="rounded bg-blue-500 py-2 px-4 font-semibold text-white disabled:bg-blue-500/50"
        onClick={approve}
        disabled={!isArbiter}
      >
        Approve
      </button>
    </div>
  );
};

export default EscrowContractCard;
