import { NextPage } from "next";
import LatestBlockNumber from "~/containers/LatestBlockNumber";
import LatestBlocksList from "~/containers/LatestBlocksList";
import LatestTransactionsList from "~/containers/LatestTransactionsList";

const IndexPage: NextPage = () => {
  return (
    <main className="flex flex-col items-center">
      <div className="flex w-full max-w-screen-xl flex-col gap-4">
        <div>
          <LatestBlockNumber />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <LatestBlocksList />
          <LatestTransactionsList />
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
