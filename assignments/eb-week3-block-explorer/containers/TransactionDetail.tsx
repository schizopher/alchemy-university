import React from "react";
import { utils, BigNumber } from "ethers";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

import useTransaction from "~/hooks/useTransaction";

interface TransactionDetailProps {
  hash: string;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({ hash }) => {
  const { data: transaction } = useTransaction(hash);

  return (
    <div className="w-full text-white">
      <div className="mb-2 flex flex-col gap-2 rounded bg-zinc-800 p-8">
        <small className="font-semibold">TRANSACTION INFORMATION</small>
        <div className="flex flex-row items-center gap-2">
          <Square3Stack3DIcon className="h-8 w-8" />
          <h1 className="text-2xl">{hash}</h1>
        </div>
      </div>
      <div className="grid grid-cols-[200px_1fr] gap-2">
        <div className="rounded bg-zinc-800/50 p-4 font-semibold">Block</div>
        <div className="rounded bg-zinc-800/50 p-4">
          {transaction?.blockNumber}
        </div>
        <div className="rounded bg-zinc-800/50 p-4 font-semibold">From</div>
        <div className="rounded bg-zinc-800/50 p-4">{transaction?.from}</div>
        <div className="rounded bg-zinc-800/50 p-4 font-semibold">To</div>
        <div className="rounded bg-zinc-800/50 p-4">{transaction?.to}</div>
        <div className="rounded bg-zinc-800/50 p-4 font-semibold">Value</div>
        <div className="rounded bg-zinc-800/50 p-4">
          {transaction
            ? `${utils.formatEther(BigNumber.from(transaction.value))} ETH`
            : null}
        </div>
        <div className="rounded bg-zinc-800/50 p-4 font-semibold">
          Input Data
        </div>
        <div className="break-all rounded bg-zinc-800/50 p-4 font-mono text-sm text-gray-200">
          {transaction?.data}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
