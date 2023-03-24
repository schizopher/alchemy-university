import React from "react";
import Link from "next/link";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import type { BlockWithTransactions, TransactionResponse } from "alchemy-sdk";

import useBlocks from "~/hooks/useBlocks";
import { formatAsRelative } from "~/utils/time";

const LatestTransactionsListItemSkeleton: React.FC<{ index: number }> = ({
  index,
}) => {
  return (
    <div
      className={`${
        index % 2 == 0 ? "bg-zinc-900" : "bg-zinc-800"
      } flex flex-row items-center justify-start gap-4 rounded-lg p-4`}
    >
      <DocumentTextIcon className="w-8" />
      <div className="h-12 w-full rounded bg-zinc-700" />
    </div>
  );
};

const LatestTransactionsListItem: React.FC<{
  block: BlockWithTransactions;
  transaction: TransactionResponse;
  index: number;
}> = ({ transaction, block, index }) => {
  return (
    <Link href={`/tx/${transaction.hash}`}>
      <div
        className={`${
          index % 2 == 0 ? "bg-zinc-900" : "bg-zinc-800"
        } flex flex-row items-center justify-start gap-4 rounded-lg p-4`}
      >
        <DocumentTextIcon className="w-8" />
        <div className="flex flex-col">
          <span className="text-xl">{transaction.hash.slice(0, 16)}...</span>
          <small className="text-sm">
            {formatAsRelative(block.timestamp, "seconds")}
          </small>
        </div>
        <div className="ml-auto flex flex-col items-end text-sm">
          <p>
            From{" "}
            <span className="text-zinc-400">
              {transaction.from.slice(0, 8)}...
            </span>
          </p>
          <p>
            To{" "}
            <span className="text-zinc-400">
              {transaction.to?.slice(0, 8)}...
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

const LatestTransactionsList: React.FC = () => {
  const { data } = useBlocks();
  const transactions = data
    ?.flatMap((block) =>
      block.transactions.map((transaction) => ({ block, transaction }))
    )
    .slice(0, 10);
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-zinc-800 p-8">
      <h2 className="text-2xl text-white">Latest Transactions</h2>
      <div>
        {transactions
          ? transactions.map(({ block, transaction }, i: number) => (
              <LatestTransactionsListItem
                key={transaction.hash}
                block={block}
                transaction={transaction}
                index={i}
              />
            ))
          : [...Array(10)].map((_, i) => (
              <LatestTransactionsListItemSkeleton key={i} index={i} />
            ))}
      </div>
    </div>
  );
};

export default LatestTransactionsList;
