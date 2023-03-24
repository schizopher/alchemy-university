import React from "react";
import Link from "next/link";
import type { BlockWithTransactions } from "alchemy-sdk";
import { CubeIcon } from "@heroicons/react/24/outline";

import useBlocks from "~/hooks/useBlocks";
import { formatAsRelative } from "~/utils/time";

const LatestBlockListItemSkeleton: React.FC<{ index: number }> = ({
  index,
}) => {
  return (
    <div
      className={`${
        index % 2 == 0 ? "bg-zinc-900" : "bg-zinc-800"
      } flex flex-row items-center gap-4 rounded-lg p-4`}
    >
      <CubeIcon className="w-8" />
      <div className="h-12 w-full rounded-lg bg-zinc-700" />
    </div>
  );
};

const LatestBlockListItem: React.FC<{
  block: BlockWithTransactions;
  index: number;
}> = ({ block, index }) => {
  return (
    <Link href={`/block/${block.number}`}>
      <div
        className={`${
          index % 2 == 0 ? "bg-zinc-900" : "bg-zinc-800"
        } flex flex-row items-center gap-4 rounded-lg p-4`}
      >
        <CubeIcon className="w-8" />
        <div className="flex flex-col">
          <span className="text-xl">{block.number}</span>
          <small className="text-sm">
            {formatAsRelative(block.timestamp, "seconds")}
          </small>
        </div>
        <div className="ml-auto text-sm text-zinc-400">
          {block.transactions.length} txns
        </div>
      </div>
    </Link>
  );
};

const LatestBlocksList: React.FC = () => {
  const { data } = useBlocks();
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-zinc-800 p-8">
      <h2 className="text-2xl text-white">Latest Blocks</h2>
      <div>
        {data
          ? data.map((block: BlockWithTransactions, i: number) => (
              <LatestBlockListItem key={block.hash} block={block} index={i} />
            ))
          : [...Array(10)].map((_, i) => (
              <LatestBlockListItemSkeleton key={i} index={i} />
            ))}
      </div>
    </div>
  );
};

export default LatestBlocksList;
