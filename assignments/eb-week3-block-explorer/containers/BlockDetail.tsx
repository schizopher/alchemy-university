import React from "react";
import { CubeIcon } from "@heroicons/react/24/outline";
import { fromUnixTime, formatISO } from "date-fns";
import { BigNumber } from "ethers";

import useBlock from "~/hooks/useBlock";

interface BlockDetailProps {
  blockNumber: number;
}

const BlockDetail: React.FC<BlockDetailProps> = ({ blockNumber }) => {
  const { data: block } = useBlock(blockNumber);
  return (
    <div className="w-full text-white">
      <div className="mb-2 flex flex-col gap-2 rounded bg-zinc-800 p-8">
        <small className="font-semibold">BLOCK INFORMATION</small>
        <div className="flex flex-row items-center gap-2">
          <CubeIcon className="h-8 w-8" />
          <h1 className="text-4xl">{blockNumber}</h1>
        </div>
      </div>
      <div className="grid grid-cols-[200px_1fr] gap-2">
        <div className="rounded bg-zinc-800/50 p-4 font-semibold">
          Timestamp
        </div>
        <div className="rounded bg-zinc-800/50 p-4">
          {block ? formatISO(fromUnixTime(block?.timestamp)) : null}
        </div>
        <div className="rounded bg-zinc-800/50 p-4 font-semibold">Hash</div>
        <div className="rounded bg-zinc-800/50 p-4">{block?.hash}</div>
        <div className="rounded bg-zinc-800/50 p-4 font-semibold">
          Parent Hash
        </div>
        <div className="rounded bg-zinc-800/50 p-4">{block?.parentHash}</div>
        <div className="rounded bg-zinc-800/50 p-4 font-semibold">
          Gas Limit
        </div>
        <div className="rounded bg-zinc-800/50 p-4">
          {block ? BigNumber.from(block.gasLimit).toString() : null}
        </div>
        <div className="rounded bg-zinc-800/50 p-4 font-semibold">Gas Used</div>
        <div className="rounded bg-zinc-800/50 p-4">
          {block ? BigNumber.from(block.gasUsed).toString() : null}
        </div>
      </div>
    </div>
  );
};

export default BlockDetail;
