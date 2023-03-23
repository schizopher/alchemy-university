import { NextPage } from "next";
import LatestBlock from "~/containers/LatestBlock";

const IndexPage: NextPage = () => {
  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-screen-xl">
        <div className="py-8">
          <LatestBlock />
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
