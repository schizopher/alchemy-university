import React from "react";
import type { NextPage } from "next";
import EscrowForm from "../components/EscrowForm";
import useEscrowContracts from "../hooks/useEscrowContracts";
import EscrowContractCard from "../components/EscrowContractCard";

const IndexPage: NextPage = () => {
  const { escrows, createEscrowContract } = useEscrowContracts();
  return (
    <div className="flex items-center justify-center">
      <div className="grid w-full max-w-screen-xl grid-cols-2 items-start gap-4 pt-24">
        <EscrowForm handleSubmit={createEscrowContract} />
        <div className="flex flex-col gap-4">
          {escrows.map((address) => (
            <EscrowContractCard key={address} address={address} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
