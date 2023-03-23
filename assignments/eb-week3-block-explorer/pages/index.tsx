import { NextPage } from "next";
import LatestBlockNumber from "~/containers/LatestBlockNumber";
import LatestBlocksList from "~/containers/LatestBlocksList";

const IndexPage: NextPage = () => {
  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-screen-xl">
        <div className="py-8">
          <LatestBlockNumber />
        </div>
        <div className="grid grid-cols-2">
          <LatestBlocksList />
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
